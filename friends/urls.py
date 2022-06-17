from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('friends/',TemplateView.as_view(template_name='index.html')),
    path('api/get-all-users/', views.get_all_users, name="get_all_users"),
]