from django.db import models
from django.contrib.auth.models import User

class klab(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    place = models.CharField(max_length=20)
    description = models.CharField(max_length=280)
    maxSpaces = models.IntegerField()

class participant(models.Model):
    klab = models.ForeignKey(klab, on_delete=models.CASCADE)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)

class joinRequest(models.Model):
    klab = models.ForeignKey(klab, on_delete=models.CASCADE)
    hostId = models.ForeignKey(User, on_delete=models.CASCADE, related_name='hostId')
    userId = models.ForeignKey(User, on_delete=models.CASCADE, related_name='userId')