import React from "react";
import RoasteryGallery from "@/components/About/RoasteryGallery";

const items = [
  {
    id: 1,
    img: "/assets/insidecafe.jpg",
    title: "The Dining Room",
    tag: "Interior",
  },
  {
    id: 2,
    img: "/assets/card1.jpg",
    title: "Signature Cappuccino",
    tag: "On the Menu",
  },
  {
    id: 3,
    img: "/assets/night.jpg",
    title: "Morning Light",
    tag: "Interior",
  },
  {
    id: 4,
    img: "/assets/Pixelcafe.webp",
    title: "Cafe Pixel Art",
    tag: "Craft",
  },
  {
    id: 5,
    img: "/assets/LogoCoffee.jpeg",
    title: "Single-Origin Pour",
    tag: "Roastery",
  },
  {
    id: 6,
    img: "/assets/coffeecolors.jpg",
    title: "Colors of Coffee",
    tag: "On the Menu",
  },
  {
    id: 7,
    img: "/assets/cafe2.jpg",
    title: "The Counter",
    tag: "Interior",
  },
  {
    id: 8,
    img: "/assets/Landing.webp",
    title: "Landing Page Design",
    tag: "On the Menu",
  },
];

export default function RoasteryGalleryUsage() {
  return (
    <section
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#0d0906",
        overflowX: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <RoasteryGallery items={items} />
    </section>
  );
}
