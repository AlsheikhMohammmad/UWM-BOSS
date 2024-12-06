from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError("The Username field must be set")
        user = self.model(username=username, **extra_fields)
        user.set_password(password)  # Hashes the password
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(username, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    USER_TYPES = (
        ('S', 'Supervisor'),
        ('D', 'Driver'),
        ('R', 'Rider'),
        ('A', 'Admin'),
    )

    DRIVER_STATUS = (
        ('available', 'Available'),
        ('assigned', 'Assigned'),
    )

    username = models.CharField(max_length=25, unique=True, blank=False)
    name = models.CharField(max_length=75, blank=False)
    phone_number = models.CharField(max_length=11, blank=True)
    address = models.TextField(blank=True)
    email = models.EmailField(unique=True, blank=False)
    user_type = models.CharField(max_length=1, choices=USER_TYPES, blank=True, default='R')
    status = models.CharField(max_length=10, choices=DRIVER_STATUS, default='available', null=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'username'  # The field used to log in
    REQUIRED_FIELDS = ['email', 'name']  # Fields required when creating a user via the createsuperuser command

    def __str__(self):
        return self.username


class Van(models.Model):
    van_number = models.CharField(max_length=15)
    ADA = models.BooleanField(default=False)
    driver = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"Van {self.van_number} - ADA: {self.ADA}"



class Ride(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),        # Ride requested but not yet confirmed
        ('assigned', 'Assigned'),      # Driver assigned to the ride
        ('in_progress', 'In Progress'),  # Ride is currently happening
        ('completed', 'Completed'),     # Ride has been completed
        ('cancelled', 'Cancelled'),     # Ride was cancelled
    ]
    rider = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'user_type': 'R'}, related_name='rider')
    driver = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'user_type': 'D'}, null=True,
                               blank=True, related_name='driver')
    driverName = models.CharField(max_length=50,null=True,blank=True)
    riderName = models.CharField(max_length=50, null=True, blank=True)
    van = models.ForeignKey(Van, on_delete=models.CASCADE, null=True, blank=True)
    pickup_location = models.CharField(max_length=200)
    dropoff_location = models.CharField(max_length=200)
    num_passengers = models.IntegerField(default=1)
    ADA_required = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    pickup_time = models.DateTimeField(null=True, blank=True)
    reason = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return f"{self.rider.username} - {self.status}"


class Message(models.Model):
    rider = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'user_type': 'R'},
                              related_name='messages_as_rider')
    driver = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'user_type': 'D'},
                               related_name='messages_as_driver')
    text = models.TextField()


class Report(models.Model):
    REPORT_CATEGORIES = [
        ('safety', 'Safety Issue'),
        ('service', 'Service Issue'),
        ('delay', 'Delay'),
        ('vehicle', 'Vehicle Condition'),
        ('other', 'Other'),
    ]
    # Reporter can be either a Rider or a Driver
    reporter = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='reports')
    report_ride = models.ForeignKey(Ride, null=True, blank=True, on_delete=models.CASCADE)
    report_type = models.CharField(max_length=20, choices=REPORT_CATEGORIES)
    context = models.TextField()

    def __str__(self):
        return f"Report by {self.reporter.name} - {self.get_report_type_display()}"


class Notification(models.Model):
    rider = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'user_type': 'R'})
    text = models.TextField()
