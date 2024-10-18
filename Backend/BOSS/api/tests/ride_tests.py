from django.test import TestCase
from django.utils import timezone
from api.models import User, Ride, Van
import api.functions as functions


# Testing Ride functions
class RideManagementTests(TestCase):
    def setUp(self):
        self.rider = User(username="test_rider", password="test"
                                                          "_pass", name="Test Rider", phone_number="987654321",
                          address="123 ave WI", email="test_rider@uwm.edu", user_type="R")
        self.rider.save()

        self.driver = User(username="test_driver", password="test_pass", name="Test Driver", phone_number="987654321",
                           address="123 ave WI", email="test_driver@uwm.edu", user_type="D")
        self.driver.save()

        self.van = Van(van_number="1234 QWERTY", driver=self.driver)
        self.van.save()

        self.ride_info = {
            'pickup_location': '123 main ST',
            'dropoff_location': '123 test ST',
            'passengers': 3,
            'ADA_required': True,
            'van': self.van,
            'driver': self.driver,
        }

        self.ride_manage_fun = functions.RideManagement()

    def tearDown(self):
        self.rider.delete()
        self.driver.delete()
        self.van.delete()

    # tests of get ride

    def test_get_ride_by_rider_id(self):
        self.ride_manage_fun.create(rider=self.rider, ride_info=self.ride_info)
        ride = self.ride_manage_fun.get_by_id(self.rider.id, 'rider')
        self.assertEqual(ride.rider.id, self.rider.id)

        self.ride_info['status'] = 'active'
        self.ride_manage_fun.create(self.rider, self.ride_info)
        ride = self.ride_manage_fun.get_by_id(self.rider.id, 'rider', 'active')
        self.assertEqual(ride.rider.id, self.rider.id)
        self.assertEqual(ride.status, 'active')

    def test_get_ride_by_driver_id(self):
        newride = Ride(
            pickup_time=timezone.now(),
            pickup_location='here',
            dropoff_location='there',
            ADA_required=True,
            rider=self.rider,
            driver=self.driver,
        )
        newride.save()
        ride = self.ride_manage_fun.get_by_id(self.driver.id, 'driver')
        self.assertEqual(ride.driver.id, self.driver.id)

        newride.status = 'active'
        newride.save()
        ride = self.ride_manage_fun.get_by_id(self.driver.id, 'driver', 'active')
        self.assertEqual(ride.driver.id, self.driver.id)
        self.assertEqual(ride.status, 'active')

    def test_get_ride_by_van_id(self):
        self.ride_manage_fun.create(rider=self.rider, ride_info=self.ride_info)
        ride = self.ride_manage_fun.get_by_id(self.van.id, 'van')
        self.assertEqual(ride.id, self.van.id)

        self.ride_info['status'] = 'active'
        self.ride_manage_fun.create(self.rider, self.ride_info)
        ride = self.ride_manage_fun.get_by_id(self.van.id, 'van', _status='active')
        self.assertEqual(ride.van.id, self.van.id)
        self.assertEqual(ride.status, 'active')

    # tests of delete ride

    def test_delete_ride(self):
        self.ride_manage_fun.create(rider=self.rider, ride_info=self.ride_info)
        ride = self.ride_manage_fun.get_by_id(self.rider.id, 'rider')
        result = self.ride_manage_fun.delete(ride.id)
        self.assertTrue(result)

    def test_assign_driver(self):
        self.ride_manage_fun.create(rider=self.rider, ride_info=self.ride_info)
        ride = self.ride_manage_fun.get_all()[0]
        result = self.ride_manage_fun.assign_driver(ride.id)
        self.assertTrue(result)

    def test_create_ride_success(self):
        result = self.ride_manage_fun.create(rider=self.rider, ride_info=self.ride_info)
        self.assertTrue(result)

    def test_create_ride_wrong_user(self):
        result = self.ride_manage_fun.create(rider=self.driver, ride_info=self.ride_info)
        self.assertFalse(result)

    def test_create_ride_no_pickup(self):
        test_ride = {
            'pickup_location': '',
            'dropoff_location': '123 test ST',
            'passengers': 3,
            'ADA_required': True,
            'van': self.van,
            'driver': self.driver,
        }
        result = self.ride_manage_fun.create(rider=self.rider, ride_info=test_ride)
        self.assertFalse(result)

    def test_create_ride_no_dropoff(self):
        test_ride = {
            'pickup_location': '123 test ST',
            'dropoff_location': '',
            'passengers': 3,
            'ADA_required': True,
            'van': self.van,
            'driver': self.driver,
        }
        result = self.ride_manage_fun.create(rider=self.rider, ride_info=test_ride)
        self.assertFalse(result)

