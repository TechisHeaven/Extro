import { Bell } from "lucide-react";
import React from "react";
import CustomAvatar from "../CustomAvatar";

const Header = () => {
  return (
    <div className="inline-flex items-center gap-4 justify-end w-full p-2 px-4 border-b-2">
      <div className="notification relative">
        <Bell />
        <div className="absolute right-0 top-0 w-2 h-2 bg-red-500 rounded-full"></div>
      </div>
      <CustomAvatar ImageUrl="https://github.com/shadcn.png" alt="Test User" />
    </div>
  );
};

export default Header;
