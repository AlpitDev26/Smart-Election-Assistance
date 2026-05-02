from django.urls import path
from . import views

urlpatterns = [
    path('states', views.get_states),
    path('parties/state/<str:state_name>', views.get_parties_by_state),
    path('events', views.get_events),
    path('chat', views.chat),
]
