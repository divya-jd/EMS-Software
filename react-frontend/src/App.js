import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';
import CarbonDashboardComponent from './components/CarbonDashboardComponent';
import LoginComponent from './components/LoginComponent';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-primary-500/30">
        <HeaderComponent />
        <main className="flex-grow">
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<LoginComponent />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Navigate to="/carbon-dashboard" replace />} />
              <Route path="/employees" element={<ListEmployeeComponent />} />
              <Route path="/view-employee/:id" element={<ViewEmployeeComponent />} />
              <Route path="/carbon-dashboard" element={<CarbonDashboardComponent />} />
            </Route>

            {/* Admin Only Routes */}
            <Route element={<ProtectedRoute role="ROLE_ADMIN" />}>
              <Route path="/add-employee/:id" element={<CreateEmployeeComponent />} />
            </Route>

          </Routes>
        </main>
        <FooterComponent />
      </div>
    </Router>
  );
}

export default App;
