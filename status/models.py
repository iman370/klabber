from django.db import models
from django.contrib.auth.models import User

class Status(models.Model):
    visibility_options = ['friends','public']

    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=280)
    visibility = models.CharField(visibility=visibility_options, default='public')