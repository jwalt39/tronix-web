from django.contrib.auth.models import User, Group
from rest_framework import serializers

from api.models import CharacterModel


class UserSerializer(serializers.HyperlinkedModelSerializer):
    email = serializers.EmailField(
        required=False
    )
    username = serializers.CharField()
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)  # as long as the fields are the same, we can just use this
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


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

