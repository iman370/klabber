from rest_framework import serializers
from .models import Friend
from .models import FriendRequest

class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend
        fields = ('id1', 'id2')

class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = ('senderId', 'receiverId')