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
      <h1>Rimshi &amp; Preet</h1>
      <nav>
        <ul>
          <li onClick={handleCountdownClick}>Countdown</li>
          <li onClick={handleRsvpClick}>RSVP</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
