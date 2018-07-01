import React from "react";
import "./Hero.css";

const Hero = props =>

  // <div
  //   className="hero text-center"
  //   style={{ backgroundImage: `url(${props.backgroundImage})` }}
  //   style = {
  //     {
  //       backgroundImage: url(require("./map3.jpg"))
  //     }
  //   }
  // >

  
  //   {props.children}
  // </div>;

  < img src = {
    require('./map3.jpg')
  } className = "hero text-center" />

export default Hero;
