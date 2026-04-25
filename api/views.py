from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from .models import UserResponse
from .serializers import UserResponseSerializer, UserSerializer
import joblib
import numpy as np
import os

# 1. Load the Model (The Brain)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ML_FOLDER = os.path.join(BASE_DIR, 'ml_brain')

try:
    teen_model = joblib.load(os.path.join(ML_FOLDER, 'teen_model.pkl'))
    youth_model = joblib.load(os.path.join(ML_FOLDER, 'youth_model.pkl'))
    adult_model = joblib.load(os.path.join(ML_FOLDER, 'adult_model.pkl'))
    print("All 3 Age-Specific Models loaded successfully!")

except Exception as e:
    print(f"Error loading models: {e}")
    teen_model, youth_model, adult_model = None, None, None

@api_view(['POST'])
def predict_personality(request):
    """
    Takes 50 answers (1-5 scale), calculates dominant trait, predicts cluster, and saves result.
    """
    # if model is None:
    #     return Response({'error': 'Model not found'}, status=500)

    data = request.data
    answers = data.get('answers') 
    
    # NEW: Get the age group from the React frontend (default to 'youth' if missing)
    age_group = data.get('age_group', 'youth')

    if not answers or len(answers) != 50 or None in answers:
        return Response({'error': 'Please provide exactly 50 valid answers.'}, status=400)

    active_model = None
    if age_group == 'teen':
        active_model = teen_model
    elif age_group == 'adult':
        active_model = adult_model
    else:
        active_model = youth_model

    if active_model is None:
        return Response({'error': f'{age_group} Model not found on server'}, status=500)
    
    # 1. Run the ML Prediction 
    # (We keep this so the Machine Learning aspect of your project remains intact)
    prediction = active_model.predict([answers])[0]

    # 2. Calculate Exact OCEAN Scores
    ext_score = sum(answers[0:10]) / 10
    est_score = sum(answers[10:20]) / 10 # Neuroticism
    agr_score = sum(answers[20:30]) / 10
    csn_score = sum(answers[30:40]) / 10
    opn_score = sum(answers[40:50]) / 10

    # 3. Find the Dominant Trait Mathematically
    # This maps the traits directly to the descriptions on your React frontend
    scores_dict = {
        "Extroverted / Social": ext_score,
        "Emotional / Sensitive": est_score,
        "Dependable / Structured": agr_score, 
        "Serious / Responsible": csn_score,
        "Open / Creative": opn_score
    }
    
    # Mathematically find which trait has the highest average score
    dominant_trait = max(scores_dict, key=scores_dict.get)

    # 4. Save to Database
    user_response = UserResponse.objects.create(
        user=request.user if request.user.is_authenticated else None,
        extraversion=ext_score,
        neuroticism=est_score,
        agreeableness=agr_score,
        conscientiousness=csn_score,
        openness=opn_score,
        personality_type=dominant_trait  # Save the dynamically calculated trait
    )

    # 5. Return Result to Frontend
    return Response({
        'personality_type': dominant_trait,
        'ml_cluster': int(prediction), # Keep the cluster ID in the background just in case
        'scores': {
            'ext': ext_score,
            'est': est_score,
            'agr': agr_score,
            'csn': csn_score,
            'opn': opn_score
        }
    })

@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Only logged-in users can call this
def user_history(request):
    # Filter results where the user is the one making the request
    results = UserResponse.objects.filter(user=request.user).order_by('-test_date')
    serializer = UserResponseSerializer(results, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def all_users_history(request):
    
    results = UserResponse.objects.all().order_by('-test_date')
    serializer = UserResponseSerializer(results, many=True)
    return Response(serializer.data)