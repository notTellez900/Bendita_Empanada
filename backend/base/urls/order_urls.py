from django.urls import path
from base.views import order_views as views




urlpatterns = [

    path('', views.getOrdenes, name='orders'),

    path('add/', views.addOrdenItems, name='order-add'),
    path('myorders/', views.getMisOrdenes, name='myorders'),

    path('<str:pk>/deliver/', views.updateOrdenEnvio, name='order-delivered'),
    path('<str:pk>/', views.getOrdenById, name='order-add'),
    path('<str:pk>/pay/', views.updateOrdenPagado, name='pay')

]