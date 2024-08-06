"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="bg-mainColor w-full" disabled={pending}>
      Continue
    </Button>
  );
}
