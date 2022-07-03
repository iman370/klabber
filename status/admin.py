from django.contrib import admin
from .models import Status

class StatusAdmin(admin.ModelAdmin):
    list_display = ('userId','text')

admin.site.register(Status, StatusAdmin)