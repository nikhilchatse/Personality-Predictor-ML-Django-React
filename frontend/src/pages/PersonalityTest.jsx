import React, { useState } from 'react';
import axios from 'axios';
// Dhyan de: Yahan apne file path ke hisab se import set kar lena (jaise '../components/questions' ya '../questions')
import { getQuestionsByAge } from '../questions'; 
import { useNavigate } from 'react-router-dom';

const PersonalityTest = () => {
    // NEW: Track the selected age group and active questions
    const [ageGroup, setAgeGroup] = useState(null);
    const [activeQuestions, setActiveQuestions] = useState([]);
    
    const [answers, setAnswers] = useState(Array(50).fill(null));
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const navigate = useNavigate();

    const scaleOptions = [ 
        { value: 1, label: "Strongly Disagree" },
        { value: 2, label: "Disagree" },
        { value: 3, label: "Neutral" },
        { value: 4, label: "Agree" },
        { value: 5, label: "Strongly Agree" }
    ];

    // NEW: Handle Age Selection
    const handleAgeSelection = (selectedAge) => {
        setAgeGroup(selectedAge);
        setActiveQuestions(getQuestionsByAge(selectedAge));
    };

    const handleOptionChange = (value) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = parseInt(value);
        setAnswers(newAnswers);
    };

    const nextQuestion = () => {
        if (currentQuestion < 49) setCurrentQuestion(currentQuestion + 1);
    };

    const prevQuestion = () => {
        if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (answers.includes(null)) {
            const unansweredCount = answers.filter(a => a === null).length;
            alert(`Please answer all questions! You missed ${unansweredCount} question(s). Check the side panel to see which ones are gray.`);
            return;
        }

        const token = localStorage.getItem('access_token');
        if (!token) {
            alert("You must be logged in to save your results!");
            navigate('/login');
            return;
        }

        try {
            await axios.post('http://127.0.0.1:8000/api/predict/',
                // NEW: Send the selected age_group to Django backend
                { answers: answers, age_group: ageGroup },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            navigate('/dashboard');

        } catch (error) {
            console.error("Error submitting test:", error);
            alert("Something went wrong! Check the console.");
        }
    };

    // ==========================================
    // UI 1: AGE SELECTION SCREEN
    // ==========================================
    if (!ageGroup) {
        return (
            <div className="bg-gray-50 min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
                <div className="max-w-4xl w-full p-8 md:p-12 bg-white rounded-3xl shadow-xl text-center border border-gray-100">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Select Your Age Group</h2>
                    <p className="text-gray-500 mb-10 text-lg">Our AI model adapts the psychological assessment based on your life stage for maximum accuracy.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <button onClick={() => handleAgeSelection('teen')} className="p-8 border-2 border-indigo-50 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300 group shadow-sm hover:shadow-md">
                            <span className="text-5xl block mb-4 group-hover:scale-110 transition-transform duration-300">🎒</span>
                            <h3 className="text-xl font-bold text-gray-800">Teenager</h3>
                            <p className="text-gray-500 mt-2 font-medium">Ages 13 - 19</p>
                        </button>
                        
                        <button onClick={() => handleAgeSelection('youth')} className="p-8 border-2 border-emerald-50 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300 group shadow-sm hover:shadow-md">
                            <span className="text-5xl block mb-4 group-hover:scale-110 transition-transform duration-300">🎓</span>
                            <h3 className="text-xl font-bold text-gray-800">Young Adult</h3>
                            <p className="text-gray-500 mt-2 font-medium">Ages 20 - 35</p>
                        </button>
                        
                        <button onClick={() => handleAgeSelection('adult')} className="p-8 border-2 border-slate-100 rounded-2xl hover:border-slate-500 hover:bg-slate-50 transition-all duration-300 group shadow-sm hover:shadow-md">
                            <span className="text-5xl block mb-4 group-hover:scale-110 transition-transform duration-300">💼</span>
                            <h3 className="text-xl font-bold text-gray-800">Adult</h3>
                            <p className="text-gray-500 mt-2 font-medium">Ages 36+</p>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ==========================================
    // UI 2: THE CBT EXAM SCREEN (Teri original styling ke sath)
    // ==========================================
    const q = activeQuestions[currentQuestion];

    return (
        <div className="bg-gray-50 min-h-[calc(100vh-64px)]">
            <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto p-4 md:p-8">

                {/* LEFT SIDE: The Active Question */}
                <div className="md:w-2/3 bg-white p-6 md:p-10 rounded-2xl shadow-lg border border-gray-100">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">Personality Assessment</h2>

                    <div className="min-h-[320px]">
                        <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">Question {currentQuestion + 1} of 50</p>
                        <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 leading-tight">{q?.text}</p>

                        <div className="flex flex-col gap-4">
                            {scaleOptions.map((opt) => (
                                <label
                                    key={opt.value}
                                    className={`flex items-center p-4 md:p-5 border-2 rounded-2xl cursor-pointer transition-all duration-200 group ${answers[currentQuestion] === opt.value
                                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md ring-1 ring-indigo-600/10'
                                            : 'border-gray-100 bg-gray-50 hover:border-indigo-300 hover:bg-white hover:shadow-sm'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 transition-all cursor-pointer"
                                        name={`q-${q?.id}`}
                                        value={opt.value}
                                        checked={answers[currentQuestion] === opt.value}
                                        onChange={(e) => handleOptionChange(e.target.value)}
                                    />
                                    <span className="ml-4 text-lg font-semibold">{opt.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
                        <button
                            onClick={prevQuestion}
                            disabled={currentQuestion === 0}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-8 py-3.5 rounded-xl font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                            Back
                        </button>

                        {currentQuestion === 49 ? (
                            <button
                                onClick={handleSubmit}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-3.5 rounded-xl font-extrabold text-lg transition-all shadow-xl shadow-emerald-200 transform hover:-translate-y-0.5 active:scale-95"
                            >
                                Submit Test
                            </button>
                        ) : (
                            <button
                                onClick={nextQuestion}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3.5 rounded-xl font-bold transition-all shadow-xl shadow-indigo-200 flex items-center transform hover:-translate-y-0.5 active:scale-95"
                            >
                                Next
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* RIGHT SIDE: The Question Palette */}
                <div className="md:w-1/3 bg-white p-6 md:p-8 rounded-2xl shadow-lg md:sticky md:top-8 h-fit border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Question Palette</h3>
                    
                    {/* NEW: Displaying selected age group just above the palette for context */}
                    <div className="mb-6 pb-4 border-b border-gray-100 flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-500">Age Group:</span>
                        <span className="text-xs font-bold bg-indigo-100 text-indigo-700 py-1 px-3 rounded-full uppercase tracking-wider">
                            {ageGroup}
                        </span>
                    </div>

                    <div className="grid grid-cols-5 gap-3">
                        {/* UPDATE: Using activeQuestions.map instead of questions.map */}
                        {activeQuestions.map((_, index) => {
                            const isCurrent = currentQuestion === index;
                            const isAnswered = answers[index] !== null;

                            return (
                                <div
                                    key={index}
                                    onClick={() => setCurrentQuestion(index)}
                                    className={`aspect-square flex items-center justify-center rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all duration-200 border-2 ${isCurrent
                                            ? 'border-indigo-600 bg-white text-indigo-900 scale-115 shadow-xl ring-4 ring-indigo-50 z-10'
                                            : isAnswered
                                                ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm shadow-emerald-100 hover:bg-emerald-600'
                                                : 'bg-slate-50 border-slate-100 hover:border-slate-300 text-slate-500'
                                        }`}
                                >
                                    {index + 1}
                                </div>
                            );
                        })}
                    </div>

                    {/* Legend */}
                    <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
                        <div className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                            <div className="w-4 h-4 rounded bg-emerald-500 mr-3"></div>
                            Answered
                        </div>
                        <div className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                            <div className="w-4 h-4 rounded bg-slate-100 border border-slate-200 mr-3"></div>
                            Unanswered
                        </div>
                        <div className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                            <div className="w-4 h-4 rounded border-2 border-indigo-600 bg-white mr-3"></div>
                            Current
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PersonalityTest;