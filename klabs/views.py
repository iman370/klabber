from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import klab, participant
from .serializers import KlabSerializer, ParticipantSerializer

import datetime

from rest_framework.decorators import api_view

@api_view(['POST'])
def post_klab(request):
    data = request.data
    username = data['username']
    userId = User.objects.get(username=username).id
    date = data['date']
    splitData = date.split("-")
    eventDate = datetime.date(int(splitData[0]),int(splitData[1]),int(splitData[2]))
    time = data['time']
    splitTime = time.split(":")
    eventTime = datetime.time(int(splitTime[0]),int(splitTime[1])) 
    place = data['place']
    description = data['description']
    maxSpaces = int(data['maxSpaces'])
    if (len(description) == 0):
        return Response('empty-field', status.HTTP_400_BAD_REQUEST)
    if (maxSpaces<1):
        return Response('not-enough-spaces', status.HTTP_400_BAD_REQUEST)
    if (klab.objects.filter(userId=userId,date=eventDate,time=eventTime,place=place,description=description,maxSpaces=maxSpaces).exists()):
        return Response('already-exists', status.HTTP_400_BAD_REQUEST)

    serializer = KlabSerializer(data={'userId':userId,'date':eventDate,'time':eventTime,'place':place,'description':description,'maxSpaces':maxSpaces,'remainingSpaces':maxSpaces})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status.HTTP_200_OK)

    return Response((), status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_all_klabs(request):
    myUsername = request.GET.get('username','')
    myId = User.objects.get(username=myUsername).id

    klabs = klab.objects.exclude(userId=myId)
    allKlabs = []
    for event in klabs:
        allKlabs.append([event.userId.username, event.date, event.time, event.place, event.description, event.maxSpaces, event.remainingSpaces])

    return Response(allKlabs, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_my_klabs(request):
    myUsername = request.GET.get('username','')
    myId = User.objects.get(username=myUsername).id

    klabs = klab.objects.get(userId=myId)
    allKlabs = []
    for event in klabs:
        #If they're a participant

        #If they've requested to join

        #If they've been invited

        #No connection to the klab
        allKlabs.append([event.userId.username, event.date, event.time, event.place, event.description, event.maxSpaces, event.remainingSpaces])

    return Response(allKlabs, status=status.HTTP_200_OK)
