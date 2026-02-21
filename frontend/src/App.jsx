import React from 'react';
import {  Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PersonalityTest from './pages/PersonalityTest';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';


function App() {
  return (
    <>
  
      
    <Navbar />
        
       
         
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/test" element={<PersonalityTest />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
        
      
   
    </>
  );
}

export default App;
