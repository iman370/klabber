from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import Status
from .serializers import StatusSerializer

from rest_framework.decorators import api_view

@api_view(['POST'])
def post_status(request):
    data = request.data
    username = data['username']
    userId = User.objects.get(username=username).id
    text = data['text']
    if (len(text)==0):
        return Response('empty-field', status.HTTP_400_BAD_REQUEST)
    if (len(text)>280):
        return Response('too-long', status.HTTP_400_BAD_REQUEST)
    serializer = StatusSerializer(data = {'userId':userId,'text':text})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status.HTTP_200_OK)
    return Response((), status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_statuses(request):
    allStatuses = []
    statuses = Status.objects.all()
    for userStatus in statuses:
        username = User.objects.get(username=userStatus.userId).username
        nickname = User.objects.get(username=userStatus.userId).first_name
        text = userStatus.text
        allStatuses.append([username, nickname, text])

    return Response(list(reversed(allStatuses)), status=status.HTTP_200_OK)