from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('create-klab/',TemplateView.as_view(template_name='index.html')),
    path('api/post-klab/', views.post_klab, name="post_klab"),
]   