"""
RAG pipeline: index training documents into pgvector, and retrieve the most
similar sample chunks at generation time (used by the real prompt_builder).

On SQLite (local zero-infra), embeddings are stored as JSON and similarity is
computed in Python — pgvector / CosineDistance require PostgreSQL.
"""
import logging
import math

from django.conf import settings

from .document_parser import chunk_text
from .embeddings import EmbeddingClient
from .models import DocumentChunk, TrainingDocument

logger = logging.getLogger(__name__)

_USE_SQLITE = settings.DATABASES['default']['ENGINE'] == 'django.db.backends.sqlite3'


def index_document(training_doc: TrainingDocument) -> int:
    """Chunk + embed a training document and store its chunks. Returns chunk count."""
    chunks = chunk_text(training_doc.raw_text)
    DocumentChunk.objects.filter(training_doc=training_doc).delete()

    if not chunks:
        training_doc.is_indexed = True
        training_doc.chunk_count = 0
        training_doc.save(update_fields=['is_indexed', 'chunk_count'])
        return 0

    vectors = EmbeddingClient().embed_batch(chunks)
    DocumentChunk.objects.bulk_create([
        DocumentChunk(
            training_doc=training_doc,
            doc_type=training_doc.doc_type,
            chunk_index=i,
            text=text,
            embedding=vec,
        )
        for i, (text, vec) in enumerate(zip(chunks, vectors))
    ])

    training_doc.is_indexed = True
    training_doc.chunk_count = len(chunks)
    training_doc.save(update_fields=['is_indexed', 'chunk_count'])
    logger.info('Indexed %d chunks for training doc %s', len(chunks), training_doc.id)
    return len(chunks)


def _cosine_similarity(a: list[float], b: list[float]) -> float:
    if not a or not b or len(a) != len(b):
        return -1.0
    dot = sum(x * y for x, y in zip(a, b))
    na = math.sqrt(sum(x * x for x in a))
    nb = math.sqrt(sum(y * y for y in b))
    if na == 0 or nb == 0:
        return -1.0
    return dot / (na * nb)


def retrieve(query: str, doc_type: str = None, k: int = None) -> list[DocumentChunk]:
    """Return the top-k chunks most similar to `query` (optionally by doc_type)."""
    k = k or settings.RAG_TOP_K
    qs = DocumentChunk.objects.all()
    if doc_type:
        qs = qs.filter(doc_type=doc_type)
    # Short-circuit before loading the embedding model when there's nothing to match.
    if not qs.exists():
        return []
    qv = EmbeddingClient().embed(query)

    if _USE_SQLITE:
        scored = sorted(
            qs,
            key=lambda c: _cosine_similarity(qv, c.embedding or []),
            reverse=True,
        )
        return scored[:k]

    from pgvector.django import CosineDistance
    return list(qs.order_by(CosineDistance('embedding', qv))[:k])



def retrieve_style_examples(query: str, doc_type: str = None, k: int = None) -> str:
    """Convenience: retrieved chunks joined as text, ready to inject into a prompt."""
    chunks = retrieve(query, doc_type=doc_type, k=k)
    return '\n\n---\n\n'.join(c.text for c in chunks)
