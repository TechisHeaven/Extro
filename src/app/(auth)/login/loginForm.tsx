"use client";
import React, { useEffect, useState } from "react";
import { loginAction } from "@/actions/auth/action";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/ui/Input/CustomInput";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import Image from "next/image";
import { LoginButton } from "./loginbutton";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Dialog } from "@/components/ui/dialog";

const initialState = {
  email: "",
};
interface LoginFormProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const LoginForm = ({ searchParams }: LoginFormProps) => {
  const [state, formAction] = useFormState(loginAction, initialState);

  useEffect(() => {
    if (state?.errors?.email) {
      const emailError = state?.errors?.email[0];
      toast.error(emailError);
    }
    if (state?.errors) {
      toast.error(state?.errors);
    }
    if (state?.status === 200) {
      toast.success("Email sent successfully");
    }
  }, [state]);

  useEffect(() => {
    if (searchParams?.error) {
      toast.error(searchParams?.error);
    }
  }, [searchParams?.error]);

  return (
    <form
      action={formAction}
      className="border max-w-[420px] w-full border-white p-8 rounded-2xl bg-gradient-to-b via-white via-30% from-10% from-indigo-50  shadow-md flex flex-col gap-4"
    >
      <div className="text-center">
        <h1 className="font-semibold">Extro</h1>
        <h1 className="text-2xl font-semibold">Welcome Back</h1>
        <p className="textr text-xs">Welcome Back, Please Enter your Email.</p>
      </div>
      <div className="social-login grid-cols-3 inline-flex items-center ">
        <Button className="bg-white w-full p-1 aspect-square  border shadow-sm hover:bg-white hover:shadow-md transition-shadow">
          <Image
            src={"/google-icon.webp"}
            width={48}
            height={48}
            alt="google-login"
            draggable={false}
            className="w-10"
          ></Image>
        </Button>
      </div>
      <p className="text-center text-xs text-secondaryColor capitalize">or</p>
      <div className="email">
        <Label>Email</Label>
        <CustomInput
          icon={<Mail className="w-4 h-4 text-secondaryColor " />}
          type="text"
          name="email"
          placeholder="John@doe.com"
          className="bg-white"
        />
      </div>
      <LoginButton />
    </form>
  );
};

export default LoginForm;
