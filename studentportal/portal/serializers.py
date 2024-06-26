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
    class Meta:
        model = Profile
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'bio', 'profile_pic', 
                'cover_image','phone_number', 'gender', 'location', 'updated_at', 'user_type',
        ]
        read_only_fields = ['user', 'updated_at', 'user_type', 'username', 'email',]

    def update(self, instance, validated_data):
        #user_data = validated_data.pop('user', None)
        user = instance.user
        # Handle profile picture update
        profile_pic = validated_data.pop('profile_pic', None)
        if profile_pic:
            instance.profile_pic = profile_pic
        
        ## Update other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
#
        instance.save()
#
        #user.username = user_data.get('username', user.username)
        #user.email = user_data.get('email', user.email)
        #user.first_name = user_data.get('first_name', user.first_name)
        #user.last_name = user_data.get('last_name', user.last_name)
        #user.save()
        #instance.bio = validated_data.get('bio', instance.bio)
        #instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        #instance.gender = validated_data.get('gender', instance.gender)
        #instance.location = validated_data.get('location', instance.location)
        #instance.profile_pic = validated_data.get('profile_pic', instance.profile_pic)
        #instance.cover_image = validated_data.get('cover_image', instance.cover_image)
        #instance.save()
#
        #if user_data:
        #    user.username = user_data.get('username', user.username)
        #    user.email = user_data.get('email', user.email)
        #    user.first_name = user_data.get('first_name', user.first_name)
        #    user.last_name = user_data.get('last_name', user.last_name)
        #    user.save()

        return instance

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
    is_enrolled = serializers.SerializerMethodField()
    enrolled_students_count = serializers.SerializerMethodField()
   # instructor = UserSerializer()
    class Meta:
        model = Course
        fields = ['id', 'title', 'category', 'description', 'instructor', 'is_enrolled', 'enrolled_students_count']

    def get_enrolled_students_count(self, obj):
        return Enrollment.objects.filter(course=obj).count()

    def get_is_enrolled(self, obj):
        user = self.context['request'].user
        return Enrollment.objects.filter(user=user, course=obj).exists()

    def create(self, validated_data):
        validated_data['instructor'] = self.context['request'].user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        category = validated_data.pop('category', None)

        if category:
            instance.category = category

        # Update the course instance
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
    #user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)
    #user = UserSerializer(read_only=True)
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())

    class Meta:
        model = Enrollment
        fields = ['id', 'course', 'enrolled_on']

   #def create(self, validated_data):
   #    # Extract user_id and remove it from validated_data
   #    #user = validated_data.pop('user')
   #    user = self.context['request'].user
   #    course = validated_data.pop('course')
   #    #user = User.objects.get(id=user_id)
   #    #validated_data['user'] = user

   #    # Create the enrollment
   #    enrollment = Enrollment.objects.create(user=user, course=course, **validated_data)
   #    return enrollment

class AssignmentSerializer(serializers.ModelSerializer):
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())
    #course = CourseSerializer()

    class Meta:
        model = Assignment
        fields = ['id', 'title', 'description', 'course', 'due_date']

    #def create(self, validated_data):
    #    course = validated_data.pop('course')
#
    #    # Create the course
    #    assignment = Assignment.objects.create(course=course, **validated_data)
    #    return assignment
#
    #def update(self, instance, validated_data):
    #    course_data = validated_data.pop('course')
#
    #    # Update or create the category
    #    course, created = Course.objects.get_or_create(**course_data)
#
    #    # Update the course instance
    #    instance.course = course
    #    instance.title = validated_data.get('title', instance.title)
    #    instance.description = validated_data.get('description', instance.description)
    #    instance.save()
    #    return instance

class SubmissionSerializer(serializers.ModelSerializer):
    #assignment = AssignmentSerializer()
    assignment = serializers.PrimaryKeyRelatedField(queryset=Assignment.objects.all(), write_only=True)
    #student = UserSerializer()

    class Meta:
        model = Submission
        fields = ['id', 'assignment', 'file', 'submitted_on', 'grade']

    def create(self, validated_data):
        # Automatically set the student to the currently authenticated user
        validated_data['student'] = self.context['request'].user
        submission = Submission.objects.create(**validated_data)
        return submission