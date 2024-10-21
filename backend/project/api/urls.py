from django.urls import path
from .views import getProducts ,createProduct

urlpatterns = [
    path('products/',getProducts, name='getProducts'),
    path('products/create/',createProduct, name='createProduct')
]