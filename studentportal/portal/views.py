from rest_framework.response import Response
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework import status, generics
from django.core.exceptions import ObjectDoesNotExist
from .permissions import IsTeacher, IsStudent # Import your custom permission
from .models import *
from .serializers import *
from django.http import JsonResponse
#from django.middleware.csrf import get_token
#from django.views.decorators.csrf import ensure_csrf_cookie

# Create your views here.

class RegisterViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        profile = Profile.objects.get(user=user)
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'username': user.username,
            'user_type': profile.user_type  
        }, status=status.HTTP_201_CREATED)

class LoginView(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        refresh = RefreshToken.for_user(user)
        profile = Profile.objects.get(user=user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'username': user.username,
            'id': user.id,
            'user_type': profile.user_type ,
        }, status=status.HTTP_200_OK)

class LogoutView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = LogoutSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

class CourseCategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CourseCategorySerializer
    queryset = CourseCategory.objects.all()
    permission_classes = [permissions.IsAuthenticated]

class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        if user.profile.user_type == 'teacher':
            serializer.save(instructor=user)
        else:
            raise serializers.ValidationError("Only teachers can create courses.")

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated, IsTeacher])
    def created_by_teacher(self, request):
        user = request.user
        if user.profile.user_type == 'teacher':  # Assuming you have a profile model with a user_type field
            courses = Course.objects.filter(instructor=user)
            serializer = self.get_serializer(courses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'You are not authorized to view this information.'}, status=status.HTTP_403_FORBIDDEN)
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({'message': 'Course deleted successfully.'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated, IsStudent])
    def enrolled(self, request):
        user = request.user
        enrollments = Enrollment.objects.filter(user=user)
        course_ids = enrollments.values_list('course_id', flat=True)
        courses = Course.objects.filter(id__in=course_ids)
        serializer = self.get_serializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['delete'], permission_classes=[permissions.IsAuthenticated, IsStudent])
    def unenroll(self, request, pk=None):
        user = request.user
        course = self.get_object()

        try:
            enrollment = Enrollment.objects.get(user=user, course=course)
            enrollment.delete()
            return Response({'message': 'Successfully unenrolled from the course.'}, status=status.HTTP_200_OK)
        except Enrollment.DoesNotExist:
            return Response({'error': 'Enrollment not found.'}, status=status.HTTP_404_NOT_FOUND)

class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [permissions.IsAuthenticated]

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def unenroll(self, request, pk=None):
        try:
            enrollment = self.get_object()
            if enrollment.user != request.user:
                return Response({"detail": "Not allowed."}, status=status.HTTP_403_FORBIDDEN)
            enrollment.delete()
            return Response({"detail": "Successfully unenrolled."}, status=status.HTTP_204_NO_CONTENT)
        except Enrollment.DoesNotExist:
            return Response({"detail": "Enrollment not found."}, status=status.HTTP_404_NOT_FOUND)

class AssignmentViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserAssignmentsView(generics.ListAPIView):
    serializer_class = AssignmentSerializer
    permission_classes = [IsAuthenticated, IsStudent]

    def get_queryset(self):
        user = self.request.user
        enrollments = Enrollment.objects.filter(user=user)
        course_ids = enrollments.values_list('course_id', flat=True)
        return Assignment.objects.filter(course_id__in=course_ids)

class AssignmentDetailView(generics.RetrieveAPIView):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    permission_classes = [IsAuthenticated]

class SubmissionViewSet(viewsets.ModelViewSet):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Pass the currently authenticated user to the serializer for submission creation
        serializer.save()

    #def perform_create(self, serializer):
    #    # Check if the user is enrolled in the course
    #    user = self.request.user
    #    assignment = serializer.validated_data['assignment']
    #    course = assignment.course
#
    #    enrollment = Enrollment.objects.filter(user=user, course=course).first()
    #    if not enrollment:
    #        raise serializers.ValidationError("User is not enrolled in the course.")
#
    #    # Save the submission with the user context
    #    serializer.save(student=user, assignment=assignment)
