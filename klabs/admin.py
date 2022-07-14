from django.contrib import admin
from .models import klab, participant, joinRequest, inviteRequest

class KlabAdmin(admin.ModelAdmin):
    list_display = ('userId','date','time','place','description','maxSpaces', 'remainingSpaces')

class ParticipantAdmin(admin.ModelAdmin):
    list_display = ('klab','userId')

class JoinRequestAdmin(admin.ModelAdmin):
    list_display = ('klab','hostId','userId')

class InviteRequestAdmin(admin.ModelAdmin):
    list_display = ('klab','klabHostID','receiverID')


admin.site.register(klab, KlabAdmin)
admin.site.register(participant, ParticipantAdmin)
admin.site.register(joinRequest, JoinRequestAdmin)
admin.site.register(inviteRequest, InviteRequestAdmin)
