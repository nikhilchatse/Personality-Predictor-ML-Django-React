import React, { useState } from 'react';
import axios from 'axios';
import { questions } from '../questions';
import './PersonalityTest.css'; // We will create this next for styling
import { useNavigate } from 'react-router-dom';

// const navigate = useNavigate();

const PersonalityTest = () => {
    // We create an array of 50 zeros to store answers. 
    // (We use 10 for now since we only have 10 questions in the file)
    const [answers, setAnswers] = useState(Array(50).fill(null)); 
    const [result, setResult] = useState(null);

    const scaleOptions = [
        { value: 1, label: "Strongly Disagree" },
        { value: 2, label: "Disagree" },
        { value: 3, label: "Neutral" },
        { value: 4, label: "Agree" },
        { value: 5, label: "Strongly Agree" }
    ];

    const handleOptionChange = (questionIndex, value) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = parseInt(value);
        setAnswers(newAnswers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (answers.includes(null)) {
            const unansweredCount = answers.filter(a => a === null).length;
            alert(`Please answer all questions! You missed ${unansweredCount} question(s).`);
            return;
        }
        const token = localStorage.getItem('access_token');
            if (!token) {
                    alert("You must be logged in to save your results!");
                    // navigate('/login'); // Make sure you import { useNavigate } at the top
                return;
            }
        try {
           
            const token = localStorage.getItem('access_token');

            // 2. Send the request with the token in the header
            const response = await axios.post('http://127.0.0.1:8000/api/predict/', 
                        { answers: answers }, 
                    {
                        headers: {
                             'Authorization': `Bearer ${token}` // This is the key part!
                        }
                    }
                );
            
            setResult(response.data);
            console.log("Prediction:", response.data);
            
        } catch (error) {
            console.error("Error submitting test:", error);
            alert("Something went wrong! Check the console.");
        }
    };

    return (
        <div className="test-container">
            <h1>Personality Predictor</h1>
            
            {result ? (
                <div className="result-box">
                    <h2>You are: {result.personality_type}</h2>
                    <p>Openness: {result.scores.opn}</p>
                    <p>Conscientiousness: {result.scores.csn}</p>
                    <p>Extraversion: {result.scores.ext}</p>
                    <p>Agreeableness: {result.scores.agr}</p>
                    <p>Neuroticism: {result.scores.est}</p>
                    <button onClick={() => setResult(null)}>Retake Test</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {questions.map((q, index) => (
                        <div key={q.id} className="question-card">
                            <p>{index + 1}. {q.text}</p>
                            <div className="options">
                                {scaleOptions.map((val) => (
                                    <label key={val.value}>
                                        <input 
                                            type="radio" 
                                            name={`q-${q.id}`} 
                                            value={val.value}
                                            checked={answers[index] === val.value}
                                            onChange={(e) => handleOptionChange(index,val.value)}
                                        />
                                        {val.label}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button type="submit" className="submit-btn">Analyze My Personality</button>
                </form>
            )}
        </div>
    );
};

export default PersonalityTest;