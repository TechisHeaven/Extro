import SpinnerLoader from "@/components/ui/loader";
import React from "react";

export default function Loading() {
  return (
    <div className="inline-flex items-center justify-center w-full p-8">
      <SpinnerLoader size="small" color="border-mainColor" />
    </div>
  );
}
