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
    {
      name: "Sangeet",
      date: new Date(2021, 7, 22),
      time: "TBC",
      location: {
        name: "The Epping Club",
        address: "45-47 Rawson St, Epping NSW 2121",
        lat: -33.77329440367127,
        lng: 151.08075820596946,
        link: "https://g.page/EppingClub?share",
      },
      rsvpReady: false,
    },
    {
      name: "Wedding",
      date: new Date(2021, 7, 28),
      time: "TBC",
      location: {
        name: "Glenwood Gurdwara",
        address: "4/18 Meurants Ln, Glenwood NSW 2768",
        lat: -33.737871929411355,
        lng: 150.91996201395014,
        link: "https://goo.gl/maps/GhfwbWfPXq8tyqMj6",
      },
      rsvpReady: false,
    },
    {
      name: "Reception",
      date: new Date(2021, 7, 29),
      time: "TBC",
      location: {
        name: "Deckhouse Woolwich",
        address: "Clarke Rd, Woolwich NSW 2110",
        lat: -33.84149092946071,
        lng: 151.1736316704075,
        link: "https://g.page/DeckhouseWoolwich?share",
      },
      rsvpReady: false,
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
