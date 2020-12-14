import React, { useState, useEffect } from "react";
import { differenceInMilliseconds, format } from "date-fns";
import "./Timer.scss";

const calculateDiffTimeEvent = (date) => {
  let timeLeft;
  const result = differenceInMilliseconds(date, new Date());
  if (result > 0) {
    timeLeft = {
      days: Math.floor(result / (60 * 60 * 24 * 1000)),
      hours: Math.floor((result / (60 * 60 * 1000)) % 24),
      minutes: Math.floor((result / (60 * 1000)) % 60),
      seconds: Math.floor((result / 1000) % 60),
    };
  }
  return timeLeft;
};

const Timer = () => {
  const events = [
    {
      name: "Engagement",
      date: new Date(2021, 0, 17),
    },
    {
      name: "Sangeet",
      date: new Date(2021, 7, 22),
    },
    {
      name: "Wedding",
      date: new Date(2021, 7, 28),
    },
    {
      name: "Reception",
      date: new Date(2021, 7, 29),
    },
  ];

  const weddingEvent = events.find((event) => event.name === "Wedding");

  const [timeLeft, setTimeLeft] = useState(
    calculateDiffTimeEvent(weddingEvent.date)
  );

  const [eventType, setEventType] = useState(weddingEvent);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateDiffTimeEvent(eventType.date));
    }, 1000);
    return () => clearTimeout(timer);
  });

  const { days, hours, minutes, seconds } = timeLeft;

  const handleDropdownChange = (e) => {
    const selectedEvent = events.find((event) => event.name === e.target.value);
    setEventType(selectedEvent);
  };

  return (
    <div className="time">
      <div className="dropdown">
        <h2>Select an Event</h2>
        <select
          name="wedding-events"
          id="wedding-events"
          value={eventType.name}
          onChange={handleDropdownChange}
        >
          {events.map((event) => (
            <option key={event.name} value={event.name}>
              {event.name}
            </option>
          ))}
        </select>
      </div>
      <h2>
        {`Date of ${eventType.name}:   ${format(
          new Date(eventType.date),
          "do MMMM yyyy"
        )}`}
      </h2>
      <div className="time-child">
        <span className="time-amount">{days}</span>
        <span className="time-description">days</span>
      </div>
      <div className="time-child">
        <span className="time-amount">{hours}</span>
        <span className="time-description">hours</span>
      </div>
      <div className="time-child">
        <span className="time-amount">{minutes}</span>
        <span className="time-description">minutes</span>
      </div>
      <div className="time-child">
        <span className="time-amount">{seconds}</span>
        <span className="time-description">seconds</span>
      </div>
    </div>
  );
};

export default Timer;
