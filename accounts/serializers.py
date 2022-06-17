from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_jwt.settings import api_settings

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id','username', 'first_name','email','password')
		extra_kwargs = {"password":{'write_only': True}}

	def create(self,validated_data):
		return User.objects.create_user(self.validated_data['username'],first_name=validated_data['first_name'],email=validated_data['email'],password=validated_data['password'])
