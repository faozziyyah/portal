from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *

# Create your views here.

class TeacherViewSet(viewsets.ModelViewSet):
    serializer_class = TeacherSerializer
    queryset = Teacher.objects.all()
    def get_permissions(self):
        permission_classes = []
        if self.request.method != 'GET':
            permission_classes = [IsAuthenticated]

        return [permission() for permission in permission_classes]

class StudentViewSet(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()

class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()

#get all users
#@api_view(['GET'])
#def getUsers(request):
#    users = User.objects.all()
#    serializer = UserSerializer(users, many=True)
#    return Response(serializer.data)
#
##get single user
#@api_view(['GET'])
#def getUser(request, pk):
#    user = User.objects.get(id=pk)
#    serializer = UserSerializer(user, many=False)
#    return Response(serializer.data)
#
##add user
#@api_view(['POST'])
#def addUser(request):
#    serializer = UserSerializer(data=request.data)
#    
#    if serializer.is_valid():
#        serializer.save()
#    
#    return Response(serializer.data)
#
##update user
#@api_view(['PUT'])
#def updateUser(request, pk):
#    user = User.objects.get(id=pk)
#    serializer = UserSerializer(instance=user, data=request.data)
#    
#    if serializer.is_valid():
#        serializer.save()
#    
#    return Response(serializer.data)
#
##delete user
#@api_view(['DELETE'])
#def deleteUser(request, pk):
#    user = User.objects.get(id=pk)
#    user.delete()
#    
#    return Response('Item successfully deleted!')