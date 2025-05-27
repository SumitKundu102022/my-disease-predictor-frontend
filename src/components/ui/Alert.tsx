import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive";
  title?: string;
  description?: string;
  className?: string;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    { className, variant = "default", title, description, children, ...props },
    ref
  ) => {
    const baseClasses = "relative w-full rounded-md border p-4";
    const variantClasses =
      variant === "destructive"
        ? "bg-red-50 text-red-800 border-red-200"
        : "bg-blue-50 text-blue-800 border-blue-200";
    const iconColor =
      variant === "destructive" ? "text-red-400" : "text-blue-400";

    return (
      <div
        ref={ref}
        className={cn(baseClasses, variantClasses, className)}
        role="alert"
        {...props}
      >
        <AlertCircle
          className={cn("h-4 w-4 absolute left-4 top-4", iconColor)}
        />
        <div className="ml-10">
          {title &&
            (typeof title === "string" ? (
              <h4 className="text-sm font-semibold">{title}</h4>
            ) : (
              <div className="text-sm font-semibold">{title}</div>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p className="mt-1 text-sm">{description}</p>
            ) : (
              <div className="mt-1 text-sm">{description}</div>
            ))}
          {children}
        </div>
      </div>
    );
  }
);
Alert.displayName = "Alert";

export const AlertTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => {
  return (
    <h3 ref={ref} className={cn("text-lg font-semibold", className)} {...props}>
      {children}
    </h3>
  );
});
AlertTitle.displayName = "AlertTitle";

export const AlertDescription = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("text-sm", className)} {...props}>
      {children}
    </div>
  );
});
AlertDescription.displayName = "AlertDescription";
