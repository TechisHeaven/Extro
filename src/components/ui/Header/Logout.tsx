"use client";
import React from "react";
import { Button } from "../button";
import { logout } from "@/actions/auth/action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUserContext } from "@/providers/user.provider";

const Logout = () => {
  const router = useRouter();
  const state = useUserContext();
  async function handleLogout() {
    await logout();
    state?.setUser(null);
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
