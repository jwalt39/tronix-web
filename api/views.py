from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions, status

from .models import CharacterModel
from .serializers import UserSerializer, GroupSerializer, CharacterSerializer
from django.shortcuts import render


def index(request):
    return render(request, 'frontend/index.html')


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class CharacterViewSet(viewsets.ModelViewSet):
    queryset = CharacterModel.objects.all()
    serializer_class = CharacterSerializer

