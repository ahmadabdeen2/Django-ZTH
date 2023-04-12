from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.models import User, auth
from django.contrib.auth.decorators import login_required

from core.models import Profile, Post, LikePost, FollowersCount
# from .models import Profile


@login_required(login_url='core:signin')
def index(request):
    # user_object = User.objects.get(username=request.user.username)
    user_profile = Profile.objects.get(user=request.user)
    posts = Post.objects.all()
    context = {
        'user_profile': user_profile,
        'posts': posts,
    }

    return render(request, "index.html", context)


def signup(request):

    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        password2 = request.POST['password2']
        
        if (password == password2):
            if User.objects.filter(email =email).exists():
                messages.error(request, "Email already exists")
                return redirect('core:signup')
            elif User.objects.filter(username=username).exists():
                messages.error(request, "Username already exists")
                return redirect('core:signup')
            else:
                user = User.objects.create_user(username=username, email=email, password=password)
                user.save()

                user_login = authenticate(username=username, password=password)
                login(request, user_login)


                user_model = User.objects.get(username = username)
                profile = Profile.objects.create(user = user_model, username = username, email = email)
                profile.save()
                messages.success(request, "Account created successfully")
                return redirect('core:settings')
                
        else:
            messages.error(request, "Passwords do not match")
            return redirect('core:signup')
    else:
        return render(request, "signup.html")
    

def signin(request):

    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('/')
        else:
            messages.error(request, "Invalid credentials")
            return redirect('core:signin')
    else:
        return render(request, "signin.html")
    

@login_required(login_url='core:signin')
def signout(request):
    auth.logout(request)
    return redirect('core:signin')

@login_required(login_url='core:signin')
def settings(request):
    user_profile = Profile.objects.get(user = request.user)
    if request.method == 'POST':
        if request.FILES.get('image') == None:
            image = user_profile.profile_pic
            bio = request.POST['bio']
            location = request.POST['location']
            user_profile.profile_pic = image
            user_profile.bio = bio
            user_profile.location = location
            user_profile.save()
            messages.success(request, "Profile updated successfully")
            return redirect('core:settings')
        elif request.FILES.get('image') != None:
            image = request.FILES.get('image')
            bio = request.POST['bio']
            location = request.POST['location']
            user_profile.profile_pic = image
            user_profile.bio = bio
            user_profile.location = location
            user_profile.save()
            messages.success(request, "Profile updated successfully")
            return redirect('core:settings')
        

    context = {
        'user_profile': user_profile
    }
    return render(request, "setting.html", context)

@login_required(login_url='core:signin')
def upload(request):
    if request.method == 'POST':
        user = request.user.username
        image = request.FILES.get('image_upload')
        caption = request.POST['caption']
        post = Post.objects.create(user = user, image = image, caption = caption)
        post.save()

        return redirect('/')
    else:
        return redirect('/')
    
@login_required(login_url='core:signin')
def like_post(request, id):
    username = request.user.username
    post = Post.objects.get(id = id)

    like_filter = LikePost.objects.filter(post_id=id, user=username).first()
    if like_filter == None:
        like = LikePost.objects.create(post_id=id, user=username)
        like.save()
        post.likes += 1
        post.save()
        return redirect('/')
    else:
        like_filter.delete()
        post.likes -= 1
        post.save()
        return redirect('/')


@login_required(login_url='core:signin')
def profile(request, pk):
    user_objects = User.objects.get(username = pk)
    User_profile = Profile.objects.get(user = user_objects)
    user_posts = Post.objects.filter(user = pk)
    user_posts_count = len(user_posts)
    context = {
        'user_profile': User_profile,
        'user_objects': user_objects,
        'user_posts': user_posts,
        'user_posts_count': user_posts_count
    }
    return render(request, 'profile.html', context)

@login_required(login_url='core:signin')
def follow(request, pk):
    if request.method =='POST':
        user_follower = User.objects.get(username = pk)
        user_follower_username = user_follower.profile.username
        user_profile = Profile.objects.get(user = request.user)
        user_profile_username = user_profile.username

        if FollowersCount.objects.filter(follower=user_follower_username, user = user_profile_username).first():
            delete_followers = FollowersCount.objects.get(follower=user_follower_username, user = user_profile_username)
            delete_followers.delete()
            return redirect('core:profile', pk)
        else:
            new_followers = FollowersCount.objects.create(follower=user_follower_username, user = user_profile_username)
            new_followers.save()
            return redirect('core:profile', pk)

    else:
        return redirect('/')