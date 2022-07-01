from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from .models import Friend, FriendRequest
from .serializers import FriendSerializer
from .serializers import FriendRequestSerializer

from rest_framework.decorators import api_view

@api_view(['GET'])
def get_all_friends(request):
    username = request.GET.get('username','')
    myId = User.objects.get(username=username).id
    myFriends = []
    friends = Friend.objects.filter(id1=myId)
    for friend in friends:
        myFriendUsername = User.objects.get(username=friend.id2).username
        myFriendNickname = User.objects.get(username=friend.id2).first_name
        myFriends.append([myFriendUsername, myFriendNickname])

    friends = Friend.objects.filter(id2=myId)
    for friend in friends:
        myFriendUsername = User.objects.get(username=friend.id1).username
        myFriendNickname = User.objects.get(username=friend.id1).first_name
        myFriends.append([myFriendUsername, myFriendNickname])
    
    return Response(myFriends, status=status.HTTP_200_OK)

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
        return Response("Removed-Friend", status=status.HTTP_200_OK)

    if Friend.objects.filter(id1=receiverID, id2=senderID).exists():
        Friend.objects.filter(id1=receiverID, id2=senderID).delete()
        return Response("Removed-Friend", status=status.HTTP_200_OK)

    #If the reciever has already sent a friend request
    #Then add them both as friends
    if FriendRequest.objects.filter(senderId=receiverID, receiverId=senderID).exists():
        serializer = FriendSerializer(data={'id1': senderID, 'id2': receiverID})
        if serializer.is_valid():
            serializer.save()
            FriendRequest.objects.filter(senderId=receiverID, receiverId=senderID).delete()
            return Response("Added-Friend", status=status.HTTP_200_OK)

    #If the sender has already sent a friend request
    #Cancel the friend request
    if FriendRequest.objects.filter(senderId=senderID, receiverId=receiverID).exists():
        FriendRequest.objects.filter(senderId=senderID, receiverId=receiverID).delete()
        return Response("Request-cancelled", status=status.HTTP_200_OK)

    #Send friend request
    serializer = FriendRequestSerializer(data={'senderId':senderID, 'receiverId':receiverID})
    if serializer.is_valid():
        serializer.save()
        return Response("Sent-Request", status=status.HTTP_200_OK)

    return Response(None, status=status.HTTP_400_BAD_REQUEST)

    