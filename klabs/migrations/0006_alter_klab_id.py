# Generated by Django 3.2.13 on 2022-07-09 23:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('klabs', '0005_alter_klab_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='klab',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
