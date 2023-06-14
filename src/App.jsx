import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Login />} exact path="/" />
        <Route element={<Dashboard />} exact path="/dashboard" />
      </Routes>
    </Router>
  );
}

export default App;
