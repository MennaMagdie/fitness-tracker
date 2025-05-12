import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import Navbar from "../components/Navbar";
import "../components/Registration/registration.css";
const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        gender: "",
        fitnessGoal: "",
        currentWeight: "",
        targetWeight: "",
        location: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSelectChange = (e) => {
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
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsx("div", { className: "signup", children: _jsxs("div", { className: "signup-container", children: [_jsx("h2", { className: "text-center", children: "Become a NeuroFitter" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "fullName", children: "Full Name" }), _jsx("input", { type: "text", id: "fullName", name: "fullName", value: formData.fullName, onChange: handleChange, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "email", children: "Email" }), _jsx("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleChange, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "password", children: "Password" }), _jsx("input", { type: "password", id: "password", name: "password", value: formData.password, onChange: handleChange, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "confirmPassword", children: "Confirm Password" }), _jsx("input", { type: "password", id: "confirmPassword", name: "confirmPassword", value: formData.confirmPassword, onChange: handleChange, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "age", children: "Age" }), _jsx("input", { type: "number", id: "age", name: "age", value: formData.age, onChange: handleChange, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "gender", children: "Gender" }), _jsxs("select", { id: "gender", name: "gender", value: formData.gender, onChange: handleSelectChange, required: true, children: [_jsx("option", { value: "", children: "Select Gender" }), _jsx("option", { value: "male", children: "Male" }), _jsx("option", { value: "female", children: "Female" }), _jsx("option", { value: "other", children: "Other" })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "fitnessGoal", children: "Fitness Goal" }), _jsxs("select", { id: "fitnessGoal", name: "fitnessGoal", value: formData.fitnessGoal, onChange: handleSelectChange, required: true, children: [_jsx("option", { value: "", children: "Select Goal" }), _jsx("option", { value: "loseWeight", children: "Lose Weight" }), _jsx("option", { value: "buildMuscle", children: "Build Muscle" }), _jsx("option", { value: "maintainFitness", children: "Maintain Fitness" })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "currentWeight", children: "Current Weight (kg)" }), _jsx("input", { type: "number", id: "currentWeight", name: "currentWeight", value: formData.currentWeight, onChange: handleChange, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "targetWeight", children: "Target Weight (kg)" }), _jsx("input", { type: "number", id: "targetWeight", name: "targetWeight", value: formData.targetWeight, onChange: handleChange, required: true })] }), _jsx("button", { type: "submit", className: "btn btn-light w-100", children: "Create Account" })] })] }) })] }));
};
export default Signup;
