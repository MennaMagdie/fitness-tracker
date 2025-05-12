import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./Testimonials.css";
const testimonials = [
    {
        text: "NeuroFit has completely transformed my fitness journey. The workout suggestions are spot on, and the progress tracking feature keeps me motivated every day. I’ve seen incredible results, and it’s all thanks to this app!",
        author: "Menna Magdy",
        role: "Fitness Enthusiast",
    },
    {
        text: "I’ve tried multiple fitness apps, but none of them come close to NeuroFit. The community is amazing, the progress dashboard is super helpful, and the feedback system is easy to use. Highly recommend it!",
        author: "Mathilda Wae",
        role: "User Testimonial",
    },
    {
        text: "As someone who’s always struggled to stay motivated, NeuroFit has been a game-changer. The daily reminders and personalized workout plans have helped me stay on track.",
        author: "Chris Joo",
        role: "User Testimonial",
    },
    {
        text: "I love how NeuroFit makes tracking my fitness goals so easy. The dashboard provides detailed insights, and the support from the team is amazing. It’s an all-in-one solution that really works!",
        author: "Joo Lee",
        role: "Fitness Enthusiast",
    },
];
const Testimonials = () => {
    return (_jsx("section", { className: "testimonials", children: _jsxs("div", { className: "container", children: [_jsx("h2", { className: "testimonial-title", children: "Join NeuroFit Community and stay motivated" }), _jsx("div", { className: "testimonial-cards", children: testimonials.map((testimonial, index) => (_jsxs("div", { className: "testimonial-card", children: [_jsxs("p", { className: "testimonial-text", children: ["\u201C", testimonial.text, "\u201D"] }), _jsxs("div", { className: "testimonial-footer", children: [_jsx("div", { className: "testimonial-avatar" }), _jsxs("div", { children: [_jsx("div", { className: "testimonial-author", children: testimonial.author }), _jsx("div", { className: "testimonial-role", children: testimonial.role })] })] })] }, index))) })] }) }));
};
export default Testimonials;
