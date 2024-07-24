// SpinnerLoader.tsx
import React from "react";

interface SpinnerLoaderProps {
  size?: "small" | "medium" | "large";
  color?: string;
}

const sizeClasses = {
  small: "w-8 h-8 border-2",
  medium: "w-16 h-16 border-4",
  large: "w-24 h-24 border-8",
};

const SpinnerLoader: React.FC<SpinnerLoaderProps> = ({
  size = "medium",
  color = "border-blue-500",
}) => {
  return (
    <div className={`flex justify-center items-center h-full`}>
      <div
        className={`${sizeClasses[size]} border-t-transparent border-solid rounded-full animate-spin ${color}`}
      ></div>
    </div>
  );
};

export default SpinnerLoader;
