from django.dispatch import receiver
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from .models import Friend, FriendRequest
from .serializers import FriendSerializer
from .serializers import FriendRequestSerializer

from rest_framework.decorators import api_view

#FRIEND CODES:
# 0 - Not friends
# 1 - Friends
# 2 - Incoming request
# 3 - Outgoing request

@api_view(['GET'])
def get_other_users(request):
    myUsername = request.GET.get('username','')
    myId = User.objects.get(username=myUsername).id

    users = User.objects.exclude(username=myUsername)
    allUsers = []
    for user in users:
        userId = user.id
        
        #If the 2 users are friends
        if (Friend.objects.filter(id1=myId, id2=userId).exists() or Friend.objects.filter(id1=userId, id2=myId).exists()):
            allUsers.append([user.username, user.first_name, 1])
            continue

        #If this user has sent a friend request to the user logged in
        if (FriendRequest.objects.filter(senderId=userId, receiverId=myId).exists()):
            allUsers.append([user.username, user.first_name, 2])
            continue

        #If the user logged in has sent a friend request to this user
        if (FriendRequest.objects.filter(senderId=myId, receiverId=userId).exists()):
            allUsers.append([user.username, user.first_name, 3])
            continue

        #If the 2 users are not friends at all
        allUsers.append([user.username, user.first_name, 0])

    return Response(sorted(allUsers), status=status.HTTP_200_OK)

@api_view(['GET'])
def get_all_friends(request):
    username = request.GET.get('username','')
    myId = User.objects.get(username=username).id
    myFriends = []
    friends = Friend.objects.filter(id1=myId)
    for friend in friends:
        myFriendUsername = User.objects.get(username=friend.id2).username
        myFriendNickname = User.objects.get(username=friend.id2).first_name
        myFriends.append([myFriendUsername, myFriendNickname, 1])

    friends = Friend.objects.filter(id2=myId)
    for friend in friends:
        myFriendUsername = User.objects.get(username=friend.id1).username
        myFriendNickname = User.objects.get(username=friend.id1).first_name
        myFriends.append([myFriendUsername, myFriendNickname, 1])
    
    return Response(sorted(myFriends), status=status.HTTP_200_OK)

@api_view(['GET'])
def get_incoming_requests(request):
    username = request.GET.get('username','')
    myId = User.objects.get(username=username).id
    requests = FriendRequest.objects.filter(receiverId=myId)
    users = []
    for user in requests:
        thisUser = User.objects.get(username=user.senderId)
        users.append([thisUser.username, thisUser.first_name, 2])

    return Response(sorted(users), status=status.HTTP_200_OK)


@api_view(['POST'])
def checkFriend(request):
    data = request.data
    senderName = data['sender']
    sender = User.objects.get(username=senderName)
    receiverName = data['reciever']
    receiver = User.objects.get(username=receiverName)

    senderID = sender.id
    receiverID = receiver.id

    #If the 2 users are already friends
    #Remove them as friends
    if Friend.objects.filter(id1=senderID, id2=receiverID).exists():
        Friend.objects.filter(id1=senderID, id2=receiverID).delete()
        return Response(0, status=status.HTTP_200_OK)

    if Friend.objects.filter(id1=receiverID, id2=senderID).exists():
        Friend.objects.filter(id1=receiverID, id2=senderID).delete()
        return Response(0, status=status.HTTP_200_OK)

    #If the reciever has already sent a friend request
    #Then add them both as friends
    if FriendRequest.objects.filter(senderId=receiverID, receiverId=senderID).exists():
        serializer = FriendSerializer(data={'id1': senderID, 'id2': receiverID})
        if serializer.is_valid():
            serializer.save()
            FriendRequest.objects.filter(senderId=receiverID, receiverId=senderID).delete()
            return Response(1, status=status.HTTP_200_OK)

    #If the sender has already sent a friend request
    #Cancel the friend request
    if FriendRequest.objects.filter(senderId=senderID, receiverId=receiverID).exists():
        FriendRequest.objects.filter(senderId=senderID, receiverId=receiverID).delete()
        return Response(0, status=status.HTTP_200_OK)

    #Send friend request
    serializer = FriendRequestSerializer(data={'senderId':senderID, 'receiverId':receiverID})
    if serializer.is_valid():
        serializer.save()
        return Response(3, status=status.HTTP_200_OK)

    return Response(None, status=status.HTTP_400_BAD_REQUEST)