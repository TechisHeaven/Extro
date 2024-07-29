import { cn } from "@/lib/utils";
import { Button } from "../button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";

interface DialogProps {
  children: React.ReactNode;
  trigger?: React.ReactElement;
  title?: string;
  description?: string;
  className?: React.ComponentProps<"div">["className"];
}
export function CustomDialog({
  children,
  trigger,
  title,
  description,
  className,
}: DialogProps) {
  return (
    <Dialog open>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={cn("sm:max-w-[425px] p-0", className)}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
