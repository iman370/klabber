from django.http import HttpResponse
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import status

@api_view(['POST'])
def sign_up(request):
    data = request.data
    email = data['email']
    username = data['username']
    password = data['password']
    if (email == '' or username == '' or password == ''):
        return Response('empty-field', status.HTTP_400_BAD_REQUEST)
    if (User.objects.filter(email=email).exists()):
        return Response('email-exists', status.HTTP_400_BAD_REQUEST)
    if (User.objects.filter(username=username).exists()):
        return Response('username-exists', status.HTTP_400_BAD_REQUEST)
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status.HTTP_200_OK)
    return Response((), status=status.HTTP_400_BAD_REQUEST)