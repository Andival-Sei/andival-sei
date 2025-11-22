import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/src/shared/lib/utils";

export type SectionProps = HTMLAttributes<HTMLElement>;

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("container py-24 md:py-32", className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";
