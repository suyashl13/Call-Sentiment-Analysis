import uuid

from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    full_name = models.CharField(max_length=60)

    username = None
    first_name = None
    last_name = None

    email = models.EmailField(max_length=60, unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
