import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Registro";
import Login from "./components/Login";
import Welcome from "./components/Bienvenido";
import Dashboard from "./components/Dashboard";
import AuthRedirect from "./components/AuthRedirect";
import Challenges from "./components/Challenges";

function App() {
  return (
    <Router basename="/Reactjs_Rutinas_ejerciciosV2">
      <Routes>
        <Route
          path="/"
          element={
            <AuthRedirect>
              <Welcome />
            </AuthRedirect>
          }
        />
        
        <Route
          path="/login"
          element={
            <AuthRedirect redirectTo="/dashboard">
              <Login />
            </AuthRedirect>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRedirect redirectTo="/dashboard">
              <Register />
            </AuthRedirect>
          }
        />

        <Route
          path="/dashboard"
          element={
            <AuthRedirect>
              <Dashboard />
            </AuthRedirect>
          }
        />
        
        <Route
          path="/challenges"
          element={
            <AuthRedirect>
              <Challenges />
            </AuthRedirect>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
