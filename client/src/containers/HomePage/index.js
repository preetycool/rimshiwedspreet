import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const HomePage = () => {
  return (
    <div className="homepage">
      <div style={{ width: "60%" }} className="homepage__slideshow">
        <Carousel autoPlay={true} renderThumbs={() => []}>
          <div>
            <img src={require("../../Images/slideshow/engagement1.jpg")} />
          </div>
          <div>
            <img src={require("../../Images/check.png")} />
          </div>
          <div>
            <img src={require("../../Images/house.png")} />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default HomePage;
