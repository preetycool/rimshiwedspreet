import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Message from "../../components/Message";
import "./rsvp.scss";
import axios from "axios";

const RSVP = () => {
  const listOfIds = {
    Event: "Event",
    Name: "Name",
    Email: "Email",
    Telephone: "Telephone",
    Guests: "Guests",
    Dietary: "Dietary",
  };

  const listOfEvents = {
    engagement: "engagement",
  };

  const [submissionFormDetails, setSubmissionFormDetails] = useState(
    Object.keys(listOfIds).map((id) => ({
      id,
      value: "",
    }))
  );

  const [isLoading, setIsLoading] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState({});
  const [displayForm, setDisplayForm] = useState(false);
  const [passwordEntered, setPasswordEntered] = useState("");

  const handleSubmit = (e) => {
    if (!!submissionFormDetails.find((detail) => detail.value === "")) {
      return;
    }
    setIsLoading(true);
    e.preventDefault();
    axios({
      method: "POST",
      url: "/send",
      data: submissionFormDetails,
    }).then((response) => {
      setIsLoading(false);
      if (response.data.status === "success") {
        setDropdownValue("");
        setSubmissionMessage({
          type: "success",
          message: "Thank you for RSVPing! See you soon!",
        });
      } else if (response.data.status === "fail") {
        setSubmissionMessage({
          type: "error",
          message:
            "There was an error. Please email rimshiwedspreet@gmail.com directly.",
        });
      }
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordEntered) {
      setIsLoading(true);
      axios({
        method: "POST",
        url: "/password",
        data: { password: passwordEntered },
      }).then((response) => {
        setIsLoading(false);
        if (response.data.status === "success") {
          setDisplayForm(true);
        } else if (response.data.status === "fail") {
          setSubmissionMessage({
            type: "error",
            message: "Incorrect password try again",
          });
        }
      });
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordEntered(e.target.value);
  };

  const [dropdownValue, setDropdownValue] = useState(() => {
    const eventData = submissionFormDetails.find(
      (detail) => detail.id === "Event"
    );
    return eventData ? eventData.value : "";
  });

  const handleChange = (e, id) => {
    const matchingIndex = submissionFormDetails.findIndex(
      (formDetail) => formDetail.id === id
    );
    const copyFormDetails = [...submissionFormDetails];
    copyFormDetails[matchingIndex].value = e.target.value;
    setSubmissionFormDetails(copyFormDetails);
  };

  const formlayout = () => {
    if (!!submissionMessage.message) {
      return (
        <div className="message__wrapper">
          <Message
            messageText={submissionMessage.message}
            messageType={submissionMessage.type}
          />
        </div>
      );
    } else if (!displayForm) {
      return (
        <form className="rsvp-form__password" onSubmit={handlePasswordSubmit}>
          <TextField
            className="rsvp-form__password-textfield"
            required
            id="password"
            label="Enter Password"
            defaultValue=""
            variant="outlined"
            onChange={handlePasswordChange}
          />
          <Button
            className="button-submit"
            onClick={handlePasswordSubmit}
            type="submit"
            id="submit"
            variant="contained"
            color="primary"
          >
            Submit Password
          </Button>
        </form>
      );
    } else if (displayForm) {
      return (
        <form
          className="rsvp-form__details-information"
          onSubmit={handleSubmit}
        >
          <FormControl variant="outlined">
            <InputLabel id={listOfIds.event}>Events</InputLabel>
            <Select
              labelId={listOfIds.event}
              id={listOfIds.event}
              value={dropdownValue}
              onChange={(e) => {
                handleChange(e, listOfIds.Event);
                setDropdownValue(e.target.value);
              }}
              label="Events"
              defaultValue={listOfEvents.engagement}
              required
            >
              <MenuItem value="Engagement">Engagement</MenuItem>
            </Select>
          </FormControl>
          <TextField
            className="rsvp-form__details-information-textfield"
            required
            id={listOfIds.name}
            label="Name"
            defaultValue=""
            variant="outlined"
            onChange={(e) => handleChange(e, listOfIds.Name)}
          />
          <TextField
            className="rsvp-form__details-information-textfield"
            required
            id={listOfIds.email}
            label="Email"
            defaultValue=""
            variant="outlined"
            onChange={(e) => handleChange(e, listOfIds.Email)}
          />
          <TextField
            className="rsvp-form__details-information-textfield"
            required
            id={listOfIds.telephone}
            label="Telephone Number"
            defaultValue=""
            variant="outlined"
            onChange={(e) => handleChange(e, listOfIds.Telephone)}
          />
          <TextField
            className="rsvp-form__details-information-textfield"
            required
            id={listOfIds.guests}
            label="Name of Guests"
            defaultValue=""
            variant="outlined"
            multiline
            rows={4}
            onChange={(e) => handleChange(e, listOfIds.Guests)}
          />
          <TextField
            className="rsvp-form__details-information-textfield"
            required
            id={listOfIds.dietary}
            label="Please list any dietary requirements"
            defaultValue=""
            variant="outlined"
            multiline
            rows={4}
            onChange={(e) => handleChange(e, listOfIds.Dietary)}
          />
          <Button
            className="button-submit"
            onClick={handleSubmit}
            type="submit"
            id="submit"
            variant="contained"
            color="primary"
            onChange={(e) => handleChange(e, listOfIds.Name)}
          >
            Submit Details
          </Button>
        </form>
      );
    }
  };

  return (
    <div className="rsvp-form">
      <div className="rsvp-form__details">
        <h1 className="rsvp-form__details-title">
          Please enter your details below
        </h1>
        {isLoading ? (
          <div className="circular-loader">
            <CircularProgress />
          </div>
        ) : (
          formlayout()
        )}
      </div>
    </div>
  );
};

export default RSVP;
