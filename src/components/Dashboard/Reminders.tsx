
import React, { useState } from "react";
import { Activity, Utensils, CalendarDays } from "lucide-react";

interface Reminder {
  id: number;
  title: string;
  time: string;
  type: "workout" | "nutrition" | "other";
}

export const Reminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
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

  const [newReminder, setNewReminder] = useState<Omit<Reminder, 'id'>>({
    title: "",
    time: "",
    type: "workout"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewReminder({
      ...newReminder,
      [name]: value
    });
  };

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReminder.title && newReminder.time) {
      setReminders([
        ...reminders,
        {
          id: Date.now(),
          ...newReminder
        } as Reminder
      ]);
      
      // Reset form
      setNewReminder({
        title: "",
        time: "",
        type: "workout"
      });
    }
  };

  const deleteReminder = (id: number) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "workout":
        return <Activity className="reminder-icon workout" />;
      case "nutrition":
        return <Utensils className="reminder-icon nutrition" />;
      default:
        return <CalendarDays className="reminder-icon other" />;
    }
  };

  return (
    <div className="reminders-container">
      <ul className="reminders-list">
        {reminders.map(reminder => (
          <li key={reminder.id} className={`reminder-item ${reminder.type}`}>
            {getIconForType(reminder.type)}
            <div className="reminder-content">
              <h4 className="reminder-title">{reminder.title}</h4>
              <p className="reminder-time">{reminder.time}</p>
            </div>
            <button 
              className="delete-reminder-btn"
              onClick={() => deleteReminder(reminder.id)}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
      
      <form className="add-reminder-form" onSubmit={handleAddReminder}>
        <h4 className="form-title">Add New Reminder</h4>
        
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={newReminder.title}
            onChange={handleInputChange}
            placeholder="Reminder Title"
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Time/Date</label>
            <input
              type="text"
              name="time"
              value={newReminder.time}
              onChange={handleInputChange}
              placeholder="e.g. 5:00 PM Today"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Type</label>
            <select
              name="type"
              value={newReminder.type}
              onChange={handleInputChange}
            >
              <option value="workout">Workout</option>
              <option value="nutrition">Nutrition</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        
        <button type="submit" className="add-reminder-submit">Add Reminder</button>
      </form>
    </div>
  );
};
