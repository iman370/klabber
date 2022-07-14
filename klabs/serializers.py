from rest_framework import serializers
from .models import klab, participant, joinRequest, inviteRequest

class KlabSerializer(serializers.ModelSerializer):
    class Meta:
        model = klab
        fields = ('userId','date','time','place','description','maxSpaces', 'takenSpaces')

class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = participant
        fields = ('klab','userId')

class JoinReqSerializer(serializers.ModelSerializer):
    class Meta:
        model = joinRequest
        fields = ('klab','hostId','userId')

class InviteSerializer(serializers.ModelSerializer):
    class Meta:
        model = joinRequest
        fields = ('klab','klabHostID','receiverID')