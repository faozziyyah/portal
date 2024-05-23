from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class ProfileSerializer(serializers.ModelSerializer):
    #user = UserSerializer()
    class Meta:
        model = Profile
        fields = ['user_type', 'bio']
        #fields = ['user', 'user_type', 'bio']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    user_type = serializers.ChoiceField(choices=Profile.USER_TYPES, write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name', 'user_type')

    def create(self, validated_data):
        user_type = validated_data.pop('user_type')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        # Ensure profile creation only if it doesn't already exist
        if not Profile.objects.filter(user=user).exists():
            Profile.objects.create(user=user, user_type=user_type)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid credentials")

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):
        try:
            token = RefreshToken(self.token)
            token.blacklist()
        except TokenError:
            self.fail('bad_token')

class CourseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = '__all__'

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']

class CourseSerializer(serializers.ModelSerializer):
    #category = CourseCategorySerializer()
    category = serializers.PrimaryKeyRelatedField(queryset=CourseCategory.objects.all())
    instructor = InstructorSerializer(read_only=True)
   # instructor = UserSerializer()
    class Meta:
        model = Course
        fields = ['id', 'title', 'category', 'description', 'instructor']

    def create(self, validated_data):
        category = validated_data.pop('category')
        #instructor = validated_data.pop('instructor')
        instructor = self.context['request'].user

        # Fetch or create the category
        #category, created = CourseCategory.objects.get_or_create(**category_data)

        # Fetch the instructor
        #instructor = User.objects.get(id=instructor['id'])

        # Create the course
        course = Course.objects.create(category=category, instructor=instructor, **validated_data)
        return course

    def update(self, instance, validated_data):
        category_data = validated_data.pop('category')
        instructor_data = validated_data.pop('instructor')

        # Update or create the category
        category, created = CourseCategory.objects.get_or_create(**category_data)

        # Fetch the instructor
        instructor = User.objects.get(id=instructor_data['id'])

        # Update the course instance
        instance.category = category
        instance.instructor = instructor
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.save()
        return instance

class LessonSerializer(serializers.ModelSerializer):
    course = CourseSerializer()

    class Meta:
        model = Lesson
        fields = ['id', 'title', 'content', 'course', 'order']

class EnrollmentSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)
    #user = UserSerializer(read_only=True)
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())

    class Meta:
        model = Enrollment
        fields = ['id', 'user', 'course', 'enrolled_on']

    def create(self, validated_data):
        # Extract user_id and remove it from validated_data
        user = validated_data.pop('user')
        course = validated_data.pop('course')
        #user = User.objects.get(id=user_id)
        #validated_data['user'] = user

        # Create the enrollment
        enrollment = Enrollment.objects.create(user=user, course=course, **validated_data)
        return enrollment

class AssignmentSerializer(serializers.ModelSerializer):
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())
    #course = CourseSerializer()

    class Meta:
        model = Assignment
        fields = ['id', 'title', 'description', 'course', 'due_date']

    def create(self, validated_data):
        course = validated_data.pop('course')

        # Create the course
        assignment = Assignment.objects.create(course=course, **validated_data)
        return assignment

    def update(self, instance, validated_data):
        course_data = validated_data.pop('course')

        # Update or create the category
        course, created = Course.objects.get_or_create(**course_data)

        # Update the course instance
        instance.course = course
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.save()
        return instance

class SubmissionSerializer(serializers.ModelSerializer):
    assignment = AssignmentSerializer()
    student = UserSerializer()

    class Meta:
        model = Submission
        fields = ['id', 'assignment', 'student', 'file', 'submitted_on', 'grade']