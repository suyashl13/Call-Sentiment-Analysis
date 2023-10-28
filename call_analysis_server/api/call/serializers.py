from rest_framework.serializers import ModelSerializer
from .models import CallRecording
from call_analysis_server.exceptions import api_exceptions


class CallSerializer(ModelSerializer):

    def validate(self, attrs):
        # Can perform validation over here

        # if True:
        #     raise api_exceptions.CustomValidation('', 'customer_name', 400)
        return attrs

    class Meta:
        model = CallRecording
        fields = '__all__'
