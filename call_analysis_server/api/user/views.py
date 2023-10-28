from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes

from api.user.models import CustomUser
from api.user.serializers import CustomUserSerializer


# Create your views here.
@permission_classes([AllowAny])
class UserModelViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
