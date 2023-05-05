from django.db import models

from django.contrib.auth.models import User

# Create your models here.

class Producto(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    nombre = models.CharField(max_length=200, null=True, blank=True)
    imagen = models.ImageField(null=True, blank=True, default='/placeholder.png')
    categoria = models.CharField(max_length=200, null=True, blank=True)
    descripcion = models.TextField(null=True, blank=True)
    calificacion = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    numOpiniones = models.IntegerField(null=True, blank=True, default=0)
    precio = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    cantidad = models.IntegerField(null=True, blank=True, default=0)
    fechaCreacion = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.nombre

class Opinion(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.SET_NULL, null=True)
    usuario = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    nombre = models.CharField(max_length=200, null=True, blank=True)
    calificacion = models.IntegerField(null=True, blank=True, default=0)
    comentario = models.TextField(null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.calificacion)
    
class Orden(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    metodoPago = models.CharField(max_length=200, null=True, blank=True)
    precioFactura = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    precioEnvio = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    precioTotal = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    pagado = models.BooleanField(default=False)
    fechaPago = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    enviado = models.BooleanField(default=False)
    fechaEnvio = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    fechaCreacion = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.fechaCreacion)


class OrdenItem(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.SET_NULL, null=True)
    orden = models.ForeignKey(Orden, on_delete=models.SET_NULL, null=True)
    nombre = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    precio = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)


    def __str__(self) -> str:
        return str(self.nombre)
    
class DireccionEnvio(models.Model):
    orden = models.OneToOneField(Orden, on_delete=models.CASCADE, null=True, blank=True)
    direccion = models.CharField(max_length=200, null=True, blank=True)
    ciudad = models.CharField(max_length=200, null=True, blank=True)
    codigoPostal = models.CharField(max_length=200, null=True, blank=True)
    pais = models.CharField(max_length=200, null=True, blank=True)
    precioEnvio = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) -> str:
        return self.direccion
