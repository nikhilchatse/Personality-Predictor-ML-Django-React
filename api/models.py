from django.db import models
from django.contrib.auth.models import User

class UserResponse(models.Model):
    # Link this result to a specific user (Student)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    
    # We store the scores for the 5 OCEAN traits
    openness = models.FloatField()
    conscientiousness = models.FloatField()
    extraversion = models.FloatField()
    agreeableness = models.FloatField()
    neuroticism = models.FloatField()
    
    # The final prediction (e.g., "Cluster 1" or "Serious & Responsible")
    personality_type = models.CharField(max_length=50)
    
    # When did they take the test?
    test_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.personality_type} - {self.test_date}"