from django.db import models
from django.contrib.auth.models import User

class Friend(models.Model):
    id1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='id1')
    id2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='id2')

class FriendRequest(models.Model):
    senderId = models.ForeignKey(User, on_delete=models.CASCADE, related_name='senderId')
    receiverId = models.ForeignKey(User, on_delete=models.CASCADE, related_name='receiverId')