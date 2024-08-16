"use client";
import React, { useEffect, useState } from "react";
import { loginAction, loginGoogleAction } from "@/actions/auth/action";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/ui/Input/CustomInput";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import Image from "next/image";
import { SubmitButton } from "./loginbutton";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Dialog } from "@/components/ui/dialog";
import Google from "next-auth/providers/google";
import { signIn, useSession } from "next-auth/react";
import { useUserContext } from "@/providers/user.provider";
import { createCookieSession } from "@/helpers/session/handleCookies";
import { COOKIE_EXPIRE_TIME } from "@/constants/main.constants";
import Loader from "@/components/loader/loader";
import { UserInterface } from "@/types/types/types.user";

const initialState = {
  email: "",
};
interface LoginFormProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const LoginForm = ({ searchParams }: LoginFormProps) => {
  const [state, formAction] = useFormState(loginAction, initialState);

  const userState = useUserContext();
  const { data, status } = useSession();

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

  //TODO: Will Create Google auth with Next Auth or Oauth
  async function handleGoogleAuth() {
    await signIn("google");
  }

  useEffect(() => {
    async function updateUser() {
      if (data?.user) {
        const user: UserInterface = {
          name: data.user.name!, // Convert undefined to null
          email: data.user.email!,
          image: data.user.image!,
          // Add other properties if needed
        };
        await loginGoogleAction(user);
        userState?.setUser(user);
      }
    }
    updateUser();
  }, [data]);

  return (
    <div className="border max-w-[420px] w-full border-white p-8 rounded-2xl bg-gradient-to-b via-white via-30% from-10% from-indigo-50  shadow-md flex flex-col gap-4">
      {status === "loading" && "Loading.............."}
      <div className="text-center">
        <h1 className="font-semibold">Extro</h1>
        <h1 className="text-2xl font-semibold">Welcome Back</h1>
        <p className="textr text-xs">Welcome Back, Please Enter your Email.</p>
      </div>
      <div className="social-login grid-cols-3 inline-flex items-center ">
        <Button
          disabled={status === "loading" || data !== undefined}
          onClick={handleGoogleAuth}
          className="bg-white w-full p-1 aspect-square  border shadow-sm hover:bg-white hover:shadow-md transition-shadow "
        >
          {status === "loading" || data ? (
            <Loader size="sm" />
          ) : (
            <Image
              src={"/google-icon.webp"}
              width={48}
              height={48}
              alt="google-login"
              draggable={false}
              className="w-10"
            ></Image>
          )}
        </Button>
      </div>
      <p className="text-center text-xs text-secondaryColor capitalize">or</p>
      <form action={formAction} className="flex flex-col gap-2">
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
        <SubmitButton />
      </form>
    </div>
  );
};

export default LoginForm;
