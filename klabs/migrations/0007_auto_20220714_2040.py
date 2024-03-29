# Generated by Django 3.2.14 on 2022-07-14 19:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('klabs', '0006_alter_klab_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='inviterequest',
            name='senderID',
        ),
        migrations.AddField(
            model_name='inviterequest',
            name='receiverID',
            field=models.ForeignKey(default=4, on_delete=django.db.models.deletion.CASCADE, related_name='receiverID', to='auth.user'),
            preserve_default=False,
        ),
    ]
