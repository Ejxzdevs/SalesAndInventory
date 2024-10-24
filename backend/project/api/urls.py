from django.urls import path
from .views import getProducts ,createProduct, deleteProduct

urlpatterns = [
    path('products/',getProducts, name='getProducts'),
    path('products/create/',createProduct, name='createProduct'),
    path('products/delete/<int:id>/', deleteProduct, name='deleteProduct'),
]