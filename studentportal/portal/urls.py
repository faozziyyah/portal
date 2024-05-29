from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'courses-categories', CourseCategoryViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'lessons', LessonViewSet)
router.register(r'enrollments', EnrollmentViewSet)
router.register(r'assignments', AssignmentViewSet)
router.register(r'submissions', SubmissionViewSet)
router.register(r'register', RegisterViewSet)

urlpatterns = [
    #path('enrolled-courses/', UserEnrolledCoursesView.as_view(), name='user-enrolled-courses'),
    path('user-assignments/', UserAssignmentsView.as_view(), name='user-assignments'),
    path('assignment/<int:pk>/', AssignmentDetailView.as_view(), name='assignment-detail'),
    path('', include(router.urls)),
    #path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
]