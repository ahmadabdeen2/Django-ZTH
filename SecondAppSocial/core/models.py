from django.db import models
from django.contrib.auth.models import AbstractUser


class Profile(AbstractUser):
    bio = models.TextField(max_length=500, blank=True)
    profile_pic = models.ImageField(upload_to='profile_pics', default = 'blank-profile-picture.png')
    location = models.CharField(max_length=50, blank=True)
    def __str__(self):
        return self.username
