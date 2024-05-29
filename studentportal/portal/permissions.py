from rest_framework import permissions

class IsTeacher(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.profile.user_type == 'teacher'

    def has_object_permission(self, request, view, obj):
        return obj.course.instructor == request.user
        #return request.user.profile.user_type == 'teacher'

class IsStudent(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.profile.user_type == 'student'