"use client";
import React from "react";

import { CiCoffeeCup } from "react-icons/ci";
import { DiCoffeescript } from "react-icons/di";
import { GiCoffeePot } from "react-icons/gi";
import { SiBuymeacoffee } from "react-icons/si";
import { MdCoffeeMaker } from "react-icons/md";

import LogoLoop from "./Logoloop";
// 👉 Tech logos using React Icons (no hrefs, just icons + titles)
const techLogos = [
  { node: <CiCoffeeCup /> },
  { node: <DiCoffeescript /> },
  { node: <GiCoffeePot /> },
  { node: <SiBuymeacoffee /> },
  { node: <MdCoffeeMaker /> },

  // Add your favourites here:
  // { node: <SiYourFavIcon />, title: "My Favourite" },
];

function LogoULoop() {
  return (
    <LogoLoop
      logos={techLogos}
      speed={90}
      direction="left"
      brandName="Javid's Cafe"
      brandEvery={3}
      logoHeight={30}
      gap={40}
      fadeOut
      scaleOnHover
    />
  );
}

export default LogoULoop;
