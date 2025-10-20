//TSX code
"use client";
import RippleButtonV1 from "@/devvarena-ui/button/ripple-button/v1/component";
import { cn } from "@/utils";
import React, { useState } from "react";

type ClipboardProps = {
  textClip: string;
  setCopy?: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  beforeCopy?: React.ReactNode;
  afterCopy?: React.ReactNode;
};

const CopyCli = ({
  textClip,
  beforeCopy = "Copy",
  afterCopy = "Copied",
  className,
}: ClipboardProps) => {
  const [copy, setCopy] = useState(false);
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textClip);
      if (setCopy) {
        setCopy(true);
        setTimeout(() => setCopy(false), 1000); // Reset copied state after 1 seconds
      }
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <RippleButtonV1
      onClick={copyToClipboard}
      className={cn(
        "aspect-square text-primary h-8 !bg-transparent",
        className
      )}
    >
      {copy ? afterCopy : beforeCopy}
    </RippleButtonV1>
  );
};

export default CopyCli;
