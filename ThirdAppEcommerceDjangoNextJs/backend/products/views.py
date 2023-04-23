from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Book
from .serializers import BookSerliazer


# Create your views here.


class BookViewSet(ModelViewSet):
    serializer_class = BookSerliazer
    queryset = Book.objects.all()
