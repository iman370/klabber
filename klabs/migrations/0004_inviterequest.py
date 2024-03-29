# Generated by Django 3.2.13 on 2022-07-09 23:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('klabs', '0003_klab_remainingspaces'),
    ]

    operations = [
        migrations.CreateModel(
            name='inviteRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('klab', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='klabs.klab')),
                ('klabHostID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='klabHostID', to=settings.AUTH_USER_MODEL)),
                ('senderID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='senderID', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
