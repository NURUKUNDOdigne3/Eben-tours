"use client";

import { useEffect, useState } from "react";
import HomeLoading from "./HomeLoading";

export default function HomeLoadingWrapper() {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!showLoading) return false;

  return <HomeLoading />;
}
