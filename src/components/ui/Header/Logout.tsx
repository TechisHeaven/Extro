"use client";
import React from "react";
import { Button } from "../button";
import { logout } from "@/actions/auth/action";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  function handleLogout() {
    logout();
    router.push("/login");
  }
  return (
    <Button onClick={handleLogout} className="bg-mainColor w-full">
      Logout
    </Button>
  );
};

export default Logout;
