import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "inset";
};

export function GlassPanel({ children, className, variant = "default" }: GlassPanelProps) {
  return (
    <div
      className={cn(
        variant === "inset" ? "glass-inset" : "glass-panel",
        className
      )}
    >
      {children}
    </div>
  );
}
