import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReservations } from "../redux/reservation/reservationSlice";
import { Link } from 'react-router-dom';

const MonthCalendar = () => {
  const [events, setEvents] = useState({});
  const dispatch = useDispatch();
  const { reservations, loading, error, isError } = useSelector((state) => state.reservation);

  useEffect(() => {
    if (reservations.length === 0) {
      dispatch(fetchReservations());
    } else {
      // Populate events with reservations
      const eventsData = {};
      reservations.forEach((reservation) => {
        const date = reservation.date.split(" ")[0];
        const userName = reservation.user_name;
        const id = reservation.id;
        if (!eventsData[date]) {
          eventsData[date] = [userName];
        } else {
          eventsData[date].push(userName);
        }
      });
      setEvents(eventsData);
    }
  }, [dispatch, reservations]);

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
        <>
        <div key={currentDate} className="day">
          <span>{day}</span>
          {dayEvents.map((userName, index) => (
            <>
            <div key={`${currentDate}-${index}`} className="event flex flex-col">
              {userName}
            </div>
            </>
          ))}
        </div>
        </>
      );
    }

    return calendar;
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
