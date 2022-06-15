from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('',TemplateView.as_view(template_name='index.html')),
    path('sign-up/',TemplateView.as_view(template_name='index.html')),
    path('api/signup/',views.sign_up,name="signup"),
    path('sign-in/',TemplateView.as_view(template_name='index.html')),
    path('api/login/', views.login, name="login"),
    path('settings/',TemplateView.as_view(template_name='index.html')),
    path('api/update-email/', views.update_email, name="update_email"),
    path('api/update-password/', views.update_password, name="update_password"),
    path('api/update-nickname/', views.update_firstName, name="update_firstName"),

]