// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import AuthPage from './AuthPage';  // The new AuthPage for sign-up
import FinishSignIn from './FinishSignIn'; // brings the user back to sign in after magic link is sent
import MainAppPage from './MainAppPage';
import GalleryPage from './pages/gallery'; // Gallery page that lists all vision boards
import Header from './components/header'; // Header component
import PrivateRoute from './components/PrivateRoute';  // Import PrivateRoute
import { AuthProvider } from './contexts/AuthContext';  // AuthProvider for global auth

import './index.css';  // Ensure the CSS file is included
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />         {/* Home Page is public */}
          <Route path="/auth" element={<AuthPage />} />     {/* Sign In/Register is public */}
          <Route path="/finalize-signin" element={<FinishSignIn />} />  {/* Magic Link finalization is public */}

          {/* Private Routes - Only accessible if authenticated */}
          <Route
            path="/app"
            element={
              <PrivateRoute>
                <MainAppPage />   {/* Protected App Page */}
              </PrivateRoute>
            }
          />
          <Route
            path="/gallery"
            element={
              <PrivateRoute>
                <GalleryPage />   {/* Protected Gallery Page */}
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;