import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // We will create this next

const AdminDashboard = () => {
    const [allResults, setAllResults] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllHistory = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('http://127.0.0.1:8000/api/admin-history/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setAllResults(response.data);
            } catch (err) {
                console.error("Admin fetch error:", err);
                setError('Access Denied. You must be an Admin to view this page.');
            }
        };

        fetchAllHistory();
    }, [navigate]);

    return (
        <div className="admin-container">
            <h2>Master Records: All Students</h2>
            
            {error ? (
                <div className="error-box">{error}</div>
            ) : (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Student Username</th>
                            <th>Date</th>
                            <th>Personality Type</th>
                            <th>O</th>
                            <th>C</th>
                            <th>E</th>
                            <th>A</th>
                            <th>N</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allResults.map((result) => (
                            <tr key={result.id}>
                                <td><strong>{result.username || 'Anonymous'}</strong></td>
                                <td>{new Date(result.test_date).toLocaleDateString()}</td>
                                <td><span className="trait-badge">{result.personality_type}</span></td>
                                <td>{result.openness.toFixed(1)}</td>
                                <td>{result.conscientiousness.toFixed(1)}</td>
                                <td>{result.extraversion.toFixed(1)}</td>
                                <td>{result.agreeableness.toFixed(1)}</td>
                                <td>{result.neuroticism.toFixed(1)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminDashboard;