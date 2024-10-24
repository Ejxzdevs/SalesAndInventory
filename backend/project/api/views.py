from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializer import ProductSerializer

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializeData = ProductSerializer(products ,many=True).data
    return Response(serializeData)

@api_view(['POST'])
def createProduct(request):
    product = request.data
    serializeData = ProductSerializer(data=product)
    if serializeData.is_valid():
        serializeData.save()
        return Response(serializeData.data ,status=status.HTTP_201_CREATED)
    return Response(serializeData.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deleteProduct(request, id):
    try:
        product = Product.objects.get(product_id=id)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)