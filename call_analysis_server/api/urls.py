from django.urls import path, include
from .views import api_login
urlpatterns = [
    path('login/', api_login),
    path('api-auth/', include('rest_framework.urls')),
    path('call/', include('api.call.urls')),
    path('user/', include('api.user.urls'))
]
