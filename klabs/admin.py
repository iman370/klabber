from django.contrib import admin
from .models import klab, participants

class KlabAdmin(admin.ModelAdmin):
    list_display = ('userId','date','time','place','description','maxSpaces')

class ParticipantsAdmin(admin.ModelAdmin):
    list_display = ('klab','userId')

admin.site.register(klab, KlabAdmin)
admin.site.register(participants, ParticipantsAdmin)
