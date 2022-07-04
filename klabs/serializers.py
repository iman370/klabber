from rest_framework import serializers
from .models import klab, participants

class KlabSerializer(serializers.ModelSerializer):
    class Meta:
        model = klab
        fields = ('userId','date','time','place','description','maxSpaces')

class ParticipantsSerializer(serializers.ModelSerializer):
    class Meta:
        model = participants
        fields = ('klab','userId')