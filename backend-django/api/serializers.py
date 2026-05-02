from rest_framework import serializers
from .models import State, Party, StatePartyMapping, Event

class StateSerializer(serializers.ModelSerializer):
    # Map Django snake_case to React camelCase expectations
    stateName = serializers.CharField(source='state_name')
    electionHq = serializers.CharField(source='election_hq')
    lokSabhaSeats = serializers.IntegerField(source='lok_sabha_seats')
    vidhanSabhaSeats = serializers.IntegerField(source='vidhan_sabha_seats')
    rajyaSabhaSeats = serializers.IntegerField(source='rajya_sabha_seats')
    currentCm = serializers.CharField(source='current_cm')
    currentDeputyCm = serializers.CharField(source='current_deputy_cm')

    class Meta:
        model = State
        fields = ['id', 'stateName', 'capital', 'electionHq', 'lokSabhaSeats', 'vidhanSabhaSeats', 'rajyaSabhaSeats', 'currentCm', 'currentDeputyCm']

class PartySerializer(serializers.ModelSerializer):
    class Meta:
        model = Party
        fields = ['id', 'name', 'leader', 'symbol', 'description']

class EventSerializer(serializers.ModelSerializer):
    eventType = serializers.CharField(source='event_type')

    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'eventType', 'date']
