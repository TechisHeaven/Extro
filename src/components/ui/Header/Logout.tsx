"use client";
import React from "react";
import { Button } from "../button";
import { logout } from "@/actions/auth/action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Logout = () => {
  const router = useRouter();
  async function handleLogout() {
    await logout();
    router.push("/login");
    toast.success("Logout Successfully!");
  }
  return (
    <Button onClick={handleLogout} className="bg-mainColor w-full">
      Logout
    </Button>
  );
};

export default Logout;
