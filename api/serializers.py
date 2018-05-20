from rest_framework import serializers

from core.models import Depot, Item, Pledge, Need, UserProfile


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class PledgeSerializer(serializers.ModelSerializer):
    need_set = serializers.PrimaryKeyRelatedField(source='need', read_only=True)
    userprofile_set = serializers.PrimaryKeyRelatedField(source='userprofile', read_only=True)

    def create(self, validated_data):
        return Pledge.objects.create(**validated_data)

    class Meta:
        model = Pledge
        fields = '__all__'


class NeedSerializer(serializers.ModelSerializer):
    pledges = PledgeSerializer(read_only=True, many=True)

    class Meta:
        model = Need
        fields = '__all__'


class DepotSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=200)
    item_set = serializers.RelatedField(source='item', read_only=True)
    need_set = NeedSerializer(many=True, read_only=True)

    class Meta:
        model = Depot
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'



