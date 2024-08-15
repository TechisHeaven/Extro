"use client";
import { useUserContext } from "@/providers/user.provider";
import { UserInterface } from "@/types/types/types.user";
import React, { useEffect } from "react";

const Heading = () => {
  const state = useUserContext();
  const username = state?.user?.name || "user";
  return (
    <h3 className="text-2xl font-semibold capitalize">Welcome, {username}</h3>
  );
};

export default Heading;
