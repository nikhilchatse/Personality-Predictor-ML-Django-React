import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PersonalityChart from '../components/PersonalityChart';
import { clusterDescriptions } from '../components/clusterDescriptions';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Dashboard = () => {
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('http://127.0.0.1:8000/api/history/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setHistory(response.data);
            } catch (error) {
                console.error("Error fetching history:", error);
            }
        };

        fetchHistory();
    }, [navigate]);

    const downloadPDF = (resultId) => {
        const input = document.getElementById(`result-card-${resultId}`);

        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
            pdf.save(`Personality_Report_${resultId}.pdf`);
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 min-h-[calc(100vh-64px)] bg-gray-50">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">My Personality History</h2>

            {history.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
                    <p className="text-gray-500 text-lg">You haven't taken any tests yet.</p>
                    <button
                        onClick={() => navigate('/test')}
                        className="mt-4 text-indigo-600 font-semibold hover:text-indigo-500 transition-colors"
                    >
                        Take your first test →
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {history.map((result) => (
                        <div key={result.id} id={`result-card-${result.id}`} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 transition-all hover:shadow-xl">

                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-indigo-900">{result.personality_type}</h3>
                                    <span className="text-sm text-gray-400 font-medium tracking-wide uppercase">
                                        {new Date(result.test_date).toLocaleDateString(undefined, { dateStyle: 'long' })}
                                    </span>
                                </div>
                                <button
                                    onClick={() => downloadPDF(result.id)}
                                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md shadow-blue-200 hover:-translate-y-0.5"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download Report
                                </button>
                            </div>

                            <div className="relative pl-4 border-l-4 border-indigo-100 mb-8">
                                <p className="italic text-gray-600 text-lg leading-relaxed">
                                    "{clusterDescriptions[result.personality_type] || "A unique personality blend based on the OCEAN model."}"
                                </p>
                            </div>

                            <div className="max-w-xs mx-auto my-10 bg-gray-50 p-6 rounded-2xl border border-gray-50">
                                <PersonalityChart scores={result} />
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 bg-indigo-50/50 p-4 rounded-xl text-sm font-bold text-indigo-900 mt-6 border border-indigo-50">
                                <div className="text-center p-2 rounded-lg bg-white shadow-sm">O: {result.openness.toFixed(1)}</div>
                                <div className="text-center p-2 rounded-lg bg-white shadow-sm">C: {result.conscientiousness.toFixed(1)}</div>
                                <div className="text-center p-2 rounded-lg bg-white shadow-sm">E: {result.extraversion.toFixed(1)}</div>
                                <div className="text-center p-2 rounded-lg bg-white shadow-sm">A: {result.agreeableness.toFixed(1)}</div>
                                <div className="text-center p-2 rounded-lg bg-white shadow-sm">N: {result.neuroticism.toFixed(1)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
