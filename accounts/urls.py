from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('',TemplateView.as_view(template_name='index.html')),
    path('sign-in/',TemplateView.as_view(template_name='index.html')),
    path('api/signup/',views.sign_up,name="signup"),
    path('sign-in/',TemplateView.as_view(template_name='index.html')),
    path('api/login/', views.login, name="login"),

]