from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import inviteRequest, joinRequest, klab, participant
from .serializers import InviteSerializer, JoinReqSerializer, KlabSerializer, ParticipantSerializer

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

    serializer = KlabSerializer(data={'userId':userId,'date':eventDate,'time':eventTime,'place':place,'description':description,'maxSpaces':maxSpaces,'takenSpaces':maxSpaces})
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
            allKlabs.append([event.id, event.userId.username, event.date, event.time, event.place, event.description, event.maxSpaces, event.takenSpaces, 1])
            continue

        #If they've requested to join
        if (joinRequest.objects.filter(klab=event, userId=myId).exists()):
            allKlabs.append([event.id, event.userId.username, event.date, event.time, event.place, event.description, event.maxSpaces, event.takenSpaces, 2])
            continue

        #If they've been invited
        if (inviteRequest.objects.filter(klab=event,receiverID=myId).exists()):
            allKlabs.append([event.id, event.userId.username, event.date, event.time, event.place, event.description, event.maxSpaces, event.takenSpaces, 3])
            continue

        #No connection to the klab
        allKlabs.append([event.id, event.userId.username, event.date, event.time, event.place, event.description, event.maxSpaces, event.takenSpaces, 0])

    return Response(allKlabs, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_my_klabs(request):
    myUsername = request.GET.get('username','')
    myId = User.objects.get(username=myUsername).id

    klabs = klab.objects.get(userId=myId)
    allKlabs = []
    for event in klabs:
        allKlabs.append([event.id, event.userId.username, event.date, event.time, event.place, event.description, event.maxSpaces, event.takenSpaces])

    return Response(allKlabs, status=status.HTTP_200_OK)

@api_view(['POST'])
def join_klab(request):
    #Returns joinStatus and takenSpaces MAKE SURE YOU ADD THISSS
    data = request.data
    klabId = data['klabId']
    theKlab = klab.objects.get(id=klabId)
    username = data['username']
    userId = User.objects.get(username=username).id
    joinStatus = data['joinStatus']

    #If user is already a participant (code:1)
    if (joinStatus==1):
        if (participant.objects.filter(klab=theKlab, userId=userId).exists()):
            participant.objects.filter(klab=theKlab, userId=userId).delete()
            #Add 1 to the remaining spaces
            serializer = KlabSerializer(instance = klab, data = {'userId':theKlab.userId,'date':theKlab.date,'time':theKlab.time,'place':theKlab.place,'description':theKlab.description,'maxSpaces':theKlab.maxSpaces,'takenSpaces':theKlab.takenSpaces})
            if serializer.is_valid():
                theKlab.takenSpaces = theKlab.takenSpaces + 1
                theKlab.save(update_fields=['takenSpaces'])
            return Response(0, status=status.HTTP_200_OK)
    #If user has already sent a join request (code:2)
    elif (joinStatus==2):
        if (joinRequest.objects.filter(klab=theKlab,userId=userId).exists()):
            joinRequest.objects.filter(klab=theKlab,userId=userId).delete()
            return Response(0, status=status.HTTP_200_OK)
    #If user has already been invited (code:3)
    elif (joinStatus==3):
        if (inviteRequest.objects.filter(klab=theKlab, receiverID=userId).exists()):
            serializer = ParticipantSerializer(data={'klab':theKlab,'userId':userId})
            if serializer.is_valid():
                inviteRequest.objects.filter(klab=theKlab, receiverID=userId).delete()
                #Minus 1 from the remaining spaces
                if (theKlab.takenSpaces == theKlab.maxSpaces):
                    return Response(0, status=status.HTTP_200_OK)
                else:
                    serializer.save()
                    return Response(1, status=status.HTTP_200_OK)
            return Response(3, status=status.HTTP_400_BAD_REQUEST)
    #Send a join request (code:0)
    elif(joinStatus==0):
        #Check if full
        
        serializer = JoinReqSerializer(data={'klab':theKlab,'hostId':theKlab.userId,'userId':userId})
        if serializer.is_valid():
            serializer.save()
            return Response(2, status=status.HTTP_200_OK)
        return Response(0, status=status.HTTP_400_BAD_REQUEST)
    return Response(joinStatus, status=status.HTTP_400_BAD_REQUEST)
