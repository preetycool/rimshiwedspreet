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
        <Message
          messageText={submissionMessage.message}
          messageType={submissionMessage.type}
        />
      );
    } else {
      return (
        <form className="information-form" onSubmit={handleSubmit}>
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
            >
              <MenuItem value="Engagement">Engagement</MenuItem>
            </Select>
          </FormControl>
          <TextField
            className="info-textfield"
            required
            id={listOfIds.name}
            label="Name"
            defaultValue=""
            variant="outlined"
            onChange={(e) => handleChange(e, listOfIds.Name)}
          />
          <TextField
            className="info-textfield"
            required
            id={listOfIds.email}
            label="Email"
            defaultValue=""
            variant="outlined"
            onChange={(e) => handleChange(e, listOfIds.Email)}
          />
          <TextField
            className="info-textfield"
            required
            id={listOfIds.telephone}
            label="Telephone Number"
            defaultValue=""
            variant="outlined"
            onChange={(e) => handleChange(e, listOfIds.Telephone)}
          />
          <TextField
            className="info-textfield"
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
            className="info-textfield"
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
      <h1 className="title">Please enter your details below</h1>
      {isLoading ? (
        <div className="circular-loader">
          <CircularProgress />
        </div>
      ) : (
        formlayout()
      )}
    </div>
  );
};

export default RSVP;
