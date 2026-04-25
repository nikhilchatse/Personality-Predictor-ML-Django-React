import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        <div className="max-w-6xl mx-auto p-6 md:p-10 mt-8 mb-12">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-8 border-b pb-4">Master Records: All Students</h2>

            {error ? (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 font-semibold shadow-sm animate-in fade-in duration-300">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </div>
                </div>
            ) : (
                <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-4 bg-gray-50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Student Username</th>
                                    <th className="px-6 py-4 bg-gray-50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 bg-gray-50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Personality Type</th>
                                    <th className="px-6 py-4 bg-gray-50 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">O</th>
                                    <th className="px-6 py-4 bg-gray-50 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">C</th>
                                    <th className="px-6 py-4 bg-gray-50 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">E</th>
                                    <th className="px-6 py-4 bg-gray-50 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">A</th>
                                    <th className="px-6 py-4 bg-gray-50 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">N</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {allResults.map((result) => (
                                    <tr key={result.id} className="hover:bg-blue-50 transition-colors duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="font-bold text-gray-900 border-b-2 border-transparent hover:border-indigo-500 transition-all">
                                                {result.username || 'Anonymous'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                                            {new Date(result.test_date).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full text-xs font-extrabold shadow-sm tracking-wide uppercase">
                                                {result.personality_type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-slate-700 bg-slate-50/30">{result.openness.toFixed(1)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-slate-700">{result.conscientiousness.toFixed(1)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-slate-700 bg-slate-50/30">{result.extraversion.toFixed(1)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-slate-700">{result.agreeableness.toFixed(1)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-slate-700 bg-slate-50/30">{result.neuroticism.toFixed(1)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {allResults.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-400 font-medium">No student records found yet.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
