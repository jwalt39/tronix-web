from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views


urlpatterns = [
    path('api/', include('api.urls')),
    path('', include('frontend.urls')),
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),  # override sjwt stock token
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]