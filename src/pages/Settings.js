import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import React from 'react';
import { Navbar } from '../components/Home/Navbar';
import { Footer } from '../components/Home/Footer';
const Settings = () => {
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Navbar, {}), _jsxs("main", { className: "container px-4 sm:px-6 lg:px-8 py-8", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-4xl font-bold text-gray-900", children: "Settings" }), _jsx("p", { className: "mt-2 text-gray-600", children: "Manage your account preferences" })] }), _jsxs("div", { className: "bg-white shadow rounded-lg p-6", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Account Settings" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium", children: "Profile Information" }), _jsx("p", { className: "text-gray-600", children: "Update your personal details" })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium", children: "Notifications" }), _jsx("p", { className: "text-gray-600", children: "Manage your notification preferences" })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium", children: "Privacy" }), _jsx("p", { className: "text-gray-600", children: "Control your privacy settings" })] })] })] })] }), _jsx(Footer, {})] }));
};
export default Settings;
