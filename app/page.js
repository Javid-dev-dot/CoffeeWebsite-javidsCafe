import React from "react";

import SmoothScrollProvider from "@/components/SmoothScroll/Lenis";
import Layout from "@/components/Structure Layout/Layout";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Layout />
    </SmoothScrollProvider>
  );
}
