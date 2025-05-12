import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import "./Hero.css";
const Hero = () => {
    return (_jsx("section", { className: "hero", children: _jsxs("div", { className: "hero-content", children: [_jsx("div", { className: "hero-icon", children: _jsxs("svg", { viewBox: "0 0 24 24", children: [_jsx("path", { fill: "currentColor", d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10\r\n                 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8\r\n                 8-8 8 3.59 8 8-3.59 8-8 8z" }), _jsx("path", { fill: "currentColor", d: "M12 6l-4 4h3v4h2v-4h3z" })] }) }), _jsxs("h1", { children: ["Track your activities", _jsx("br", {}), "and goals"] }), _jsx(Link, { to: "/login", children: _jsx("button", { className: "btn-lg", children: "Get Started" }) })] }) }));
};
export default Hero;
