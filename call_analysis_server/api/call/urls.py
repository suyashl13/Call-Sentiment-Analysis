from rest_framework.routers import SimpleRouter

from api.call.views import CallRecordingAPIView

router = SimpleRouter()
router.register('', CallRecordingAPIView)

urlpatterns = []

urlpatterns += router.urls