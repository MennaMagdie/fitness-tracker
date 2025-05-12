import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import Navbar from "../components/Navbar";
import "../components/Registration/registration.css";
const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // will send data to API here
    };
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsx("div", { className: "signup", children: _jsxs("div", { className: "signup-container", children: [_jsx("h2", { className: "text-center", children: "Ready for today's workout?" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "email", children: "Email" }), _jsx("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleChange, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "password", children: "Password" }), _jsx("input", { type: "password", id: "password", name: "password", value: formData.password, onChange: handleChange, required: true })] }), _jsx("button", { type: "submit", className: "btn btn-light w-100", children: "Sign In" })] })] }) })] }));
};
export default Login;
