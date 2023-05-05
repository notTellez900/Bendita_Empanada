from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Producto, Orden, OrdenItem, DireccionEnvio
from base.serializers import ProductoSerializer, OrdenSerializer

from rest_framework import status
from datetime import datetime


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrdenItems(request):
    user = request.user
    data = request.data

    ordenItems = data['ordenItems']

    if ordenItems and len(ordenItems) == 0:
        return Response({
            'detail': 'No hay items en el pedido'
        }, status=status.HTTP_400_BAD_REQUEST)
    else:
        # (1) create orden
        orden = Orden.objects.create(
            usuario = user,
            metodoPago = data['metodoPago'],
            precioFactura = data['precioFactura'],
            precioEnvio = data['precioEnvio'],
            precioTotal = data['precioTotal']
        )
        # (2) Create direccion de envio
        direccionEnvio = DireccionEnvio.objects.create(
            orden = orden,
            direccion = data['direccionEnvio']['address'],
            ciudad = data['direccionEnvio']['city'],
            codigoPostal = data['direccionEnvio']['postalCode'],
            pais = data['direccionEnvio']['country']

        )
        # (3) Create orden Items y poner la relacion junto al modelo OrdenItem
        for i in ordenItems:
            producto = Producto.objects.get(_id = i['producto'])

            item = OrdenItem.objects.create(
                producto = producto,
                orden = orden,
                nombre = producto.nombre,
                qty = i['qty'],
                precio = i['precio'],
                image = producto.imagen.url
            )

            # (4) Update la cantidad de productos

            producto.cantidad -= item.qty
            producto.save() 

        serializer = OrdenSerializer(orden, many=False)
    
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMisOrdenes(request):
    user = request.user
    ordenes = user.orden_set.all()
    serializer = OrdenSerializer(ordenes, many=True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrdenes(request):
    
    ordenes = Orden.objects.all()
    serializer = OrdenSerializer(ordenes, many=True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])    
def getOrdenById(request, pk):

    user = request.user

    try:
        orden = Orden.objects.get(_id=pk)

        if user.is_staff or orden.usuario == user:
            serializer = OrdenSerializer(orden, many=False)
            return Response(serializer.data)
        else:
            Response({
                'detail': 'No estas autorizado para ver esta orden'
            }, status = status.HTTP_400_BAD_REQUEST)
    except:
        return Response({
            'detail': 'La orden no existe'
        }, status = status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])  
def updateOrdenPagado(request, pk):
    orden = Orden.objects.get(_id=pk)

    orden.pagado = True
    orden.fechaPago = datetime.now()
    orden.save()

    return Response('Orden pagada')


@api_view(['PUT'])
@permission_classes([IsAdminUser])  
def updateOrdenEnvio(request, pk):
    orden = Orden.objects.get(_id=pk)

    orden.enviado = True
    orden.fechaEnvio = datetime.now()
    orden.save()

    return Response('Orden enviada')
