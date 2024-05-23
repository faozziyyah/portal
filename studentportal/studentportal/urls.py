"""
URL configuration for studentportal project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
#from portal.views import CustomRegisterView, CustomLoginView, get_csrf_token
from .swagger import schema_view
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('portal.urls')),
    #path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    #path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    #path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),# DRF's login/logout
    #path('dj-rest-auth/', include('dj_rest_auth.urls')),  # Login/Logout
    #path('dj-rest-auth/login/', CustomLoginView.as_view(), name='rest_login'),
    #path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),  # Registration
    #path('dj-rest-auth/registration/custom/', CustomRegisterView.as_view(), name='custom_register'),
    #path('api/get-csrf-token/', get_csrf_token, name='get_csrf_token'),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

]
