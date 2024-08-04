import { Button } from "@/components/ui/button";
import CustomInput from "@/components/ui/Input/CustomInput";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="max-w-[1400px] m-auto h-screen">
      <div className="container flex flex-col justify-center items-center h-full max-w-96 w-full">
        <form className="border p-8 rounded-md shadow-md flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Login</h1>
            <p className="text-secondaryColor text-xs">
              Welcome Back, Please Enter your Email.
            </p>
          </div>
          <div className="email">
            <Label>Email</Label>
            <CustomInput
              icon={<Mail className="w-4 h-4 text-secondaryColor" />}
              type="email"
              placeholder="John@doe.com"
            />
          </div>
          <Button type="submit" className="bg-mainColor w-full">
            Continue
          </Button>
          <hr />
          <p className="text-center text-xs text-secondaryColor capitalize">
            or Continue with
          </p>
          <div className="social-login inline-flex items-center justify-center">
            <Button className="bg-white w-12 h-12 p-1 aspect-square rounded-full border shadow-sm hover:bg-white hover:shadow-md transition-shadow">
              <Image
                src={"/google-icon.webp"}
                width={48}
                height={48}
                alt="google-login"
                draggable={false}
              ></Image>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
