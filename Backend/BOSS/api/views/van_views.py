from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..functions import VanManagement
from ..models import Van, User
from ..serializer import VanSerializer, UserSerializer


@api_view(['GET'])
def get_all_vans(request):
    """Retrieve all vans."""
    vans = Van.objects.all()  # Fetch objects directly for serialization
    serializer = VanSerializer(vans, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_van_by_number(request, van_number):
    """Retrieve a van by its number."""
    van = VanManagement().get(van_number)
    if not van:
        return Response({"error": "Van not found"}, status=status.HTTP_404_NOT_FOUND)
    # Manual response format since `VanManagement.get()` returns a dictionary
    return Response(van, status=status.HTTP_200_OK)


@api_view(['POST'])
def create_van(request):
    """Create a new van."""
    van_info = request.data
    if 'driver' in van_info and van_info['driver']:
        driver = User.objects.get(username=van_info['driver'])
        van_info['driver'] = driver
    else:
        van_info['driver'] = None
    if VanManagement().create(van_info):
        return Response({"message": "Van created successfully."}, status=status.HTTP_201_CREATED)
    return Response({"error": "Invalid data or van already exists."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def edit_van(request, van_id):
    """Edit van details."""
    updated_info = request.data
    driver = updated_info.get('driver', None)
    if driver:
        driver = User.objects.get(username=driver['username'])
        updated_info['driver'] = driver
    if VanManagement().edit(van_id, updated_info):
        return Response({"message": "Van updated successfully."}, status=status.HTTP_200_OK)
    return Response({"error": "Van not found or invalid data."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_van(request, van_id):
    """Delete a van."""
    if VanManagement().delete(van_id):
        return Response({"message": "Van deleted successfully."}, status=status.HTTP_200_OK)
    return Response({"error": "Van not found."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_van_by_id(request, van_id):
    """Retrieve a van by its database ID."""
    try:
        van = VanManagement().get_by_id(van_id)
        serializer = VanSerializer(van)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Van.DoesNotExist:
        return Response({"error": "Van not found."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_van_by_driver(request, driver_username):
    """Retrieve a van assigned to a specific driver."""
    try:
        van = VanManagement().get_by_driver_id(driver_username)
        serializer = VanSerializer(van)  # Serialize Van object
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Van.DoesNotExist:
        return Response({"error": "No van found for the driver."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_all_drivers(request):
    """Retrieve all users who are drivers."""
    try:
        # Fetch all users with role 'D' (Driver role) that are available
        available_drivers = User.objects.filter(user_type='D').exclude(
            id__in=Van.objects.filter(driver__isnull=False).values('driver'))
        serializer = UserSerializer(available_drivers, many=True)  # Serialize the users as drivers
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
