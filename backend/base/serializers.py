from rest_framework import serializers

from django.contrib.auth.models import User

from rest_framework_simplejwt.tokens import RefreshToken

from .models import Producto, Orden, OrdenItem, DireccionEnvio

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model = User
        fields = ['id','_id', 'username', 'email', 'name', 'isAdmin']
    
    def get__id(self, obj):
        return obj.id
    
    def get_isAdmin(self, obj):
        return obj.is_staff
    
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email


        return name

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields =  ['id','_id', 'username', 'email', 'name', 'isAdmin', 'token']
    
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'


class DireccionEnvioSerializer(serializers.ModelSerializer):
    class Meta:
        model = DireccionEnvio
        fields = '__all__'


class OrdenItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrdenItem
        fields = '__all__'


class OrdenSerializer(serializers.ModelSerializer):
    ordenItems = serializers.SerializerMethodField(read_only=True)
    direccionEnvio = serializers.SerializerMethodField(read_only=True)
    usuario = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Orden
        fields = '__all__'

    def get_direccionEnvio(self, obj):
        try:
            direccion = DireccionEnvioSerializer(obj.direccionenvio, many=False).data
        except:
            direccion = False

        return direccion

    def get_ordenItems(self, obj):
        items = obj.ordenitem_set.all()
        serializer = OrdenItemSerializer(items, many=True)
        return serializer.data

    def get_usuario(self, obj):
        user = obj.usuario
        serializer = UserSerializer(user, many=False)
        return serializer.data





