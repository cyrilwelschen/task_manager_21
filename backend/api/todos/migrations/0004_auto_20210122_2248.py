# Generated by Django 3.1.5 on 2021-01-22 21:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0003_auto_20210113_1836'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='deadline',
            field=models.DateField(verbose_name='deadline'),
        ),
    ]
