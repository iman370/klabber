from django.db import models
from django.contrib.auth.models import User
import uuid

class klab(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    place = models.CharField(max_length=20)
    description = models.CharField(max_length=280)
    maxSpaces = models.IntegerField()
    remainingSpaces = models.IntegerField(default=3)

class participant(models.Model):
    klab = models.ForeignKey(klab, on_delete=models.CASCADE)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)

class joinRequest(models.Model):
    klab = models.ForeignKey(klab, on_delete=models.CASCADE)
    hostId = models.ForeignKey(User, on_delete=models.CASCADE, related_name='hostId')
    userId = models.ForeignKey(User, on_delete=models.CASCADE, related_name='userId')

class inviteRequest(models.Model):
    klab = models.ForeignKey(klab, on_delete=models.CASCADE)
    klabHostID = models.ForeignKey(User, on_delete=models.CASCADE, related_name='klabHostID')
    senderID = models.ForeignKey(User, on_delete=models.CASCADE, related_name='senderID')