import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./Features.css";
const features = [
    {
        title: "Fitness Journey",
        description: "Monitor progress and set personal goals",
        icon: "💪",
    },
    {
        title: "Sleep Quality",
        description: "Achieve rejuvenating sleep cycles",
        icon: "😴",
    },
    {
        title: "Stress Management",
        description: "Find inner peace and reduce stress",
        icon: "🧘‍♀️",
    },
];
const Features = () => {
    return (_jsx("section", { className: "features", children: _jsx("div", { className: "features-container", children: features.map((feature) => (_jsxs("div", { className: "feature-card", children: [_jsx("span", { className: "feature-icon", children: feature.icon }), _jsx("h3", { className: "feature-title", children: feature.title }), _jsx("p", { className: "feature-description", children: feature.description })] }, feature.title))) }) }));
};
export default Features;
