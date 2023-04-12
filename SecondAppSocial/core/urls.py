from django.urls import path
from . import views

app_name = "core"
urlpatterns = [
    path("", views.index, name="index"),
    path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name='signin'),
    path('signout/', views.signout, name='signout'),
    path('settings/', views.settings, name='settings'),
    path('upload', views.upload, name='upload'),
    path('like_post/<uuid:id>', views.like_post, name='like_post'),
    path("profile/<str:pk>/", views.profile, name="profile"),
    path("profile/<str:pk>/follow", views.follow, name="follow"),
]