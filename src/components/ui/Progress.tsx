import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  className?: string;
  color?: "blue" | "green" | "red";
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, className, color = "blue", ...props }, ref) => {
    const progressColor =
      color === "blue"
        ? "bg-blue-500"
        : color === "green"
        ? "bg-green-500"
        : "bg-red-500";

    return (
      <div
        className={cn(
          "w-full h-2 bg-gray-200 rounded-full relative",
          className
        )}
        ref={ref}
        {...props}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            progressColor
          )}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    );
  }
);
Progress.displayName = "Progress";

export default Progress;
