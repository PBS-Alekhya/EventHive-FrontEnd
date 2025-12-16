import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/CreateEvent';
import EventPage from './pages/EventPage';
import EventRequests from './pages/EventRequests';




function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<HomePage />} />

          {/* Authentication */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Organizer Protected Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/event/:id/requests" element={<EventRequests />} />
          {/* Public Event Route */}
          <Route path="/event/:id" element={<EventPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;