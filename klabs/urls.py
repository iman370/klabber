from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('create-klab/',TemplateView.as_view(template_name='index.html')),
    path('api/post-klab/', views.post_klab, name="post_klab"),
    path('find-klabs/',TemplateView.as_view(template_name='index.html')),
    path('api/get-all-klabs', views.get_all_klabs, name="get_all_klabs"),
    path('api/join-klab/', views.join_klab, name="join_klab"),
    path('my-klabs/',TemplateView.as_view(template_name='index.html')),
    path('api/get-my-klabs', views.get_my_klabs, name="get_my_klabs"),
    path('klab-invites/',TemplateView.as_view(template_name='index.html')),
]   