import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Navbar } from "../components/Home/Navbar";
import { Footer } from "../components/Home/Footer";
import { ProgressChart } from "../components/Dashboard/ProgressChart";
import { NutritionTracker } from "../components/Dashboard/NutritionTracker";
import { Reminders } from "../components/Dashboard/Reminders";
import { ChevronRight } from "lucide-react";
const Dashboard = () => {
    const [animatedElements, setAnimatedElements] = useState(null);
    useEffect(() => {
        // Find all elements with the fade-in class
        const elements = document.querySelectorAll('.fade-in');
        setAnimatedElements(elements);
        // Observe elements and add animated class when they become visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1
        });
        elements.forEach(el => observer.observe(el));
        return () => {
            if (animatedElements) {
                Array.from(animatedElements).forEach(el => observer.unobserve(el));
            }
        };
    }, []);
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Navbar, {}), _jsxs("main", { className: "dashboard-container", children: [_jsxs("div", { className: "dashboard-header fade-in", children: [_jsx("h1", { className: "dashboard-title", children: "Your Fitness Dashboard" }), _jsx("p", { className: "dashboard-subtitle", children: "Track your progress, nutrition, and stay on top of your fitness goals" }), _jsxs("div", { className: "breadcrumb", children: [_jsx("a", { href: "/Home", className: "breadcrumb-link", children: "Home" }), _jsx(ChevronRight, { className: "breadcrumb-separator" }), _jsx("span", { className: "breadcrumb-current", children: "Dashboard" })] })] }), _jsxs("div", { className: "dashboard-grid", children: [_jsxs("section", { className: "dashboard-card progress-section fade-in", children: [_jsx("h2", { className: "section-title", children: "Progress Overview" }), _jsx("div", { className: "chart-container", children: _jsx(ProgressChart, {}) })] }), _jsxs("section", { className: "dashboard-card nutrition-section fade-in", children: [_jsx("h2", { className: "section-title", children: "Nutrition Tracker" }), _jsx(NutritionTracker, {})] }), _jsxs("section", { className: "dashboard-card reminders-section fade-in", children: [_jsx("h2", { className: "section-title", children: "Reminders" }), _jsx(Reminders, {})] })] })] }), _jsx(Footer, {})] }));
};
export default Dashboard;
