from django.db import models

class State(models.Model):
    state_name = models.CharField(max_length=100, unique=True)
    capital = models.CharField(max_length=100)
    election_hq = models.CharField(max_length=100)
    lok_sabha_seats = models.IntegerField()
    vidhan_sabha_seats = models.IntegerField()
    rajya_sabha_seats = models.IntegerField()
    current_cm = models.CharField(max_length=100)
    current_deputy_cm = models.CharField(max_length=100)

    def __str__(self):
        return self.state_name

class Party(models.Model):
    name = models.CharField(max_length=100, unique=True)
    leader = models.CharField(max_length=100)
    symbol = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

class StatePartyMapping(models.Model):
    state = models.ForeignKey(State, on_delete=models.CASCADE, related_name='party_mappings')
    party = models.ForeignKey(Party, on_delete=models.CASCADE)
    influence_level = models.CharField(max_length=100) # e.g. "Ruling", "Opposition"

class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    event_type = models.CharField(max_length=50) # e.g. "Live", "Urgent"
    date = models.DateField(auto_now_add=True)

class Faq(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    keywords = models.TextField() # Comma separated keywords
