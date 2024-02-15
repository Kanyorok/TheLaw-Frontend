import React, { useState } from "react";

const MonthCalendar = () => {
  const [events, setEvents] = useState({});

  const renderCalendar = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();

    const calendar = [];

    // Render blank spaces for days before the 1st of the month
    for (let i = 0; i < firstDayIndex; i++) {
      calendar.push(<div key={`empty-${i}`} className="day empty" />);
    }

    // Render days with events
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day).toISOString().split("T")[0];
      const dayEvents = events[currentDate] || [];

      calendar.push(
        <div key={currentDate} className="day" onClick={() => handleAddEvent(currentDate)}>
          <span>{day}</span>
          {dayEvents.map((event, index) => (
            <div key={`${currentDate}-${index}`} className="event">
              {event}
            </div>
          ))}
        </div>
      );
    }

    return calendar;
  };

  const handleAddEvent = (date) => {
    const newEvent = prompt("Enter event for " + date);
    if (newEvent) {
      setEvents(prevEvents => ({
        ...prevEvents,
        [date]: [...(prevEvents[date] || []), newEvent]
      }));
    }
  };

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  return (
    <div className="grid grid-cols-7 gap-2">
      {renderCalendar(currentYear, currentMonth)}
    </div>
  );
};

export default MonthCalendar;
