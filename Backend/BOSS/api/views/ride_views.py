from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..functions import RideManagement
from ..models import Ride
from ..serializer import RideSerializer


@api_view(['GET'])
def get_all_rides(request):
    rides = RideManagement().get_all()
    serializer = RideSerializer(rides, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_ride_by_id(request, ride_id, ride_status):
    try:
        ride = RideManagement().get_by_id(ride_id, 'ride', ride_status)
    except Ride.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = RideSerializer(ride)
    return Response(serializer.data)


@api_view(['GET'])
def get_ride_by_driver(request, driver_id, ride_status=None):
    try:
        ride = RideManagement().get_by_id(driver_id, 'driver', ride_status)
    except Ride.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = RideSerializer(ride)
    return Response(serializer.data)


@api_view(['GET'])
def get_ride_by_rider(request, rider_id, ride_status=None):
    ride = RideManagement().get_by_id(rider_id, 'rider', ride_status)
    serializer = RideSerializer(ride)
    return Response(serializer.data)


@api_view(['GET'])
def get_ride_by_van(request, van_id, ride_status=None):
    ride = RideManagement().get_by_id(van_id, 'van', ride_status)
    serializer = RideSerializer(ride)
    return Response(serializer.data)


@api_view(['POST'])
def assign_driver(request, ride_id):
    result = RideManagement().assign_driver_task(ride_id)
    if result:
        return Response({"message": "Driver assigned successfully."}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Error assigning driver."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_ride(request, ride_id):
    result = RideManagement().delete(ride_id)
    if result:
        return Response({"message": "Ride deleted successfully."}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Ride not found."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['CREATE'])
def create_ride(request, rider, ride_info):
    result = RideManagement().create(rider, ride_info)
    if result:
        return Response({"message": "Ride created successfully."}, status=status.HTTP_201_CREATED)
    else:
        return Response({"error": "Error creating ride."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['EDIT'])
def edit_ride(request, ride_id, updated_info):
    result = RideManagement().edit(ride_id, updated_info)
    if result:
        return Response({"message": "Ride updated successfully."}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Error updating ride."}, status=status.HTTP_400_BAD_REQUEST)
