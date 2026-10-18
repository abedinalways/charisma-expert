"""Development settings — local-only overrides."""
from .base import *  # noqa: F401,F403

DEBUG = True

# Allow everything locally.
ALLOWED_HOSTS = ['*']

# If live SMTP credentials are provided, use SMTP; otherwise fallback to console backend.
if env('EMAIL_HOST_USER', default='') and env('EMAIL_HOST_PASSWORD', default=''):
    EMAIL_BACKEND = env('EMAIL_BACKEND', default='django.core.mail.backends.smtp.EmailBackend')
else:
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Relax CORS during local frontend development.
CORS_ALLOW_ALL_ORIGINS = True

# When running locally without Redis or a separate Celery worker daemon,
# execute Celery tasks synchronously in-process.
CELERY_TASK_ALWAYS_EAGER = True
CELERY_TASK_EAGER_PROPAGATES = True
