from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('friends/',TemplateView.as_view(template_name='index.html')),
    path('api/friend/', views.checkFriend, name="checkFriend"),
    path('api/get-all-friends/', views.get_all_friends, name="get_all_friends"),
]