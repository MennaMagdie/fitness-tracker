import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const WorkoutCard = ({ title, duration, difficulty, description, imageUrl }) => {
    return (_jsxs("div", { className: "workout-card", children: [_jsx("div", { className: "workout-image-container", children: _jsx("img", { src: imageUrl, alt: title, className: "workout-image" }) }), _jsxs("div", { className: "card-header", children: [_jsx("h3", { className: "card-title", children: title }), _jsxs("p", { className: "card-description", children: [duration, " \u2022 ", difficulty] })] }), _jsxs("div", { className: "card-content", children: [_jsx("p", { className: "text-sm text-gray-600 mb-4", children: description }), _jsx("button", { className: "btn btn-primary btn-full", children: "Start Workout" })] })] }));
};
