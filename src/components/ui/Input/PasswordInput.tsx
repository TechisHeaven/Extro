"use client";
import React, { useState } from "react";
import { Input } from "../input";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  placeholder?: string;
}
export default function PasswordInput({ placeholder }: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  function handlePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }
  return (
    <div className="inline-flex items-center justify-between border rounded-md p-2 w-full">
      <Input
        type={isPasswordVisible ? "text" : "password"}
        placeholder={placeholder}
        className="p-0 border-0 h-6 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      {isPasswordVisible ? (
        <Eye
          className="w-4 cursor-pointer"
          onClick={handlePasswordVisibility}
        />
      ) : (
        <EyeOff
          className="w-4 cursor-pointer"
          onClick={handlePasswordVisibility}
        />
      )}
    </div>
  );
}
