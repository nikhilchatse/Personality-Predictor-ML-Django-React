import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <header className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-blue-900 to-indigo-900 text-white py-24 md:py-32 px-6">
                {/* Abstract background elements for premium feel */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                    <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500 rounded-full blur-[120px]"></div>
                    <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-cyan-500 rounded-full blur-[100px]"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-[1.1] animate-in slide-in-from-bottom duration-700">
                        Discover Your <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">True Personality</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-indigo-100/90 mb-12 max-w-2xl mx-auto leading-relaxed font-medium animate-in slide-in-from-bottom duration-1000">
                        Powered by Machine Learning and the Big Five (OCEAN) Model.
                        Uncover deep insights into your behavior and strengths.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 items-center animate-in slide-in-from-bottom duration-1000">
                        <Link to="/test">
                            <button className="bg-emerald-500 hover:bg-emerald-400 text-white text-lg font-extrabold py-5 px-12 rounded-full shadow-2xl shadow-emerald-500/30 transform hover:-translate-y-1.5 transition-all duration-300 active:scale-95">
                                Start Free Assessment
                            </button>
                        </Link>
                        <Link to="/login" className="text-indigo-200 hover:text-white font-bold transition-colors">
                            Already have an account? Login here
                        </Link>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-24 px-6 bg-gray-50/50">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Why Take Our Assessment?</h2>
                    <p className="text-slate-500 text-lg mb-16 max-w-2xl mx-auto">Scientific precision meets modern technology to help you grow.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl border border-gray-100 transform hover:-translate-y-3 transition-all duration-500 text-left group">
                            <span className="text-5xl mb-6 block group-hover:scale-110 transition-transform">🤖</span>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">AI-Powered Analysis</h3>
                            <p className="text-slate-600 leading-relaxed font-medium">We use K-Means Clustering algorithms to provide highly accurate, data-driven personality profiles.</p>
                        </div>

                        <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl border border-gray-100 transform hover:-translate-y-3 transition-all duration-500 text-left group">
                            <span className="text-5xl mb-6 block group-hover:scale-110 transition-transform">📊</span>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Visual Insights</h3>
                            <p className="text-slate-600 leading-relaxed font-medium">Understand your traits instantly with dynamic radar charts that map out your unique OCEAN scores.</p>
                        </div>

                        <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl border border-gray-100 transform hover:-translate-y-3 transition-all duration-500 text-left group">
                            <span className="text-5xl mb-6 block group-hover:scale-110 transition-transform">📄</span>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Detailed Reports</h3>
                            <p className="text-slate-600 leading-relaxed font-medium">Generate and download professional PDF reports of your personality profile instantly from your dashboard.</p>
                        </div>

                        <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl border border-gray-100 transform hover:-translate-y-3 transition-all duration-500 text-left group">
                            <span className="text-5xl mb-6 block group-hover:scale-110 transition-transform">🔒</span>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Secure & Private</h3>
                            <p className="text-slate-600 leading-relaxed font-medium">Your data is encrypted and secure. Access your results anytime through our private, portal.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-950 text-slate-500 text-center py-10 px-6 border-t border-slate-900">
                <div className="max-w-4xl mx-auto">
                    <p className="text-sm font-bold tracking-widest uppercase mb-4 text-slate-400">OCEAN Predictor ML</p>
                    <p className="text-xs">Designed and Developed by the B.Tech CSE Final Year Team</p>
                    <div className="mt-8 pt-8 border-t border-slate-900/50 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-[10px] uppercase tracking-tighter">© 2026 Personalization Dynamics Corp. All Rights Reserved.</p>
                        <div className="flex gap-6 text-[10px] uppercase font-bold text-indigo-400/50">
                            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
