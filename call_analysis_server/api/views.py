import json

from django.contrib.auth import login
from django.core.handlers.wsgi import WSGIRequest
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from api.user.models import CustomUser


# Create your views here.
@csrf_exempt
def api_login(request: WSGIRequest):
    if request.method != 'POST':
        return JsonResponse({'err': "invalid http request"}, status=405)

    usr_credentials = json.loads(request.body)

    try:
        usr = CustomUser.objects.get(email=usr_credentials['email'])

        if usr.check_password(usr_credentials['password']):
            login(request, user=usr)
            return JsonResponse({'success': True })
        else:
            return JsonResponse({'err': 'Incorrect password.'}, status=401)

    except Exception as e:
        return JsonResponse({'err': 'Invalid email or password.'}, status=400)