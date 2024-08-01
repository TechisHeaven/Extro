"use client";
import { Copy, CopyCheck } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const TextCopyComponent = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  //handle string content hidding of string content
  function SpliceWalletAddress(string: string) {
    const concatString = "*".repeat(string.length / 5);
    string =
      string.substring(0, string.length / 5).concat(concatString) +
      string.substring((string.length / 5) * 4, string.length);
    return string;
  }
  //handle copy string or text function
  function handleCopyText() {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast.success("Text Copied Successfully!");

    const isCopiedTimeout = setTimeout(() => {
      setIsCopied(false);
    }, 2000);

    return () => {
      clearTimeout(isCopiedTimeout);
    };
  }
  return (
    <div className="inline-flex items-center gap-2">
      <p className="text-sm truncate max-w-60 w-fit ">
        {SpliceWalletAddress(text)}
      </p>
      <div
        onClick={handleCopyText}
        className="p-1 rounded-md transition-colors aspect-square cursor-pointer hover:bg-gray-200"
      >
        {isCopied ? (
          <CopyCheck className="w-4 h-4" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </div>
    </div>
  );
};

export default TextCopyComponent;
