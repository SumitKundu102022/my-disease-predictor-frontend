import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          variant === "default" && "bg-blue-500 text-white hover:bg-blue-600",
          variant === "secondary" &&
            "bg-gray-100 text-gray-800 hover:bg-gray-200",
          variant === "outline" &&
            "border border-gray-300 text-gray-800 hover:bg-gray-50",
          variant === "ghost" && "text-gray-800 hover:bg-gray-100",
          variant === "destructive" && "bg-red-500 text-white hover:bg-red-600",
          variant === "link" && "text-blue-500 hover:underline",
          size === "default" && "px-4 py-2",
          size === "sm" && "px-3 py-1.5 text-xs",
          size === "lg" && "px-6 py-3 text-base",
          size === "icon" && "p-2 rounded-full",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export default Button;
