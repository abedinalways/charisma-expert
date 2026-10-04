# KLYVOREK Backend

KLYVOREK is a robust Django REST backend designed for AI-assisted law-enforcement documentation. It provides a secure platform for generating incident reports, search warrants, and arrest warrants using AI, complete with subscriptions, a blog/media module, and a comprehensive admin panel.

## Core Features

- **AI-Assisted Document Generation**: Automatically draft incident reports and warrants (Search/Arrest) using local or cloud-based LLMs.
- **RAG (Retrieval-Augmented Generation)**: Uses `pgvector` and local embeddings for context-aware document generation based on agency rules and training documents.
- **Constitutional Quality Review**: Automated AI passes to check for missing citations, weak probable cause, and missing attachments.
- **Role-Based Access Control**: Supports distinct roles (`free`, `officer`, `admin`) with email verification and agency association.
- **Subscription & Usage Limits**: Built-in quota management and feature gating for generated documents.
- **Dynamic Jurisdiction Support**: Agency-specific document headers, court captions, and formatting.

## 🛠 Tech Stack

- **Framework**: Python 3.11, Django 5.0, Django REST Framework
- **Database**: PostgreSQL with `pgvector` extension
- **Cache & Task Queue**: Redis & Celery
- **AI / LLM**: Llama 3.1 8B (via Ollama/Bedrock), `sentence-transformers`
- **Authentication**: Self-hosted JWT (email + password + OTP)
- **Deployment**: Docker, AWS (EC2/S3)

---

## 🏗 Project Architecture

The project is modularized into several Django apps:

- **`accounts`**: User and Agency management, JWT auth, and OTP verification.
- **`ai_engine`**: Prompt generation, LLM client integrations (Mock/Ollama/AWS Bedrock), RAG, and quality reviews.
- **`documents`**: Document generation workflows, PDF/DOCX exporters, and federal AO forms.
- **`subscriptions`**: Plan and usage quota tracking.
- **`blog`**: Markdown-based CMS for posts and media.
- **`payments`**: Stripe checkout integration.
- **`admin_panel`**: Cross-user administration and platform statistics.

---

## 🚀 Getting Started for Developers

### Prerequisites
- [Docker](https://www.docker.com/get-started) and Docker Compose
- Git

### 1. Clone the repository
```bash
git clone <repository-url>
cd law_backend
```

### 2. Configure Environment Variables
Copy the example environment file and fill in your local values (such as database credentials, Django secret keys, email SMTP configuration, etc.):
```bash
cp .env.example .env
```

### 3. Build and Run via Docker
The most reliable way to start the project locally is by using Docker Compose:
```bash
docker compose up --build
```
This command will build the containers and spin up the Django web application, PostgreSQL database, and Redis.

### 4. Run Migrations & Setup Data
In a separate terminal, apply the database migrations, seed the initial subscription plans, and create an admin user:
```bash
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py seed_plans
docker compose exec backend python manage.py createsuperuser
```

### 5. Access the Application
- **API Base URL**: `http://localhost:8000/`
- **Django Admin**: `http://localhost:8000/admin/`

---

## 📖 API Documentation & Postman

- Detailed API references are available in `API_REFERENCE.md`.
- A fully configured Postman collection is available in the root directory: `law_backend_postman_collection.json`. Import this into Postman to easily interact with the endpoints during development.
- Form data schemas for document generation are defined in `docs/FORM_DATA_SCHEMAS.md`.

---

## 🚢 Deployment

For deployment instructions and infrastructure setup, please refer to the deployment documentation:
- `AWS_DEPLOYMENT.md`
- `EC2_SINGLE_INSTANCE_DEPLOYMENT.md`
- `DEPLOYMENT.md`

---

## 📚 Further Reading
For a deep dive into the system's architecture, AI pipeline, data models, and known technical debt, refer to `BACKEND_STRUCTURE.md` and `PROJECT_ANALYSIS.md`.
# charisma-expert
