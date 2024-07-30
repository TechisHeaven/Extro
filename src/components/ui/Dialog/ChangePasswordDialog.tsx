import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "../input";
import { Label } from "../label";
import PasswordInput from "../Input/PasswordInput";

export function ChangePasswordDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-mainColor">Change Password</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Change Password</AlertDialogTitle>
          <AlertDialogDescription>
            Enter your Current Password to Create a new password.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <div className="my-4">
            <Label>Current Password</Label>
            <PasswordInput placeholder={"Enter your Current Password"} />
          </div>
          <div className="my-4">
            <Label>New Password</Label>
            <PasswordInput placeholder="Enter your new Password" />
          </div>
          <div className="my-4">
            <Label>Confirm new Password</Label>
            <PasswordInput placeholder="Enter your Confirm New Password" />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-mainColor">
            Change Password
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
