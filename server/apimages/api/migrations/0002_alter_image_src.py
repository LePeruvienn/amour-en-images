# Generated by Django 5.1.2 on 2024-11-23 23:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='src',
            field=models.ImageField(default='default.png', upload_to='./'),
        ),
    ]