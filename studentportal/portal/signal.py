from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from portal.models import Profile

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        if instance.is_superuser:
            instance.profile.user_type = 'admin'
            instance.save()
        else:
            instance.profile.user_type = 'student'  # Default to student
            instance.save()

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
