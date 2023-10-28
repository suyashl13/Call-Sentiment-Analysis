from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

from api.call.models import CallRecording
from api.call.serializers import CallSerializer


# Create your views here.
@permission_classes([IsAuthenticated])
class CallRecordingAPIView(ModelViewSet):
    queryset = CallRecording.objects.all()
    serializer_class = CallSerializer

