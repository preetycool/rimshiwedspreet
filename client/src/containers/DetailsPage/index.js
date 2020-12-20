import React, { useState } from "react";
import { format } from "date-fns";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import DetailRow from "../../components/DetailRow";
import Map from "../../components/Map";
import "./DetailsPage.scss";

const TimerPage = () => {
  const google = window.google;
  const events = [
    {
      name: "Engagement",
      date: new Date(2021, 0, 17),
      time: "5:00pm to late",
      location: "Parra Villa Function Lounge",
      lat: -33.8178381,
      lng: 151.0028019,
    },
    {
      name: "Sangeet",
      date: new Date(2021, 7, 22),
      time: "TBC",
      location: "The Epping Club",
      lat: -33.7733194,
      lng: 151.0785641,
    },
    {
      name: "Wedding",
      date: new Date(2021, 7, 28),
      time: "TBC",
      location: "Glenwood Gurdwara",
      lat: -33.7380147,
      lng: 150.9177304,
    },
    {
      name: "Reception",
      date: new Date(2021, 7, 29),
      time: "TBC",
      location: "Deckhouse Woolwich",
      lat: -33.8415158,
      lng: 151.1714424,
    },
  ];

  const engagementEvent = events.find((event) => event.name === "Engagement");

  const [eventType, setEventType] = useState(engagementEvent);

  const handleDropdownChange = (e) => {
    const selectedEvent = events.find((event) => event.name === e.target.value);
    setEventType(selectedEvent);
  };

  return (
    <div className="details-page">
      <div className="details-page__wrapper">
        <h1>Select an Event</h1>
        <div className="dropdown">
          <FormControl variant="outlined">
            <InputLabel>Events</InputLabel>
            <Select
              id="event-dropdown"
              value={eventType.name}
              onChange={handleDropdownChange}
              label="Events"
            >
              {events.map((event) => (
                <MenuItem value={event.name}>{event.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="details-page__wrapper-info">
          <h2>{`Information about the ${eventType.name}`}</h2>
          <DetailRow
            className="date"
            iconSource={{
              image: "calendar_proper.png",
              alt: "calendar-icon",
            }}
            text={`Date: ${format(new Date(eventType.date), "do MMMM yyyy")}`}
          />
          <DetailRow
            className="location"
            iconSource={{
              image: "map.png",
              alt: "location-icon",
            }}
            text={`Location: ${eventType.location}`}
          />
          <DetailRow
            className="time"
            iconSource={{
              image: "time.png",
              alt: "location-icon",
            }}
            text={`Location: ${eventType.time}`}
          />
        </div>
      </div>
    </div>
  );
};

export default TimerPage;
