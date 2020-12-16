import React from "react";
import "./Header.scss";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  const handleRsvpClick = () => {
    history.push("/rsvp");
  };

  const handleCountdownClick = () => {
    history.push("/");
  };

  return (
    <div className="heading-nav">
      <img
        className="icon"
        src={require("../../Images/pr.png")}
        alt="Rimshi and Preet"
        width="80px"
        height="80px"
      />
      <nav className="navbar">
        <ul>
          <li onClick={handleCountdownClick}>Event Details</li>
          <li onClick={handleRsvpClick}>RSVP</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
