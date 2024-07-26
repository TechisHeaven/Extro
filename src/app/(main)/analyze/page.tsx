import React, { Suspense } from "react";
import Analzye from "./Analzye";

export default function page() {
  return (
    <Suspense fallback={"analyze loading..."}>
      <div className=" p-4">
        <div className="inline-flex items-start justify-start w-full">
          <Analzye />
        </div>
      </div>
    </Suspense>
  );
}
