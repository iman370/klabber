from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import inviteRequest, joinRequest, klab, participant
from .serializers import KlabSerializer, ParticipantSerializer

import datetime

from rest_framework.decorators import api_view

#KLAB CODES
# 0 - Not apart of the klab
# 1 - Joined the klab
# 2 - Requested
# 3 - Invited

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

#NOTES
#Add event.id
#Fix this code (it shows Accept Invite instead of Join)

@api_view(['GET'])
def get_all_klabs(request):
    myUsername = request.GET.get('username','')
    myId = User.objects.get(username=myUsername).id

    klabs = klab.objects.exclude(userId=myId)
    allKlabs = []
    for event in klabs:
        #If they're a participant
        if (participant.objects.filter(klab=event, userId=myId).exists()):
            allKlabs.append([event.id, event.userId.username, event.date, event.time, event.place, event.description, event.maxSpaces, event.remainingSpaces, 1])
            continue

        #If they've requested to join
        if (joinRequest.objects.filter(klab=event, userId=myId).exists()):
            allKlabs.append([event.id, event.userId.username, event.date, event.time, event.place, event.description, event.maxSpaces, event.remainingSpaces, 2])
            continue

        #If they've been invited
        if (inviteRequest.objects.filter(klab=event, senderID=myId).exists()):
            allKlabs.append([event.id, event.userId.username, event.date, event.time, event.place, event.description, event.maxSpaces, event.remainingSpaces, 3])
            continue

        #No connection to the klab
        allKlabs.append([event.id, event.userId.username, event.date, event.time, event.place, event.description, event.maxSpaces, event.remainingSpaces, 0])

    return Response(allKlabs, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_my_klabs(request):
    myUsername = request.GET.get('username','')
    myId = User.objects.get(username=myUsername).id

    klabs = klab.objects.get(userId=myId)
    allKlabs = []
    for event in klabs:
        allKlabs.append([event.id, event.userId.username, event.date, event.time, event.place, event.description, event.maxSpaces, event.remainingSpaces])

    return Response(allKlabs, status=status.HTTP_200_OK)

@api_view(['POST'])
def join_klab(request):
    data = request.data

@api_view(['POST'])
def respond_to_invite_request(request):
    data = request.data
    klabId = data['klabid']
    myUsername = data['myUsername']
    senderUsername = data['senderUsername']
    reply = data['reply']

    if (inviteRequest.objects.filter(klab=klabId, klabHostID=myUsername.id, senderID=senderUsername.id).exists()):
        inviteRequest.objects.filter(klab=klabId, klabHostID=myUsername.id, senderID=senderUsername.id).delete()
        if (reply=='accept'):
            serializer = ParticipantSerializer(data={'klab':klabId,'userId':senderUsername.id})
            if serializer.is_valid():
                serializer.save()
                return Response('accepted', status=status.HTTP_200_OK)
    
    return Response('rejected', status=status.HTTP_200_OK)