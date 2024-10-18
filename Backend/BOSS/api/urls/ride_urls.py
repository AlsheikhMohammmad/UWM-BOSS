from django.urls import path
from ..views.ride_views import (
    get_ride_by_driver, get_ride_by_rider, get_ride_by_van,
    assign_driver, delete_ride, get_all_rides, create_ride, edit_ride
)

urlpatterns = [
    path('get-by-driver-id/<int:driver_id>/status/<str:ride_status>/', get_ride_by_driver),
    path('get-by-driver-id/<int:driver_id>/', get_ride_by_driver),
    path('get-by-rider-id/<int:rider_id>/status/<str:ride_status>/', get_ride_by_rider),
    path('get-by-rider-id/<int:rider_id>/', get_ride_by_rider),
    path('get-by-van-id/<int:van_id>/status/<str:ride_status>/', get_ride_by_van),
    path('get-by-van-id/<int:van_id>/', get_ride_by_van),
    path('assign-driver/<int:ride_id>/', assign_driver),
    path('delete/<int:ride_id>/', delete_ride),
    path('create/<int:ride_id>', create_ride),
    path('edit/<int:ride_id>', edit_ride),
    path('get-all/', get_all_rides),
]
