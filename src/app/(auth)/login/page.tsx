import React from "react";
import LoginForm from "./loginForm";
import { toast } from "sonner";

interface LoginPagewProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}
export default async function Login({ params, searchParams }: LoginPagewProps) {
  return (
    <div className="max-w-[1400px] m-auto h-screen">
      <div className="container  flex flex-col justify-center items-center h-full w-full">
        <LoginForm searchParams={searchParams} />
      </div>
    </div>
  );
}
