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
    path('api/get-klabs-im-attending', views.klabs_im_attending, name="klabs_im_attending"),
    path('klab-invites/',TemplateView.as_view(template_name='index.html')),
    path('api/get-join-requests', views.get_join_requests, name="get_join_requests"),
    path('api/get-invite-requests', views.get_invite_requests, name="get_invite_requests"),
    path('api/accept-invite/', views.accept_invite, name="accept_invite"),
    path('api/reject-invite/', views.reject_invite, name="reject_invite"),
    path('api/accept-join-req/', views.accept_join_req, name="accept_join_req"),
    path('api/reject-join-req/', views.reject_join_req, name="reject_join_req"),
]