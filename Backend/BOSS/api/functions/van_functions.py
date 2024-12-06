from api.models import Van
from django.core.exceptions import ObjectDoesNotExist


class VanManagement:
    """
    create - creates a new van and adds to database

    Preconditions: info is a dictionary containing valid van info
    Postconditions: van is successfully added to database
    Side Effects: none
    In: info - dictionary containing van info
    Out: boolean indicating success
    """

    def create(self, info: dict) -> bool:
        if not bool(info):
            return False

        required_fields = ['van_number', 'ADA']
        if not all(field in info for field in required_fields):
            return False

        # check for duplicate
        if Van.objects.filter(van_number=info['van_number']).exists():
            return False

        # create a new van with driver defaulting to None
        van = Van(
            van_number=info['van_number'],
            ADA=info['ADA'],
            driver=info.get('driver', None),
        )
        van.save()
        return True

    """
    edit - updates van info in database

    Preconditions: the van exists in database
    Postconditions: van info is updated successfully
    Side Effects: none
    In: van_number - the van's unique number 
        info - dictionary containing updated van details
    Out: boolean indicating success
    """

    def edit(self, van_id: str, info: dict) -> bool:
        try:
            van = Van.objects.get(id=van_id)
        except ObjectDoesNotExist:
            return False

        if 'van_number' in info:
            van_number = info['van_number']
            if not van_number or Van.objects.filter(van_number=van_number).exclude(id=van_id).exists():
                return False

        for field in info:
            setattr(van, field, info[field])

        van.save()
        return True

    """
    delete - deletes a van from the database

    Preconditions: the van exists in the database
    Postconditions: van is removed from the database
    Side Effects: none
    In: van_number - the unique number of van to delete
    Out: boolean indicating success
    """

    def delete(self, van_id: int) -> bool:
        try:
            van = Van.objects.get(id=van_id)
        except ObjectDoesNotExist:
            return False

        van.delete()
        return True

    """
    get - retrieves a van by its unique identifier

    Preconditions: van exists in the database
    Postconditions: returns the van details if found
    Side Effects: none
    In: van_number - unique number of the van
    Out: dictionary with van details or None
    """

    def get(self, van_number: int) -> dict:
        try:
            van = Van.objects.get(van_number=van_number)
        except ObjectDoesNotExist:
            return None

        return {
            'van_number': van.van_number,
            'ADA': van.ADA,
            'driver': van.driver,  # can be None
        }

    """
    get_all - retrieves all vans from database

    Preconditions: none
    Postconditions: returns a list of all vans in the database
    Side Effects: none
    In: none
    Out: list of dictionaries containing van details
    """

    def get_all(self) -> list:
        vans = Van.objects.all()
        return [
            {
                'van_number': van.van_number,
                'ADA': van.ADA,
                'driver': van.driver,  # can be none
            }
            for van in vans
        ]

    def get_by_id(self, _id: int) -> Van:
        return Van.objects.get(id=_id)

    def get_by_driver_id(self, username) -> Van:
        return Van.objects.get(driver=username)
