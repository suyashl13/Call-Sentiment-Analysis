from django.db import models
import uuid

from api.user.models import CustomUser


# Create your models here.
class CallRecording(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    customer_name = models.CharField(max_length=50, default='')
    audio_sample = models.FileField(upload_to='audio_samples')

    status = models.CharField(max_length=20, default='Added in Queue')

    added_by = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
