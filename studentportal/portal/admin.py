from django.contrib import admin
from .models import Profile, Course, Lesson, Enrollment, Assignment, Submission, CourseCategory

# Register your models here.
#admin.site.register(models.Teacher)
#admin.site.register(models.Student)
#admin.site.register(models.CourseCategory)
#admin.site.register(models.Course)

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'user_type', 'bio']

@admin.register(CourseCategory)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['title', 'description']
    search_fields = ['title']

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['title', 'instructor']
    search_fields = ['title', 'instructor__username']

@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ['title', 'course', 'order']
    list_filter = ['course']
    ordering = ['course', 'order']

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ['user', 'course', 'enrolled_on']
    list_filter = ['course', 'enrolled_on']

@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):
    list_display = ['title', 'course', 'due_date']
    list_filter = ['course', 'due_date']

@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ['assignment', 'student', 'submitted_on', 'grade']
    list_filter = ['assignment', 'submitted_on', 'grade']
    search_fields = ['student__username', 'assignment__title']