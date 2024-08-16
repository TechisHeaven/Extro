"use client";

import Loader from "@/components/loader/loader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  text?: string;
  className?: React.ComponentProps<"div">["className"];
}

export function SubmitButton({
  text = "Continue",
  className,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className={cn("bg-mainColor w-full", className)}
      disabled={pending}
    >
      {pending ? <Loader size="sm" /> : text}
    </Button>
  );
}
