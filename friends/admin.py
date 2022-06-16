from django.contrib import admin
from .models import Friend
from .models import FriendRequest

class FriendAdmin(admin.ModelAdmin):
    list_display = ('id1','id2')

class FriendRequestAdmin(admin.ModelAdmin):
    list_display = ('senderId','receiverId',)


admin.site.register(Friend, FriendAdmin)
admin.site.register(FriendRequest, FriendRequestAdmin)