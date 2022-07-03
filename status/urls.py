from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('api/post-status/', views.post_status, name="post_status"),
]