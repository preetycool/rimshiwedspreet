import React, { useState, useEffect } from "react";
import { differenceInMilliseconds, format } from "date-fns";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import DetailRow from "../../components/DetailRow";
import "./DetailsPage.scss";

const TimerPage = () => {
  const google = window.google;
  const events = [
    {
      name: "Engagement",
      date: new Date(2021, 0, 17),
      location: "Paravilla",
    },
    {
      name: "Sangeet",
      date: new Date(2021, 7, 22),
      location: "Epping Club",
    },
    {
      name: "Wedding",
      date: new Date(2021, 7, 28),
      location: "Glenwood Gurdwara",
    },
    {
      name: "Reception",
      date: new Date(2021, 7, 29),
      location: "Deckhouse",
    },
  ];

  const weddingEvent = events.find((event) => event.name === "Wedding");

  const [eventType, setEventType] = useState(weddingEvent);

  const handleDropdownChange = (e) => {
    const selectedEvent = events.find((event) => event.name === e.target.value);
    setEventType(selectedEvent);
  };

  // // Initialize and add the map
  // function initMap() {
  //   // The location of Uluru
  //   const uluru = { lat: -25.344, lng: 131.036 };
  //   // The map, centered at Uluru
  //   const map = new window.google.maps.Map(document.getElementById("map"), {
  //     zoom: 4,
  //     center: uluru,
  //   });
  //   // The marker, positioned at Uluru
  //   const marker = new window.google.maps.Marker({
  //     position: uluru,
  //     map: map,
  //   });
  // }

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
        </div>
      </div>
    </div>
  );
};

export default TimerPage;
