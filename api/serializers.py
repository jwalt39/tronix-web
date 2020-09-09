from django.contrib.auth.models import User, Group
from rest_framework import serializers

from api.models import CharacterModel


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class CharacterSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CharacterModel
        fields = ['user_rec', 'char_name', 'char_class', 'char_race',
                  'str', 'dex', 'con', 'wis', 'int', 'end'
                  ]

