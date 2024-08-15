"use client";
import { getUser, updateUser } from "@/actions/auth/action";
import { SubmitButton } from "@/app/(auth)/login/loginbutton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUserContext } from "@/providers/user.provider";
import { UserInterface } from "@/types/types/types.user";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { ZodIssue } from "zod";

//define initial state
interface UserInitialState {
  name: string;
  about_me: string;
}

const SettingsMeForm = ({
  user,
}: {
  user: UserInterface | undefined | null;
}) => {
  const stateContext = useUserContext();
  const [formErrors, setFormErrors] = useState<ZodIssue[]>([]);
  // Track form state manually
  const [formValues, setFormValues] = useState<UserInitialState>({
    name: user?.name || "",
    about_me: user?.about_me || "",
  });

  useEffect(() => {
    // Update initial values if user prop changes
    if (user) {
      setFormValues({
        name: user.name || "",
        about_me: user.about_me || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (formErrors.length > 0) {
      formErrors.forEach((error) => {
        toast.error(error.message || "Validation error");
      });
    }
  }, [formErrors]);

  // Check if form values are different from initial values
  const hasChanges = () => {
    return (
      formValues.name !== stateContext?.user?.name ||
      formValues.about_me !== stateContext?.user?.about_me
    );
  };

  // Handle form change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const userName = user?.name || "";
  const aboutMe = user?.about_me || "";

  // Handle form submission
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (hasChanges()) {
      const response = await updateUser(formValues);
      if (response.errors) {
        setFormErrors(response.errors);
        toast.error(response.message || "Failed to update user");
      }
      if (response.status === 200) {
        stateContext?.updateUser(response.result);
        toast.success("User Updated successfully");
      }
      console.log(response);
    } else {
      toast.info("No changes detected");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 p-4">
      <div className="Profile flex  gap-4 flex-col sm:flex-row items-center sm:items-end">
        <Image
          alt="profile-image"
          src={"/profile-image.webp"}
          width={100}
          height={100}
          className="rounded-full aspect-square object-cover"
        />
        <div className="inline-flex flex-wrap gap-2">
          <Button className="bg-mainColor">Change Picture</Button>
          <Button
            variant={"outline"}
            className="bg-red-100 text-red-500 border-red-200 hover:text-red-500"
          >
            Remove Picture
          </Button>
        </div>
      </div>
      <div className="Name">
        <Label>Profile Name</Label>
        <Input
          name="name"
          placeholder="John Joe"
          defaultValue={userName}
          onChange={handleChange}
        />
      </div>
      <div className="About flex flex-col gap-1 items-start">
        <Label>About me</Label>
        <Textarea
          name="about_me"
          placeholder="Tell us a little bit about yourself"
          className="resize-none h-48"
          defaultValue={aboutMe}
          onChange={handleChange}
        />
      </div>
      <div className="Save w-full items-start">
        <SubmitButton text="Save" />
      </div>
    </form>
  );
};

export default SettingsMeForm;
