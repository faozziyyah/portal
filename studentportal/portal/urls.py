from django.urls import path, include
#from portal import views
#from . import views
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'teachers', TeacherViewSet)
router.register('students', StudentViewSet)
router.register('courses', CourseViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]