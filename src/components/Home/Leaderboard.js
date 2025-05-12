import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import React from "react";
import { User } from "lucide-react";
const topUsers = [
    { name: "Joo Fahmy", points: 2500, rank: 1 },
    { name: "Youssef Salah", points: 2350, rank: 2 },
    { name: "Ali Ahmed", points: 2200, rank: 3 },
];
export const Leaderboard = () => {
    return (_jsxs("div", { className: "card", children: [_jsx("div", { className: "card-header", children: _jsx("h2", { className: "card-title", children: "Top Performers" }) }), _jsx("div", { className: "card-content", children: _jsx("div", { className: "space-y-4", children: topUsers.map((user) => (_jsxs("div", { className: "leaderboard-item flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: `rank-badge ${user.rank === 1 ? 'rank-1' :
                                            user.rank === 2 ? 'rank-2' :
                                                'rank-3'}`, children: user.rank }), _jsx(User, { className: "h-8 w-8 text-gray-400 ml-2" }), _jsx("span", { className: "font-medium ml-2", children: user.name })] }), _jsxs("span", { className: "text-primary font-semibold", children: [user.points, " pts"] })] }, user.name))) }) })] }));
};
