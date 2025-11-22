import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/src/shared/lib/utils";

export type CardProps = HTMLAttributes<HTMLDivElement>;

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-card text-card-foreground rounded-lg border shadow-sm",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";
