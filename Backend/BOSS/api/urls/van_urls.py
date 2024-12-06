
from django.urls import path
from ..views.van_views import (get_all_vans,get_van_by_id,get_van_by_driver,get_van_by_number,create_van,edit_van,delete_van,get_all_drivers)

urlpatterns = [
    path('get_all_vans',get_all_vans),
    path('get_van_by_id/<str:van_id>',get_van_by_id),
    path('get_van_by_driver',get_van_by_driver),
    path('get_van_by_number',get_van_by_number),
    path('create_van',create_van),
    path('edit_van/<str:van_id>',edit_van),
    path('delete_van/<str:van_id>',delete_van),
    path('get_all_drivers',get_all_drivers),
]
