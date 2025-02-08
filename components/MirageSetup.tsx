"use client";

import { type ReactNode, useLayoutEffect } from "react";
import { makeServer } from "@/mocks/server";

export default function MirageSetup({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    if (process.env.NODE_ENV === "development") {
      makeServer({ environment: "development" });
    }
  }, []);

  return <>{children}</>;
}
