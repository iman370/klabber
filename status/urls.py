from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('api/post-status/', views.post_status, name="post_status"),
    path('api/get-statuses/', views.get_statuses, name="get_statuses"),
]