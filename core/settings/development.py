"""Development settings — local-only overrides."""
from .base import *  # noqa: F401,F403

DEBUG = True

# Allow everything locally.
ALLOWED_HOSTS = ['*']

# Email uses real SMTP (Gmail) from base settings so verification/reset
# emails actually send during development. To silence email locally instead,
# set EMAIL_BACKEND below to the console backend.
# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Relax CORS during local frontend development.
CORS_ALLOW_ALL_ORIGINS = True

# When running locally without Redis or a separate Celery worker daemon,
# execute Celery tasks synchronously in-process.
CELERY_TASK_ALWAYS_EAGER = True
CELERY_TASK_EAGER_PROPAGATES = True
