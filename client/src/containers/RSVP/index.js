import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./rsvp.scss";
import axios from "axios";

const RSVP = () => {
  const listOfIds = {
    name: "name",
    email: "email",
    telephone: "telephone",
    guests: "guests",
    dietary: "dietary",
  };

  const [submissionFormDetails, setSubmissionFormDetails] = useState(
    Object.keys(listOfIds).map((id) => ({ id, value: "" }))
  );

  const handleSubmit = (e) => {
    if (!!submissionFormDetails.find((detail) => detail.value === "")) {
      return;
    }
    e.preventDefault();
    axios({
      method: "POST",
      url: "/send",
      data: submissionFormDetails,
    }).then((response) => {
      if (response.data.status === "success") {
      } else if (response.data.status === "fail") {
      }
    });
  };

  const handleChange = (e, id) => {
    console.log("id", id);
    const matchingIndex = submissionFormDetails.findIndex(
      (formDetail) => formDetail.id === id
    );
    console.log(matchingIndex);
    const copyFormDetails = [...submissionFormDetails];
    copyFormDetails[matchingIndex].value = e.target.value;
    setSubmissionFormDetails(copyFormDetails);
  };

  return (
    <div className="rsvp-form">
      <h1>Please enter your details below</h1>
      <form className="information-form" onSubmit={handleSubmit}>
        <TextField
          className="info-textfield"
          required
          id={listOfIds.name}
          label="Name"
          defaultValue=""
          variant="outlined"
          onChange={(e) => handleChange(e, listOfIds.name)}
        />
        <TextField
          className="info-textfield"
          required
          id={listOfIds.email}
          label="Email"
          defaultValue=""
          variant="outlined"
          onChange={(e) => handleChange(e, listOfIds.email)}
        />
        <TextField
          className="info-textfield"
          required
          id={listOfIds.telephone}
          label="Telephone Number"
          defaultValue=""
          variant="outlined"
          onChange={(e) => handleChange(e, listOfIds.telephone)}
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
          onChange={(e) => handleChange(e, listOfIds.guests)}
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
          onChange={(e) => handleChange(e, listOfIds.dietary)}
        />
        <Button
          className="button-submit"
          onClick={handleSubmit}
          type="submit"
          id="submit"
          variant="contained"
          color="primary"
          onChange={(e) => handleChange(e, listOfIds.name)}
        >
          Submit Details
        </Button>
      </form>
    </div>
  );
};

export default RSVP;
