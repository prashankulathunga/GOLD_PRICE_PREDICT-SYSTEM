import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "./components/About.jsx";
import Hero from "./components/Hero.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import Features from "./components/Features.jsx";
import Blog from "./components/Blog.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/signup.jsx";
import SidebarLayout from "./components/application/SidebarLayout.jsx";
import Dashboard from "./components/application/Dashboard.jsx";
import PawnItem from "./components/application/PawnItem.jsx";
import InterestRate from "./components/application/InterestRate.jsx";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Hero />
            <Blog />
            <About />
            {/* <Services /> */}
            <Features />
            <Footer />
          </>
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Routes with Sidebar */}
      <Route path="/" element={<SidebarLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="pawn-item" element={<PawnItem />} />
        <Route path="interest" element={<InterestRate />} />
      </Route>
    </Routes>
    
  );
}

export default App;
