"use client";

import { useCallback, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

import SmoothScrollProvider from "@/components/SmoothScroll/Lenis";
import Preloader from "@/components/Preloader/PreLoader";
import TransitionWrapper from "../TransitionWrapper";

const PRELOADER_KEY = "cofffeetime-preloader-seen";

export default function AppShell({ children }) {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const seen = sessionStorage.getItem(PRELOADER_KEY);

    if (seen) {
      setShowPreloader(false);
      document.body.classList.add("preloader-done");
    } else {
      document.body.classList.add("preloader-active");
    }
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    sessionStorage.setItem(PRELOADER_KEY, "1");
    document.body.classList.remove("preloader-active");
    document.body.classList.add("preloader-done");
    setShowPreloader(false);
  }, []);

  return (
    <SmoothScrollProvider>
      <TransitionWrapper>
        <Navbar />
        {children}
       
      </TransitionWrapper>

      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
    </SmoothScrollProvider>
  );
}
