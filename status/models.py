from django.db import models
from django.contrib.auth.models import User

class Status(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=280)