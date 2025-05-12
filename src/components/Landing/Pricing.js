import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./Pricing.css";
const plans = [
    {
        name: "Premium",
        price: 30,
        features: [
            "Track your progress daily",
            "Fitness resources",
            "Connect with fitness community",
        ],
        buttonText: "Track Now",
        variant: "secondary",
    },
    {
        name: "Track",
        price: 29,
        features: [
            "Personalized workout plans",
            "Healthy recipe ideas",
            "Join fitness challenges",
        ],
        buttonText: "Get Premium",
        featured: true,
    },
    {
        name: "Premium",
        price: 49,
        features: [
            "Tailored fitness guidance",
            "Exclusive workout playlists",
            "Access to expert trainers",
        ],
        buttonText: "Start Free",
        variant: "secondary",
    },
];
const Pricing = () => {
    return (_jsx("section", { className: "pricing", children: _jsxs("div", { className: "container", children: [_jsx("h2", { className: "text-center h2 fw-bold mb-5", children: "Choose Your Plan" }), _jsx("div", { className: "row justify-content-center", children: plans.map((plan, index) => (_jsx("div", { className: "col-md-4 mb-4", children: _jsxs("div", { className: `pricing-card ${plan.featured ? "featured" : ""}`, children: [_jsx("h3", { className: "h4 fw-semibold mb-2", children: plan.name }), _jsxs("div", { className: "h2 fw-bold mb-4", children: [plan.price, "EGP", _jsx("span", { className: "h5 fw-normal", children: "/month" })] }), _jsx("ul", { className: "list-unstyled mb-4", children: plan.features.map((feature, i) => (_jsxs("li", { className: "d-flex align-items-center mb-2", children: [_jsx("span", { className: "me-2", children: "\u2192 " }), feature] }, i))) }), _jsx("button", { className: `btn w-100 ${plan.featured ? "btn-light text-primary" : "btn-outline"}`, children: plan.buttonText })] }) }, index))) })] }) }));
};
export default Pricing;
