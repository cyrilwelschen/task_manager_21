# Generated by Django 3.1.5 on 2021-02-10 06:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0004_auto_20210122_2248'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='deadline',
            field=models.DateField(null=True, verbose_name='deadline'),
        ),
    ]
