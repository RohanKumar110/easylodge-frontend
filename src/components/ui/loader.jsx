import React from "react";
import Icon from "./icon";
import { cn, getAssetPath } from "@/lib/utils";

function LoadingBar({ className, ...props }) {
  return (
    <div
      className={cn(
        "h-1 w-full rounded-full overflow-hidden before:absolute relative before:h-full before:bg-[#5329FF] before:bottom-0 before:top-0 before:left-0 bg-blue-200 before:animate-loading-bar",
        className
      )}
      {...props}
    />
  );
}

function AppLoader() {
  return (
    <div className="flex items-center justify-center absolute inset-0 bg-white z-10">
      <div className="flex flex-col items-center w-full gap-8 max-w-52">
        <img
          width={50}
          height={50}
          src={getAssetPath("easylodge-logo.png")}
          alt="logo"
        />
        <LoadingBar />
      </div>
    </div>
  );
}

function LoadingSpinner({ containerClassName, className }) {
  return (
    <div
      className={cn(
        `flex items-center justify-center min-h-screen`,
        containerClassName
      )}>
      <Icon
        icon="spinner"
        strokeWidth={2.5}
        size={32}
        className={cn("animate-spin text-brand", className)}
      />
    </div>
  );
}

export { LoadingSpinner, AppLoader };