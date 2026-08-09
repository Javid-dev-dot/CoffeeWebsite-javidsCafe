import React from "react";
import RoasteryGallery from "@/components/About/RoasteryGallery";

const items = [
  {
    id: 1,
    img: "/assets/insidecafe1.jpg",
    url: "#",
    width: 300,
    height: 380,
    title: "The Dining Room",
    tag: "Interior",
  },
  {
    id: 2,
    img: "/assets/Cappuccino.png",
    url: "#",
    width: 250,
    height: 300,
    title: "Signature Cappuccino",
    tag: "On the Menu",
  },
  {
    id: 3,
    img: "/assets/insidecafe2.jpg",
    url: "#",
    width: 280,
    height: 340,
    title: "Morning Light",
    tag: "Interior",
  },
  {
    id: 4,
    img: "/assets/LatteeArt.jpeg",
    url: "#",
    width: 260,
    height: 320,
    title: "Latte Art",
    tag: "Craft",
  },
  {
    id: 5,
    img: "/assets/coffeejavid1.png",
    url: "#",
    width: 300,
    height: 260,
    title: "Single-Origin Pour",
    tag: "Roastery",
  },
  {
    id: 6,
    img: "/assets/Americano.png",
    url: "#",
    width: 240,
    height: 300,
    title: "Americano",
    tag: "On the Menu",
  },
  {
    id: 7,
    img: "/assets/cafe2.jpg",
    url: "#",
    width: 280,
    height: 360,
    title: "The Counter",
    tag: "Interior",
  },
  {
    id: 8,
    img: "/assets/Latte.png",
    url: "#",
    width: 250,
    height: 300,
    title: "Classic Latte",
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
        overflowX: "hidden", // prevents horizontal overflow
        position: "relative", // ensures children respect boundaries
      }}
    >
      <RoasteryGallery
        items={items}
        animateFrom="bottom"
        scaleOnHover
        hoverScale={0.97}
        blurToFocus
        gap={10}
      />
    </section>
  );
}
