"use client";
import CursorSection from "../CursorSection/CursorSection";
import "./CoffeeTypo.css";
import CoffeeHeading from "./CoffeeHeading";
import CoffeeParagraph from "./CoffeeParagraph";

function CoffeeTypo() {
  return (
    <main>
      <CursorSection
        cursorColor="#6f4e37"
        cursorColorOnTarget="#c0a080"
        targetSelector=".coffee-section, .coffee-target, .coffee_paragraph"
      />
      <div className="coffee-section relative overflow-hidden">
        {/* Hero intro */}
        <div className="hero-intro relative h-[40vh] flex justify-center items-center text-coffee-light tracking-widest text-lg">
          SCROLL DOWN FOR THE COFFEE VIBES
        </div>

        {/* Separate components */}
        <CoffeeHeading />
        <CoffeeParagraph />
      </div>
    </main>
  );
}

export default CoffeeTypo;
