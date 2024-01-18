from django.db import models

# Create your models here.
# Teacher model
class Teacher(models.Model):
    name=models.CharField(max_length=100)
    email=models.CharField(max_length=100)
    address=models.TextField(max_length=100)
    phone=models.CharField(max_length=100)
    password=models.CharField(max_length=100)
    qualifications=models.CharField(max_length=100)

# Student model
class Student(models.Model):
    name=models.CharField(max_length=100)
    email=models.CharField(max_length=100)
    address=models.TextField(max_length=100)
    phone=models.CharField(max_length=100)
    password=models.CharField(max_length=100)
    qualifications=models.CharField(max_length=100)
    interests=models.TextField()

# Course category model
class CourseCategory(models.Model):
    title=models.CharField(max_length=100)
    description=models.TextField()

    class Meta:
        verbose_name_plural="Course Categories"

# Course model
class Course(models.Model):
    category=models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
    teacher=models.ForeignKey(Teacher, on_delete=models.CASCADE)
    title=models.CharField(max_length=100)
    description=models.TextField()