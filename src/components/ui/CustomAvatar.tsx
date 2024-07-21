import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface CustomAvatarProps {
  alt: string;
  ImageUrl: string;
}

const CustomAvatar = ({ alt, ImageUrl }: CustomAvatarProps) => {
  const SplittedText = alt.split(" ");
  const fallbackText =
    SplittedText.length <= 1
      ? `${SplittedText[0][0]}`
      : `${SplittedText[0][0]}${SplittedText[1][0]}`;
  return (
    <Avatar>
      <AvatarImage alt={alt} src={ImageUrl} />
      <AvatarFallback className="bg-mainColor text-white">
        {fallbackText}
      </AvatarFallback>
    </Avatar>
  );
};

export default CustomAvatar;
