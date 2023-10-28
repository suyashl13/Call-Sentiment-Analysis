from django.contrib import admin

from api.user.models import CustomUser

# Register your models here.
admin.site.register(CustomUser)
