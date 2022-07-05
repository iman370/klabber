from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import klab, participants
from .serializers import KlabSerializer, ParticipantsSerializer

import datetime

from rest_framework.decorators import api_view

@api_view(['POST'])
def post_klab(request):
    data = request.data
    username = data['username']
    userId = User.objects.get(username=username).id
    date = data['date']
    print("date: " + date)
    eventDate = datetime.date(2022,8,1) #1st August 2022
    time = data['time']
    print("time: " + time)
    eventTime = datetime.time(10,00) #10am
    place = data['place']
    description = data['description']
    maxSpaces = data['maxSpaces']
    if (len(description) == 0):
        return Response('empty-field', status.HTTP_400_BAD_REQUEST)
    if (maxSpaces<1):
        return Response('not-enough-spaces', status.HTTP_400_BAD_REQUEST)

    serializer = KlabSerializer(data={'userId':userId,'date':eventDate,'time':eventTime,'place':place,'description':description,'maxSpaces':maxSpaces})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status.HTTP_200_OK)

    return Response((), status=status.HTTP_400_BAD_REQUEST)
