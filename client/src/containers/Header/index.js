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
    <nav className="navbar">
      <div className="navbar__icon">
        <img
          src={require("../../Images/pr.png")}
          alt="Rimshi and Preet"
          width="80px"
          height="80px"
        />
      </div>
      <div className="navbar__categories">
        <ul>
          <li onClick={handleCountdownClick}>Event Details</li>
          <li onClick={handleRsvpClick}>RSVP</li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
