import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Activity, Utensils, CalendarDays } from "lucide-react";
export const Reminders = () => {
    const [reminders, setReminders] = useState([
        {
            id: 1,
            title: "HIIT Workout",
            time: "5:00 PM Today",
            type: "workout"
        },
        {
            id: 2,
            title: "Drink Water (16oz)",
            time: "Every 2 hours",
            type: "nutrition"
        },
        {
            id: 3,
            title: "Meal Prep for Tomorrow",
            time: "8:00 PM Today",
            type: "nutrition"
        },
        {
            id: 4,
            title: "Weekly Progress Check",
            time: "Sunday, 10:00 AM",
            type: "other"
        }
    ]);
    const [newReminder, setNewReminder] = useState({
        title: "",
        time: "",
        type: "workout"
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReminder({
            ...newReminder,
            [name]: value
        });
    };
    const handleAddReminder = (e) => {
        e.preventDefault();
        if (newReminder.title && newReminder.time) {
            setReminders([
                ...reminders,
                {
                    id: Date.now(),
                    ...newReminder
                }
            ]);
            // Reset form
            setNewReminder({
                title: "",
                time: "",
                type: "workout"
            });
        }
    };
    const deleteReminder = (id) => {
        setReminders(reminders.filter(reminder => reminder.id !== id));
    };
    const getIconForType = (type) => {
        switch (type) {
            case "workout":
                return _jsx(Activity, { className: "reminder-icon workout" });
            case "nutrition":
                return _jsx(Utensils, { className: "reminder-icon nutrition" });
            default:
                return _jsx(CalendarDays, { className: "reminder-icon other" });
        }
    };
    return (_jsxs("div", { className: "reminders-container", children: [_jsx("ul", { className: "reminders-list", children: reminders.map(reminder => (_jsxs("li", { className: `reminder-item ${reminder.type}`, children: [getIconForType(reminder.type), _jsxs("div", { className: "reminder-content", children: [_jsx("h4", { className: "reminder-title", children: reminder.title }), _jsx("p", { className: "reminder-time", children: reminder.time })] }), _jsx("button", { className: "delete-reminder-btn", onClick: () => deleteReminder(reminder.id), children: "\u00D7" })] }, reminder.id))) }), _jsxs("form", { className: "add-reminder-form", onSubmit: handleAddReminder, children: [_jsx("h4", { className: "form-title", children: "Add New Reminder" }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Title" }), _jsx("input", { type: "text", name: "title", value: newReminder.title, onChange: handleInputChange, placeholder: "Reminder Title", required: true })] }), _jsxs("div", { className: "form-row", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Time/Date" }), _jsx("input", { type: "text", name: "time", value: newReminder.time, onChange: handleInputChange, placeholder: "e.g. 5:00 PM Today", required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Type" }), _jsxs("select", { name: "type", value: newReminder.type, onChange: handleInputChange, children: [_jsx("option", { value: "workout", children: "Workout" }), _jsx("option", { value: "nutrition", children: "Nutrition" }), _jsx("option", { value: "other", children: "Other" })] })] })] }), _jsx("button", { type: "submit", className: "add-reminder-submit", children: "Add Reminder" })] })] }));
};
