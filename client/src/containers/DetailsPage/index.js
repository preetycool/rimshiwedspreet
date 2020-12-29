import React, { useState } from "react";
import { format } from "date-fns";
import Select from "@material-ui/core/Select";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import DetailRow from "../../components/DetailRow";
import Map from "../../components/Map";
import "./DetailsPage.scss";

const DetailsPage = () => {
  const history = useHistory();
  const events = [
    {
      name: "Engagement",
      date: new Date(2021, 0, 17),
      time: "6:00pm to late",
      location: {
        name: "Parra Villa Function Lounge",
        address: "42 Campbell St, Parramatta NSW 2150",
        lat: -33.81796470343846,
        lng: 151.00155109745515,
        link: "https://goo.gl/maps/2pc6KkNTuFrBiV1JA",
      },
      rsvpReady: true,
    },
  ];

  const engagementEvent = events.find((event) => event.name === "Engagement");

  const [eventType, setEventType] = useState(engagementEvent);

  const handleDropdownChange = (e) => {
    const selectedEvent = events.find((event) => event.name === e.target.value);
    setEventType(selectedEvent);
  };

  const handleRsvp = () => {
    history.push("/rsvp");
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
                <MenuItem key={event.name} value={event.name}>
                  {event.name}
                </MenuItem>
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
            text={`Location: ${eventType.location.name}`}
          />
          <DetailRow
            className="Address"
            iconSource={{
              image: "house.png",
              alt: "address-icon",
            }}
            text={`Address: ${eventType.location.address}`}
            isLink
            link={eventType.location.link}
          />
          <DetailRow
            className="time"
            iconSource={{
              image: "time.png",
              alt: "time-icon",
            }}
            text={`Time: ${eventType.time}`}
          />
          {eventType.rsvpReady ? (
            <Button
              className="button-rsvp"
              onClick={handleRsvp}
              type="submit"
              id="button-rsvp"
              variant="contained"
              color="primary"
            >
              RSVP here
            </Button>
          ) : (
            ""
          )}
          <Map location={eventType.location} />
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
