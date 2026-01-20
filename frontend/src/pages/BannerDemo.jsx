import React, { useState, useEffect } from "react";
import IncomingBanner from "@/components/prank/IncomingBanner";

export default function BannerDemo() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-black text-white text-2xl">
      Waiting for incoming call…
      <IncomingBanner callerId="mystery" visible={showBanner} />
    </div>
  );
}
