"use client";
import { useWindowSize } from "@/hooks/windowSize";
import { cn } from "@/lib/utils";
import { ChevronLeft, Inbox } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();
  const size = useWindowSize();
  const isMobileView = size.width <= 600 ? true : false;
  function handleBack() {
    router.back();
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        onClick={handleBack}
        className={cn(
          isMobileView
            ? "p-3 border aspect-square rounded-md"
            : "p-1 border w-fit h-fit aspect-square rounded-full"
        )}
      >
        <ChevronLeft className="w-4 h-4" />
      </div>
    </div>
  );
};

export default BackButton;
