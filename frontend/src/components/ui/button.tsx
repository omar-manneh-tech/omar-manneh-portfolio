import * as React from "react";
import { clsx } from "clsx";
import { Slot } from "@radix-ui/react-slot";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={clsx(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500":
              variant === "primary",
            "bg-secondary-100 text-secondary-900 hover:bg-secondary-200 focus:ring-secondary-500":
              variant === "secondary",
            "border border-secondary-300 bg-white text-secondary-700 hover:bg-secondary-50 focus:ring-secondary-500":
              variant === "outline",
            "hover:bg-secondary-100 text-secondary-700 focus:ring-secondary-500":
              variant === "ghost",
            "px-3 py-1.5 text-sm": size === "sm",
            "px-4 py-2 text-sm": size === "md",
            "px-6 py-3 text-base": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };

