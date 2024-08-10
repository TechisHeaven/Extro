"use client";

import React, { useRef } from "react";
import { Button } from "../button";
import { ScanQrCode } from "lucide-react";

const HandleClickScanButton = () => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  function handleFileClick() {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  }
  return (
    <>
      <input
        ref={imageInputRef}
        type="file"
        hidden
        accept="image/*"
        id="file"
        name="file"
      />
      <Button
        onClick={handleFileClick}
        className="inline-flex gap-2 items-center bg-mainColor"
      >
        Scan <ScanQrCode />
      </Button>
    </>
  );
};

export default HandleClickScanButton;
