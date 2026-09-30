"use client";

import { useEffect, useState } from "react";
import { getTimeAgo } from "../utils/time";

export function RelativeTime({ date }: { date?: Date | string }) {
  const [label, setLabel] = useState("hace unos segundos");

  useEffect(() => {
    if (!date) {
      setLabel("hace unos segundos");
      return;
    }

    const updateLabel = () => setLabel(getTimeAgo(date));
    updateLabel();

    const interval = window.setInterval(updateLabel, 60000);
    return () => window.clearInterval(interval);
  }, [date]);

  return <>{label}</>;
}
