import this
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import Friend, FriendRequest
from .serializers import FriendSerializer
from .serializers import FriendRequestSerializer

from rest_framework.decorators import api_view

@api_view(['GET'])
def get_all_users(request):
    data = request.data
    username = data['username']
    thisUser = User.objects.get(username=username)
    userId = thisUser.id
    users = User.objects.exclude(pk=userId)
    usernames = []
    for user in users:
        usernames.append(user.username)
    return Response(usernames, status=status.HTTP_200_OK)