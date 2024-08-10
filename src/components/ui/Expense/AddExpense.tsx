"use client";
import React, { TouchEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Coins, CreditCard, Plus, ScanQrCode } from "lucide-react";
import { useWindowSize } from "@/hooks/windowSize";
import { DrawerComponent } from "../Drawer/Drawer";
import SheetComponent from "../Sheet/Sheet";
import AddExpenseComponent from "./AddExpenseComponents";

export default function AddExpense({
  children,
}: {
  children: React.ReactNode;
}) {
  const size = useWindowSize();
  const isMobileWidth = size.width <= 600;
  const [buttonSize, setButtonSize] = useState(40); // Initial button size
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [startY, setStartY] = useState<number | null>(null);

  const handleTouchStart = (e: any) => {
    if (!isDrawerOpen && window.scrollY === 0) {
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: any) => {
    const touchY = e.touches[0].clientY;
    if (startY !== null && touchY > startY && !isDrawerOpen) {
      const dragDistance = touchY - startY;

      if (dragDistance > 200) {
        const newSize = Math.min(70, 40 + dragDistance / 5); // Increase button size
        setButtonSize(newSize);

        if (dragDistance > 300) {
          setIsDrawerOpen(true);
        }
      }
    }
  };

  const handleTouchEnd = () => {
    setStartY(null);
    setButtonSize(40);
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      window.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchMove]);

  return (
    <>
      {isMobileWidth ? (
        <DrawerComponent
          className="my-8 p-2"
          setIsDrawerOpen={setIsDrawerOpen}
          isDrawerOpen={isDrawerOpen}
          title="Add Expense"
          description="Add New Daily Expense in your Profile. Click save when you're done."
          trigger={
            <Button
              onClick={() => setIsDrawerOpen(true)}
              className="bg-mainColor text-sm inline-flex gap-2 rounded-full sm:rounded-md"
              size="sm"
              style={{
                height: `${buttonSize}px`,
                width: `${buttonSize + 30}px`,
                transition: "height 0.3s, width 0.3s",
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <Plus className="w-4 text-white" />
              <p className="hidden sm:block">Add Expense</p>
            </Button>
          }
        >
          {children}
        </DrawerComponent>
      ) : (
        <SheetComponent
          title="Add Expense"
          description="Add New Daily Expense in your Profile. Click save when you're done."
          trigger={
            <Button
              className="bg-mainColor text-sm inline-flex gap-2 rounded-full sm:rounded-md"
              size="sm"
            >
              <Plus className="w-4 text-white" />
              <p className="hidden sm:block">Add Expense</p>
            </Button>
          }
        >
          {children}
        </SheetComponent>
      )}
    </>
  );
}
