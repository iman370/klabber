from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import inviteRequest, joinRequest, klab, participant
from .serializers import InviteSerializer, JoinReqSerializer, KlabSerializer, ParticipantSerializer

import datetime

from rest_framework.decorators import api_view

from klabs import serializers

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

    serializer = KlabSerializer(data={'userId':userId,'date':eventDate,'time':eventTime,'place':place,'description':description,'maxSpaces':maxSpaces,'takenSpaces':0})
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

    klabs = klab.objects.filter(userId=myId)
    allKlabs = []
    for event in klabs:
        allKlabs.append([event.id, event.userId.username, event.date, event.time, event.place, event.description, event.maxSpaces, event.takenSpaces])

    return Response(allKlabs, status=status.HTTP_200_OK)

@api_view(['POST'])
def join_klab(request):
    #Returns joinStatus and takenSpaces MAKE SURE YOU ADD THISSS
    data = request.data
    print(data) #REMOVEEEE
    klabId = data['klabId']
    theKlab = klab.objects.get(id=klabId)
    username = data['username']
    userId = User.objects.get(username=username).id

    #If user is already a participant (code:1)
    if (participant.objects.filter(klab=theKlab, userId=userId).exists()):
        participant.objects.filter(klab=theKlab, userId=userId).delete()
        #Minus 1 to the raken spaces
        serializer = KlabSerializer(instance = klab, data = {'userId':theKlab.userId,'date':theKlab.date,'time':theKlab.time,'place':theKlab.place,'description':theKlab.description,'maxSpaces':theKlab.maxSpaces,'takenSpaces':theKlab.takenSpaces})
        if serializer.is_valid():
            theKlab.takenSpaces = theKlab.takenSpaces - 1
            theKlab.save(update_fields=['takenSpaces'])
        return Response(0, status=status.HTTP_200_OK)
    #If user has already sent a join request (code:2)
    elif (joinRequest.objects.filter(klab=theKlab,userId=userId).exists()):
        joinRequest.objects.filter(klab=theKlab,userId=userId).delete()
        return Response(0, status=status.HTTP_200_OK)
    #If user has already been invited (code:3)
    elif (inviteRequest.objects.filter(klab=theKlab, receiverID=userId).exists()):
        serializer = ParticipantSerializer(data={'klab':klabId,'userId':userId})
        if serializer.is_valid():
            inviteRequest.objects.filter(klab=theKlab, receiverID=userId).delete()
            #Check if full
            if (theKlab.takenSpaces == theKlab.maxSpaces):
                return Response(0, status=status.HTTP_200_OK)
            else: #Else add 1 to the taken spaces
                serializer.save()
                theKlab.takenSpaces = theKlab.takenSpaces + 1
                theKlab.save(update_fields=['takenSpaces'])
                return Response(1, status=status.HTTP_200_OK)
        return Response(3, status=status.HTTP_400_BAD_REQUEST)
    #Send a join request (code:0)
    else:
        #Check if full
        if (theKlab.takenSpaces >= theKlab.maxSpaces):
            return Response(0, status=status.HTTP_200_OK)
        theHostId = User.objects.get(id=theKlab.userId.id).id
        joinSerializer = JoinReqSerializer(data={'klab':klabId,'hostId':theHostId,'userId':userId})
        if joinSerializer.is_valid():
            joinSerializer.save()
            return Response(2, status=status.HTTP_200_OK)
        return Response(0, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def klabs_im_attending(request):
    myUsername = request.GET.get('username','')
    myId = User.objects.get(username=myUsername).id

    attendingKlabs = participant.objects.filter(userId=myId)

    allKlabs = []
    for item in attendingKlabs:
        event = klab.objects.get(id=item.klab.id)
        allKlabs.append([event.id, event.userId.username, event.date, event.time, event.place, event.description, event.maxSpaces, event.takenSpaces, 1])

    return Response(allKlabs, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_join_requests(request):
    myUsername = request.GET.get('username','')
    myId = User.objects.get(username=myUsername).id

    getRequests = joinRequest.objects.filter(hostId=myId)

    allRequests = []
    for item in getRequests:
        theKlab = klab.objects.get(id=item.klab.id)
        allRequests.append([item.userId,theKlab.id,theKlab.date,theKlab.time,theKlab.place,theKlab.description,theKlab.maxSpaces,theKlab.takenSpaces])

    return Response(allRequests, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_invite_requests(request):
    myUsername = request.GET.get('username','')
    myId = User.objects.get(username=myUsername).id

    getRequests = inviteRequest.objects.filter(klabHostID=myId)

    allRequests = []
    for item in getRequests:
        theKlab = klab.objects.get(id=item.klab.id)
        allRequests.append([item.receiverID,theKlab.id,theKlab.date,theKlab.time,theKlab.place,theKlab.description,theKlab.maxSpaces,theKlab.takenSpaces])

    return Response(allRequests, status=status.HTTP_200_OK)

@api_view(['POST'])
def accept_invite(request):
    data = request.data
    klabId = data['klabId']
    hostId = data['hostId']
    userId = data['userId']

    if (inviteRequest.objects.filter(klab=klabId,klabHostID=hostId,receiverID=userId).exists()):
        theKlab = klab.objects.get(id=klabId)
        if (theKlab.takenSpaces == theKlab.maxSpaces):
            return Response('full', status=status.HTTP_200_OK)
        else:
            serializer = ParticipantSerializer(data={'klab':klabId,'userId':userId})
            if serializer.is_valid():
                serializer.save()
                #Add 1 to the taken spaces
                theKlab.takenSpaces = theKlab.takenSpaces + 1
                theKlab.save(update_fields=['takenSpaces'])
                inviteRequest.objects.filter(klab=klabId,klabHostID=hostId,receiverID=userId).delete()
                return Response('accepted', status=status.HTTP_200_OK)
    return Response('error', status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def reject_invite(request):
    data = request.data
    klabId = data['klabId']
    hostId = data['hostId']
    userId = data['userId']

    if (inviteRequest.objects.filter(klab=klabId,klabHostID=hostId,receiverID=userId).exists()):
        inviteRequest.objects.filter(klab=klabId,klabHostID=hostId,receiverID=userId).delete()
        return Response('rejected', status=status.HTTP_200_OK)
    return Response('error', status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def accept_join_req(request):
    data = request.data
    klabId = data['klabId']
    hostId = data['hostId']
    userId = data['userId']

    if (joinRequest.objects.filter(klab=klabId,hostId=hostId,userId=userId).exists()):
        theKlab = klab.objects.get(id=klabId)
        if (theKlab.takenSpaces == theKlab.maxSpaces):
            return Response('full', status=status.HTTP_200_OK)
        else:
            serializer = ParticipantSerializer(data={'klab':klabId,'userId':userId})
            if serializer.is_valid():
                serializer.save()
                #Add 1 to the taken spaces
                theKlab.takenSpaces = theKlab.takenSpaces + 1
                theKlab.save(update_fields=['takenSpaces'])
                joinRequest.objects.filter(klab=klabId,hostId=hostId,userId=userId).delete()
                return Response('accepted', status=status.HTTP_200_OK)
    return Response('error', status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def reject_join_req(request):
    data = request.data
    klabId = data['klabId']
    hostId = data['hostId']
    userId = data['userId']

    if (joinRequest.objects.filter(klab=klabId,hostId=hostId,userId=userId).exists()):
        joinRequest.objects.filter(klab=klabId,hostId=hostId,userId=userId).delete()
        return Response('rejected', status=status.HTTP_200_OK)
    return Response('error', status=status.HTTP_400_BAD_REQUEST)
