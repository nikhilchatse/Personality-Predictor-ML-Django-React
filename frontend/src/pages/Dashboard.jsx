import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PersonalityChart from '../components/PersonalityChart';
import { clusterDescriptions } from '../components/clusterDescriptions';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Dashboard.css';

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

    // NEW: Function to generate and download the PDF
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
        <div className="dashboard-container">
            <h2>My Personality History</h2>
            {history.length === 0 ? (
                <p>You haven't taken any tests yet.</p>
            ) : (
                <div className="history-list">
                    {history.map((result) => (
                        // Added an ID here so html2canvas knows exactly what to capture
                        <div key={result.id} id={`result-card-${result.id}`} className="history-card" style={{ padding: '20px', background: '#fff' }}>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3>{result.personality_type}</h3>
                                {/* NEW: The Download Button */}
                                <button 
                                    onClick={() => downloadPDF(result.id)} 
                                    className="download-btn"
                                >
                                    Download PDF
                                </button>
                            </div>
                            
                            <p className="date">Date: {new Date(result.test_date).toLocaleDateString()}</p>
                            
                            <p className="insight-text" style={{ fontStyle: 'italic', color: '#555', marginBottom: '20px' }}>
                                "{clusterDescriptions[result.personality_type] || "A unique personality blend based on the OCEAN model."}"
                            </p>
                            
                            <div className="chart-container" style={{ maxWidth: '300px', margin: '0 auto' }}>
                                <PersonalityChart scores={result} />
                            </div>

                            <div className="scores">
                                <span>O: {result.openness.toFixed(1)}</span>
                                <span>C: {result.conscientiousness.toFixed(1)}</span>
                                <span>E: {result.extraversion.toFixed(1)}</span>
                                <span>A: {result.agreeableness.toFixed(1)}</span>
                                <span>N: {result.neuroticism.toFixed(1)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;