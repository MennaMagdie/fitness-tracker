import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
// import React from "react";
const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (_jsxs("nav", { className: "navbar", children: [_jsx(Link, { to: "/", style: { textDecoration: "none" }, children: _jsx("div", { className: "navbar-logo", children: "NeuroFit" }) }), _jsx("button", { className: "hamburger", onClick: () => setMenuOpen(!menuOpen), children: "\u2630" }), _jsxs("ul", { className: `navbar-links ${menuOpen ? "open" : ""}`, children: [_jsx("li", { children: _jsx(Link, { to: "/home", children: "Home" }) }), _jsx("li", { children: _jsx(Link, { to: "/profile", children: "Profile" }) }), _jsx("li", { children: _jsx(Link, { to: "/dashboard", children: "Dashboard" }) }), _jsx("li", { children: _jsx(Link, { to: "/workouts", children: "Workouts" }) }), _jsx("li", { children: _jsx(Link, { to: "/feedback", children: "Feedback" }) })] }), _jsxs("div", { className: `navbar-buttons ${menuOpen ? "open" : ""}`, children: [_jsx(Link, { to: "/login", children: _jsx("button", { className: "login-btn", children: "Login" }) }), _jsx(Link, { to: "/signup", children: _jsx("button", { className: "signup-btn", children: "Sign Up" }) })] })] }));
};
export default Navbar;
