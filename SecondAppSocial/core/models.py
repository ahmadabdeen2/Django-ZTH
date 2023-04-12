from django.db import models
from django.contrib.auth import get_user_model
import uuid
from datetime import datetime
from django.utils import timezone
User = get_user_model()


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=50, blank=True)
    email = models.EmailField(max_length=50, blank=True)
    bio = models.TextField(max_length=500, blank=True)
    profile_pic = models.ImageField(upload_to='profile_pics', default = 'blank-profile-picture.png')
    location = models.CharField(max_length=50, blank=True)
    def __str__(self):
        return self.username


class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.CharField(max_length=50, blank=True)
    image = models.ImageField(upload_to='post_pics')
    caption = models.TextField(max_length=500, blank=True)
    likes = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user


class LikePost(models.Model):
    post_id =models.CharField(max_length=50, blank=True)
    user = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.user
    
class FollowersCount(models.Model):
    follower = models.CharField(max_length=50, blank=True)
    user = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.user