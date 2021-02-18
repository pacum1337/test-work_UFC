from django.urls import path
from .views import *

urlpatterns = [
    path('password/reset/confirm/<slug:uid>/<slug:token>', )
]

