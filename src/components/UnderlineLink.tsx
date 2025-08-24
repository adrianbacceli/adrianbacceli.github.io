// components/UnderlineLink.tsx
import React from "react";
import { cn } from "@/lib/cn"; // optional helper shown below

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  underline?: boolean;   // toggle underline animation
};

export default function UnderlineLink({ className, underline = true, children, ...props }: Props) {
  return (
    <a
      {...props}
      className={cn(
        "relative inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600",
        underline &&
          // neutral text, but gold underline on hover
          "after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-full after:bg-gold after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:bg-gold",
        className
      )}
    >
      {children}
    </a>
  );
}
