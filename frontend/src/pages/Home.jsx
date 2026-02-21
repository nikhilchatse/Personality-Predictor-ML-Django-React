import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // We will create this next

const Home = () => {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <header className="hero-section">
                <div className="hero-content">
                    <h1>Discover Your True Personality</h1>
                    <p>
                        Powered by Machine Learning and the Big Five (OCEAN) Model. 
                        Take our scientific assessment to uncover deep insights into your behavior, 
                        strengths, and communication style.
                    </p>
                    <Link to="/test">
                        <button className="cta-button">Start Free Assessment</button>
                    </Link>
                </div>
            </header>

            {/* Features Section */}
            <section className="features-section">
                <h2>Why Take Our Assessment?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>🤖 AI-Powered Analysis</h3>
                        <p>We use K-Means Clustering algorithms to group your responses and provide highly accurate, data-driven personality profiles.</p>
                    </div>
                    <div className="feature-card">
                        <h3>📊 Visual Insights</h3>
                        <p>Understand your traits instantly with dynamic radar charts that map out your Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.</p>
                    </div>
                    <div className="feature-card">
                        <h3>📄 Downloadable Reports</h3>
                        <p>Generate and download professional PDF reports of your personality profile instantly from your private user dashboard.</p>
                    </div>
                    <div className="feature-card">
                        <h3>🔒 Secure & Private</h3>
                        <p>Your data is encrypted and securely stored. Only you have access to your historical results through our JWT-authenticated portal.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="home-footer">
                <p>Designed and Developed by the B.Tech CSE Final Year Team</p>
            </footer>
        </div>
    );
};

export default Home;