"use client";
import React from "react";
import { Button } from "../button";
import { logout } from "@/actions/auth/action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUserContext } from "@/providers/user.provider";
import { signOut } from "next-auth/react";
import { useExpenseContext } from "@/providers/expense.provider";

const Logout = () => {
  const router = useRouter();
  const state = useUserContext();
  const expense = useExpenseContext();
  async function handleLogout() {
    state?.setUser(null);
    expense?.clearExpenses();
    await logout();
    await signOut();
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
