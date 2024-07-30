"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();
  function handleBack() {
    router.back();
  }
  return (
    <div
      onClick={handleBack}
      className="p-1 border w-fit h-fit aspect-square rounded-full"
    >
      <ChevronLeft className="w-4 h-4" />
    </div>
  );
};

export default BackButton;
