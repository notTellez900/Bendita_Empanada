from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Producto
from base.serializers import ProductoSerializer

from rest_framework import status

@api_view(['GET'])
def getProducts(request):

    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    
    products = Producto.objects.filter(nombre__icontains=query)
    serializer = ProductoSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getTopProducts(request):
    products = Producto.objects.filter(calificacion__gte=4).order_by('-calificacion')[0:5]
    serializer = ProductoSerializer(products, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Producto.objects.get(_id=pk)
    serializer = ProductoSerializer(product, many=False)

    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):

    user = request.user
    product = Producto.objects.create(
        usuario = user,
        nombre = 'Ejemplo de nombre',
        precio = 0,
        cantidad=0,
        categoria='Ejemplo de categoria',
        descripcion=''
    )
    serializer = ProductoSerializer(product, many=False)

    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Producto.objects.get(_id=pk)

    product.nombre = data['nombre']
    product.precio = data['precio']
    product.cantidad = data['cantidad']
    product.categoria = data['categoria']
    product.descripcion = data['descripcion']

    product.save()

    serializer = ProductoSerializer(product, many=False)

    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Producto.objects.get(_id=pk)
    product.delete()
    return Response('Producto eliminado')

@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['producto_id']
    producto = Producto.objects.get(_id=product_id)

    producto.imagen = request.FILES.get('image')
    producto.save()

    return Response('Imagen subida')