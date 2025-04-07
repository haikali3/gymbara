import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  // "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-satoshi transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  "inline-flex items-center rounded-full border text-sm font-bold font-satoshi transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // 🔥 Glowing style (new default)
        default:
          "px-4 py-1 text-white border border-white/80 bg-gradient-to-r from-[#FF512F] to-[#DD2476] shadow-[0_4px_20px_rgba(255,72,0,0.5)]",

        secondary:
          "px-3 py-1 border bg-gray-100 text-gray-800 hover:bg-gray-200",

        destructive: "px-3 py-1 border bg-red-500 text-white hover:bg-red-600",

        outline:
          "px-3 py-1 border border-gray-300 text-gray-800 bg-transparent hover:bg-gray-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
