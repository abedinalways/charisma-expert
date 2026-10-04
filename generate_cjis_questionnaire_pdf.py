#!/usr/bin/env python3
"""Generate KLYVOREK CJIS & Data Security Developer Questionnaire PDF."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

OUT = Path(__file__).resolve().parent / "KLYVOREK_CJIS_Data_Security_Questionnaire_Answers.pdf"

NAVY = colors.HexColor("#1a2744")
STEEL = colors.HexColor("#2c3e50")
MUTED = colors.HexColor("#5a6570")
LIGHT = colors.HexColor("#f4f6f8")
BORDER = colors.HexColor("#d0d5dd")
ACCENT = colors.HexColor("#1e4d6b")
WARN_BG = colors.HexColor("#fef6e8")
WARN_BORDER = colors.HexColor("#e8c87a")


def styles():
    base = getSampleStyleSheet()
    s = {
        "cover_title": ParagraphStyle(
            "cover_title",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=22,
            leading=28,
            textColor=NAVY,
            alignment=TA_CENTER,
            spaceAfter=12,
        ),
        "cover_sub": ParagraphStyle(
            "cover_sub",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=11,
            leading=16,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceAfter=6,
        ),
        "h1": ParagraphStyle(
            "h1",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=14,
            leading=18,
            textColor=NAVY,
            spaceBefore=16,
            spaceAfter=8,
        ),
        "h2": ParagraphStyle(
            "h2",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=14,
            textColor=ACCENT,
            spaceBefore=10,
            spaceAfter=6,
        ),
        "body": ParagraphStyle(
            "body",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=13,
            textColor=STEEL,
            alignment=TA_JUSTIFY,
            spaceAfter=6,
        ),
        "body_left": ParagraphStyle(
            "body_left",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=13,
            textColor=STEEL,
            alignment=TA_LEFT,
            spaceAfter=4,
        ),
        "bullet": ParagraphStyle(
            "bullet",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=12.5,
            textColor=STEEL,
            leftIndent=4,
        ),
        "cell": ParagraphStyle(
            "cell",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            textColor=STEEL,
        ),
        "cell_bold": ParagraphStyle(
            "cell_bold",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.5,
            leading=11,
            textColor=NAVY,
        ),
        "note": ParagraphStyle(
            "note",
            parent=base["Normal"],
            fontName="Helvetica-Oblique",
            fontSize=9,
            leading=12,
            textColor=STEEL,
            alignment=TA_JUSTIFY,
        ),
        "footer": ParagraphStyle(
            "footer",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8,
            textColor=MUTED,
            alignment=TA_CENTER,
        ),
        "toc": ParagraphStyle(
            "toc",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=10,
            leading=16,
            textColor=STEEL,
            leftIndent=10,
        ),
    }
    return s


def p(text, style):
    return Paragraph(text, style)


def bullets(items, style):
    return ListFlowable(
        [ListItem(Paragraph(i, style), leftIndent=12, bulletColor=ACCENT) for i in items],
        bulletType="bullet",
        start="•",
        leftIndent=15,
        bulletFontSize=9,
    )


def make_table(headers, rows, col_widths):
    data = [[Paragraph(h, styles()["cell_bold"]) for h in headers]]
    for row in rows:
        data.append([Paragraph(str(c), styles()["cell"]) for c in row])
    t = Table(data, colWidths=col_widths, repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), LIGHT),
                ("TEXTCOLOR", (0, 0), (-1, 0), NAVY),
                ("GRID", (0, 0), (-1, -1), 0.4, BORDER),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, LIGHT]),
            ]
        )
    )
    return t


def callout(text, s):
    inner = Paragraph(text, s["note"])
    t = Table([[inner]], colWidths=[6.5 * inch])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), WARN_BG),
                ("BOX", (0, 0), (-1, -1), 1, WARN_BORDER),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    return t


def add_footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(BORDER)
    canvas.setLineWidth(0.5)
    canvas.line(0.75 * inch, 0.55 * inch, 7.75 * inch, 0.55 * inch)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(0.75 * inch, 0.35 * inch, "KLYVOREK — CJIS & Data Security Questionnaire (Technical Responses)")
    canvas.drawRightString(7.75 * inch, 0.35 * inch, f"Page {doc.page}")
    canvas.restoreState()


def build():
    s = styles()
    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=LETTER,
        leftMargin=0.75 * inch,
        rightMargin=0.75 * inch,
        topMargin=0.7 * inch,
        bottomMargin=0.75 * inch,
        title="KLYVOREK CJIS & Data Security Developer Questionnaire — Technical Responses",
        author="KLYVOREK Engineering (codebase-based technical draft)",
    )

    story = []

    # Cover
    story.append(Spacer(1, 1.2 * inch))
    story.append(p("KLYVOREK", s["cover_title"]))
    story.append(p("CJIS &amp; Data Security Developer Questionnaire", s["cover_title"]))
    story.append(Spacer(1, 0.25 * inch))
    story.append(p("Technical Responses Based on Current Architecture", s["cover_sub"]))
    story.append(p("Prepared from codebase and deployment documentation review", s["cover_sub"]))
    story.append(p("Date: September 15, 2026", s["cover_sub"]))
    story.append(Spacer(1, 0.4 * inch))
    story.append(
        callout(
            "<b>Important:</b> This document describes how KLYVOREK currently receives, processes, "
            "protects, logs, stores, and deletes potentially sensitive law-enforcement information, "
            "based on the application codebase and deployment docs. It is a technical fact sheet for "
            "legal and security review — <b>not</b> a formal CJIS certification, Security Policy "
            "mapping, or legal opinion. Formal CJIS compliance is deployment- and agency-specific "
            "and should not be assumed without an independent assessment.",
            s,
        )
    )
    story.append(Spacer(1, 0.5 * inch))
    story.append(p("<b>Contents</b>", s["h1"]))
    toc_items = [
        "1. Data Flow",
        "2. AI Provider",
        "3. Data Storage",
        "4. Encryption",
        "5. User Authentication",
        "6. Access Control",
        "7. Audit Trail",
        "8. Data Modification &amp; Provenance",
        "9. Data Retention &amp; Deletion",
        "10. Third-Party / Subprocessor Chain",
        "11. Security Incidents",
        "12. CJIS Gap Assessment",
        "The “Chief Brown Test”",
    ]
    for item in toc_items:
        story.append(p(item, s["toc"]))

    story.append(PageBreak())

    # Purpose
    story.append(p("Purpose", s["h1"]))
    story.append(
        p(
            "To document how KLYVOREK receives, processes, protects, logs, stores, and deletes "
            "potentially sensitive law-enforcement information, and to answer the client’s "
            "developer questionnaire with architecture-accurate responses.",
            s["body"],
        )
    )

    # 1
    story.append(p("1. Data Flow", s["h1"]))
    story.append(
        p(
            "When an officer enters information into KLYVOREK, the information travels as follows "
            "from submission through final output:",
            s["body"],
        )
    )
    story.append(
        bullets(
            [
                "<b>Browser (React frontend)</b> submits structured facts over <b>HTTPS</b>.",
                "<b>Cloudflare</b> (DNS / TLS termination / proxy) → <b>nginx</b> on the application host.",
                "<b>Django REST API</b> (Gunicorn) authenticates the user with JWT and creates a <b>GeneratedDocument</b> record.",
                "<b>PostgreSQL</b> stores officer <b>form_data</b>, case number, status, and later AI output.",
                "<b>Redis + Celery</b> run the generation job asynchronously.",
                "<b>AI inference</b> (configured mode — see §2): Ollama (documented beta), optional AWS Bedrock, or mock in development.",
                "Local <b>sentence-transformers</b> embeddings + <b>pgvector</b> may inject admin-uploaded training examples into the prompt (RAG).",
                "Post-processing: narrative cleanup, leak/hallucination check, and (for warrants) constitutional quality review.",
                "Result is written back to PostgreSQL; the officer retrieves it and may <b>export PDF/DOCX</b> streamed from the API.",
            ],
            s["bullet"],
        )
    )
    story.append(Spacer(1, 6))
    story.append(p("<b>Systems involved</b>", s["h2"]))
    story.append(
        make_table(
            ["Component", "Role"],
            [
                ["React web application", "Officer UI / form submission"],
                ["Cloudflare + nginx", "Edge TLS, reverse proxy"],
                ["Django / Gunicorn API", "Auth, business logic, document API"],
                ["PostgreSQL (+ pgvector)", "Primary datastore for users, documents, audits, RAG"],
                ["Redis + Celery", "Async generation queue / workers"],
                ["Ollama (self-hosted) or AWS Bedrock", "LLM inference"],
                ["sentence-transformers (local)", "Embeddings for RAG"],
                ["Gmail SMTP", "OTP, password reset, contact email"],
                ["Stripe (optional)", "Billing when enabled"],
                ["AWS S3 (optional)", "Media / seals / training file storage"],
            ],
            [2.4 * inch, 4.1 * inch],
        )
    )
    story.append(Spacer(1, 6))
    story.append(
        p(
            "<b>Not in the generation path:</b> OpenAI, Anthropic, Azure OpenAI, Auth0, Cognito, or Clerk.",
            s["body_left"],
        )
    )

    # 2
    story.append(p("2. AI Provider", s["h1"]))
    story.append(
        p(
            "Which AI model/provider processes KLYVOREK prompts and officer-provided information?",
            s["body"],
        )
    )
    story.append(
        make_table(
            ["Mode", "Provider / Model", "Typical use"],
            [
                ["ollama (documented beta)", "Self-hosted Ollama, llama3.2:latest", "Current EC2 Docker production beta"],
                ["bedrock (optional)", "AWS Bedrock Runtime (converse API)", "Optional production alternate"],
                ["mock (default if unset)", "In-process stub narrative", "Development / CI"],
            ],
            [1.7 * inch, 2.6 * inch, 2.2 * inch],
        )
    )
    story.append(Spacer(1, 8))
    story.append(p("<b>Retention, training, and human review</b>", s["h2"]))
    story.append(
        bullets(
            [
                "The application <b>does not call OpenAI or Anthropic</b>.",
                "Product privacy language states KLYVOREK does <b>not intentionally</b> use agency case facts to train publicly available general-purpose AI models.",
                "With <b>Ollama on the same host</b>, prompts remain on infrastructure KLYVOREK controls (subject to host access, application logs, and backups).",
                "With <b>Bedrock</b>, retention, training, and human-review rules are governed by <b>AWS contracts and settings</b>, not hard-coded application controls. Agencies should review Bedrock data-processing terms if that mode is enabled.",
                "Admin-uploaded <b>training documents</b> are stored and embedded for RAG. That is separate from training a public foundation model.",
            ],
            s["bullet"],
        )
    )

    # 3
    story.append(p("3. Data Storage", s["h1"]))
    story.append(
        make_table(
            ["Data", "Storage location"],
            [
                ["User accounts (email, name, badge, ORI, role, agency)", "PostgreSQL"],
                ["Agency / jurisdiction configuration", "PostgreSQL"],
                ["Officer facts (form_data), AI narrative, case number, flags, model used, acknowledgements, e-sign metadata", "PostgreSQL (generated_documents)"],
                ["Usage logs and audit logs", "PostgreSQL"],
                ["Email OTP codes", "HMAC-SHA256 hash only (not plaintext)"],
                ["Optional media (seals, training files)", "Local disk or AWS S3"],
            ],
            [3.3 * inch, 3.2 * inch],
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        p(
            "<b>Geography:</b> Documented AWS configuration examples use <b>us-east-1</b>. "
            "The current documented beta is a <b>single EC2 instance</b> co-hosting PostgreSQL, Redis, "
            "API, Celery, Ollama, and nginx.",
            s["body"],
        )
    )
    story.append(p("<b>Retention duration</b>", s["h2"]))
    story.append(
        bullets(
            [
                "<b>Completed documents:</b> no coded time-to-live — retained until deleted or cascade-removed.",
                "<b>Failed documents:</b> Celery hard-deletes after approximately <b>30 days</b>.",
                "<b>OTP:</b> short-lived (approximately 10 minutes).",
                "<b>Agency-configurable retention policy:</b> not implemented in application code (Privacy Policy language is high-level only).",
            ],
            s["bullet"],
        )
    )
    story.append(
        p(
            "Reports, warrant drafts, prompts (as stored form_data + generated narratives), and user "
            "information are retained in the primary database as described above. Temporary processing "
            "data exists in memory/worker processes during generation and in Redis as queue messages.",
            s["body"],
        )
    )

    # 4
    story.append(p("4. Encryption", s["h1"]))
    story.append(
        make_table(
            ["Layer", "Status"],
            [
                ["In transit (production)", "Yes — HTTPS via Cloudflare + nginx TLS 1.2/1.3; Django SSL redirect and HSTS; SMTP STARTTLS"],
                ["At rest — S3 (when used)", "AES-256 server-side encryption (SSE-S3). Application does not wire customer-managed KMS CMKs."],
                ["At rest — database fields", "Not application-field-encrypted. Case JSON and narratives are stored as plaintext in PostgreSQL."],
                ["Same-host DB SSL (beta compose)", "DB_SSLMODE=disable when PostgreSQL runs on the same Docker host."],
                ["EBS / RDS volume encryption", "Deployment guidance only; not enforced by application code."],
                ["Key management", "Django SECRET_KEY for JWT/OTP HMAC; AWS credentials/IAM for S3/Bedrock. No app-wired AWS KMS CMKs."],
            ],
            [2.0 * inch, 4.5 * inch],
        )
    )

    # 5
    story.append(p("5. User Authentication", s["h1"]))
    story.append(
        bullets(
            [
                "<b>Individual accounts:</b> Yes — email as username; roles include free, officer, and admin.",
                "<b>Primary methods:</b> email + password → JWT (simplejwt); optional Google Sign-In; email OTP for verification and password reset (stored as HMAC hash).",
                "<b>Brute-force protection:</b> django-axes.",
                "<b>MFA (TOTP / SMS / hardware) for login:</b> <b>Not implemented.</b> Email OTP is not login multi-factor authentication.",
                "Auth0, Cognito, Clerk, and Firebase Auth are <b>not used</b>.",
            ],
            s["bullet"],
        )
    )

    # 6
    story.append(p("6. Access Control", s["h1"]))
    story.append(
        p(
            "Who can access customer information besides the officer?",
            s["body"],
        )
    )
    story.append(
        make_table(
            ["Actor", "Access"],
            [
                ["Officer", "Own documents only (generate / view / export)"],
                ["Same-agency supervisor (if enabled)", "Agency document review workflow"],
                ["Platform administrators (role=admin)", "Can list and view all users’ documents; manage users, plans, agencies, training docs"],
                ["Host operators (SSH / DB volume / .env)", "Operational access to everything on the server — not gated by application RBAC"],
                ["Cloudflare / AWS / Google SMTP / Stripe / Bedrock (if used)", "Per their role in the processing chain"],
            ],
            [2.4 * inch, 4.1 * inch],
        )
    )
    story.append(Spacer(1, 6))
    story.append(
        p(
            "<b>Restrict and audit administrative access:</b> Admin APIs are role-gated (<b>IsAdmin</b>), "
            "and many admin actions write audit events. There is <b>no</b> break-glass / just-in-time / "
            "time-bound admin model and <b>no</b> immutable WORM audit store. Administrative access can "
            "be audited partially via AuditLog, but not to full CJIS depth.",
            s["body"],
        )
    )

    # 7
    story.append(p("7. Audit Trail", s["h1"]))
    story.append(
        p(
            "KLYVOREK persists audit events (AuditLog) and writes structured audit logger lines for "
            "sensitive actions such as login, document generate (including document type and case number), "
            "document access, export, and various administrative actions. Actor email and timestamp are stored. "
            "UsageLog also associates user, document type, case number, and time.",
            s["body"],
        )
    )
    story.append(p("<b>Association capability today</b>", s["h2"]))
    story.append(
        make_table(
            ["Element", "Available today?"],
            [
                ["Officer", "Yes — email / user foreign key; actor_label snapshot on audit rows"],
                ["Date / Time", "Yes — created_at"],
                ["Case Number", "Yes — on generate events and document records"],
                ["Document Type", "Yes"],
                ["Agency", "Not stored on the audit row itself — joinable via user.agency if still set"],
                ["AI Activity", "Partial — model_used on the document; not a full AI activity trail in AuditLog"],
            ],
            [1.8 * inch, 4.7 * inch],
        )
    )
    story.append(Spacer(1, 6))
    story.append(
        p(
            "Logs can be queried and provided to an agency when legitimately required through KLYVOREK "
            "operations/admin support. There is no productized self-service agency audit-export package "
            "in the UI based on current code. Logs are <b>not</b> tamper-evident / WORM; database write "
            "failures for audit rows are fail-open so the primary request can still succeed.",
            s["body"],
        )
    )

    # 8
    story.append(p("8. Data Modification &amp; Provenance", s["h1"]))
    story.append(
        p(
            "<b>Can KLYVOREK distinguish officer-provided information from AI-generated content?</b> Yes.",
            s["body_left"],
        )
    )
    story.append(
        bullets(
            [
                "Officer-provided facts: <b>form_data</b>",
                "AI / assembled narrative: <b>ai_narrative</b> / <b>narrative_body</b>",
                "Warrants: fixed <b>WarrantTemplate</b> legal language vs AI factual body",
                "Officer acknowledgements: source_acknowledged_at, review_acknowledged_at, content hash",
                "Export may use officer-edited text (edited_text)",
            ],
            s["bullet"],
        )
    )
    story.append(
        p(
            "<b>History during document creation:</b> Regenerating a document <b>overwrites</b> the same "
            "row. Prior AI drafts are <b>not versioned</b>. There is no immutable provenance ledger.",
            s["body"],
        )
    )

    # 9
    story.append(p("9. Data Retention &amp; Deletion", s["h1"]))
    story.append(
        make_table(
            ["Event", "Behavior"],
            [
                ["Document completed", "Remains in PostgreSQL indefinitely (no auto-purge)"],
                ["Officer deletes a document", "No officer self-delete API found in current code"],
                ["User account deleted", "Documents cascade-delete via foreign key"],
                ["Failed documents", "Hard-deleted after ~30 days"],
                ["Agency cancels KLYVOREK", "Access ends per subscription terms; no coded “wipe all agency CJI” offboarding workflow"],
                ["Backups", "Operational (e.g., pg_dump / RDS if used). Application does not orchestrate backup retention windows."],
                ["Third-party remnants", "Gmail, Stripe (if enabled), Cloudflare metadata, Bedrock (if used) — per provider policies"],
            ],
            [2.1 * inch, 4.4 * inch],
        )
    )

    # 10
    story.append(p("10. Third-Party / Subprocessor Chain", s["h1"]))
    story.append(
        make_table(
            ["Party", "Purpose", "Could receive LE / case content?"],
            [
                ["AWS (EC2; optional RDS/S3/Bedrock)", "Hosting / storage / optional AI", "Yes"],
                ["Cloudflare", "DNS, TLS, proxy", "Request metadata; TLS-terminated traffic"],
                ["Ollama (self-hosted container)", "LLM inference", "Yes — prompts include case facts (same host)"],
                ["Google (OAuth + Gmail SMTP)", "Login / OTP / contact email", "Account identity and OTP emails; not full case narratives by design"],
                ["Stripe (if enabled)", "Payments", "Billing PII — not case narratives"],
                ["Hugging Face / sentence-transformers", "Embedding model weights", "Weights download; embeddings computed locally"],
                ["Docker image registries", "Runtime images", "Ops only"],
            ],
            [2.2 * inch, 2.0 * inch, 2.3 * inch],
        )
    )
    story.append(Spacer(1, 6))
    story.append(
        p(
            "No Sentry, Datadog, Segment, Mixpanel, PostHog, or Google Analytics SDKs were found in the case-generation pipeline.",
            s["body_left"],
        )
    )

    # 11
    story.append(p("11. Security Incidents", s["h1"]))
    story.append(
        p(
            "If KLYVOREK experiences unauthorized access, a breach, data exposure, or another security incident:",
            s["body"],
        )
    )
    story.append(
        bullets(
            [
                "<b>In product/code today:</b> authentication lockouts, audit logs, and production HTTPS hardening.",
                "<b>Not present in the repository:</b> a formal incident-response runbook, SIEM/breach-detection stack, or automated forensic “what was accessed” package.",
                "<b>Policy contact path</b> referenced in Privacy Policy materials: <b>klyvorek@gmail.com</b>.",
            ],
            s["bullet"],
        )
    )
    story.append(p("<b>Investigative capability (depending on surviving logs/backups)</b>", s["h2"]))
    story.append(
        bullets(
            [
                "<b>Often determinable:</b> which officer/admin emails appear in audit logs, when actions occurred, and which case/document type was involved for logged events.",
                "<b>Not reliably determinable:</b> exact field-level access, full prompt contents, or immutable proof of access if logs were altered, incomplete, or never written.",
            ],
            s["bullet"],
        )
    )

    # 12
    story.append(p("12. CJIS Gap Assessment", s["h1"]))
    story.append(
        p(
            "Based on KLYVOREK’s current architecture — without assuming that use of a secure cloud "
            "provider automatically makes KLYVOREK CJIS compliant:",
            s["body"],
        )
    )
    story.append(
        make_table(
            ["Control area", "Status"],
            [
                ["Individual user accounts + role-based access", "Implemented (platform admin access is broad)"],
                ["HTTPS / TLS in production", "Implemented"],
                ["Audit logging of key actions", "Partially implemented"],
                ["Separation of officer facts vs AI text", "Implemented"],
                ["Self-hosted AI option (reduce third-party LLM exposure)", "Implemented (Ollama path)"],
                ["Multi-factor authentication (MFA)", "Not implemented"],
                ["Encryption of CJI at rest in the database", "Partial / deployment-dependent — app stores plaintext in Postgres"],
                ["Advanced key management (KMS CMKs)", "Not in application code"],
                ["Soft delete / officer delete / agency purge SLAs", "Not implemented"],
                ["Document version history / full AI provenance", "Not implemented"],
                ["Tamper-evident / exportable agency audit packages", "Not implemented"],
                ["Formal incident response + continuous monitoring (SIEM)", "Not implemented in product"],
                ["CJIS Security Policy mapping, SSP, personnel screening, physical/media controls, MOUs", "Outside this codebase — requires independent review"],
            ],
            [3.0 * inch, 3.5 * inch],
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        callout(
            "<b>Independent review required:</b> Formal CJIS authorization, FBI CJIS Security Policy "
            "control mapping, agency MOUs, personnel/security screening, and third-party agreements "
            "require independent security and legal review. Product FAQ language already states that "
            "formal CJIS compliance should not be assumed without a completed assessment and documented controls.",
            s,
        )
    )

    # Chief Brown Test
    story.append(PageBreak())
    story.append(p("The “Chief Brown Test”", s["h1"]))
    story.append(
        p(
            "If a police chief, prosecutor, defense attorney, or authorized auditor asked:",
            s["body"],
        )
    )
    story.append(
        callout(
            "“Show me whether Officer Smith used KLYVOREK on Case 26-12345, when it was used, "
            "what type of document was created, and what role AI played.”",
            s,
        )
    )
    story.append(Spacer(1, 10))
    story.append(p("What KLYVOREK could prove today", s["h2"]))
    story.append(
        p(
            "If Officer Smith’s account still exists (or actor_label was snapshotted) and generation was logged, KLYVOREK can often show:",
            s["body"],
        )
    )
    story.append(
        bullets(
            [
                "That an account matching Officer Smith <b>generated</b> a document",
                "<b>Approximate time</b> (AuditLog.created_at / document created_at)",
                "<b>Document type</b> (incident report / search warrant / arrest warrant)",
                "<b>Case number</b> as recorded on the generate event / document row",
                "That AI produced a stored narrative and which <b>model name</b> was recorded (model_used)",
                "Officer source/review acknowledgement timestamps, if used",
                "Separate storage of officer form_data vs AI text for the <b>current</b> document version",
            ],
            s["bullet"],
        )
    )
    story.append(p("What KLYVOREK could not reliably prove today", s["h2"]))
    story.append(
        bullets(
            [
                "Agency affiliation from the audit row alone (must join user → agency; breaks if reassigned/deleted)",
                "Full AI role detail (exact prompt, RAG examples used, quality-review pass as a dedicated audit event)",
                "Prior drafts after regenerate (overwritten)",
                "Immutable, court-ready chain of custody (logs are mutable DB rows; fail-open on write failure)",
                "Self-service agency export of a packaged evidentiary audit",
                "MFA-bound identity (password/Google only)",
                "That no privileged admin or host operator also accessed that case (admin access is only partially auditable)",
            ],
            s["bullet"],
        )
    )
    story.append(Spacer(1, 10))
    story.append(
        callout(
            "<b>One-line summary for counsel:</b> Today KLYVOREK can often show that a named user "
            "generated a given case/document type at a time and that AI wrote the current narrative; "
            "it cannot yet deliver a complete, immutable Officer → Agency → Case → AI activity "
            "evidentiary package.",
            s,
        )
    )

    story.append(Spacer(1, 18))
    story.append(p("Document control", s["h1"]))
    story.append(
        bullets(
            [
                "Source of truth: KLYVOREK application codebase and deployment documentation (including EC2 single-instance beta and AWS deployment notes).",
                "Live production AI_MODE and hosting topology should be confirmed with operations before this document is treated as production fact.",
                "This draft should be reviewed by product ownership and counsel before external distribution.",
            ],
            s["bullet"],
        )
    )

    doc.build(story, onFirstPage=add_footer, onLaterPages=add_footer)
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    build()
