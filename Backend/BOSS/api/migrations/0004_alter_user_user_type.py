# Generated by Django 3.2.25 on 2024-10-03 20:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_user_user_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='user_type',
            field=models.CharField(choices=[('S', 'Supervisor'), ('D', 'Driver'), ('R', 'Rider'), ('A', 'Admin')], max_length=1),
        ),
    ]
