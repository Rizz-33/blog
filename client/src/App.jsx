import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FooterSec from "./components/Footer";
import Header from "./components/Header";
import PrivateUser from "./components/PrivateUser";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateUser />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <FooterSec />
    </BrowserRouter>
  );
}
