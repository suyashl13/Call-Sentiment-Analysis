from rest_framework.routers import SimpleRouter
from .views import UserModelViewSet
from django.urls import path, include


router = SimpleRouter()
router.register('', UserModelViewSet)

urlpatterns = [

]

urlpatterns += router.urls
