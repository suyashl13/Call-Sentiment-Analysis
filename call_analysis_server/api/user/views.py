from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes

from api.user.models import CustomUser
from api.user.serializers import CustomUserSerializer


# Create your views here.
# @csrf_exempt
@permission_classes([AllowAny])
class UserModelViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
