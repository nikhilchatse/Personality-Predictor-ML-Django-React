from django.urls import path
from .views import predict_personality,register_user,user_history,all_users_history
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('predict/', predict_personality, name='predict_personality'),
    path('history/', user_history, name='user_history'),
    path('admin-history/', all_users_history, name='all_users_history'),
    path('register/', register_user, name='register_user'), 
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]