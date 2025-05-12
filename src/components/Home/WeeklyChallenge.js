import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import React from "react";
import { Link } from "react-router-dom";
export const WeeklyChallenge = () => {
    return (_jsxs("div", { className: "challenge-card card", children: [_jsx("div", { className: "card-header", children: _jsx("h2", { className: "card-title text-2xl", children: "Weekly Challenge \uD83C\uDFC6" }) }), _jsxs("div", { className: "card-content", children: [_jsx("p", { className: "mb-4", children: "Complete 5 workouts this week and earn 500 bonus points!" }), _jsxs("div", { className: "mb-4", children: [_jsx("div", { className: "progress-container", children: _jsx("div", { className: "progress-bar", style: { width: "40%" } }) }), _jsx("p", { className: "text-sm mt-2", children: "2 of 5 workouts completed" })] }), _jsx(Link, { to: '/challenges', className: "btn btn-secondary btn-full", children: "Join Our Challenges" })] })] }));
};
