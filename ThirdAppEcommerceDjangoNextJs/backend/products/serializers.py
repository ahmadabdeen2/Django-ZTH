from rest_framework import serializers
from .models import Book, Grocery, Category, Hello

class BookSerliazer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class GrocerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Grocery
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class HelloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hello
        fields = '__all__'

    


