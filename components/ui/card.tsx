import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return <div className={cn("rounded-2xl border border-white/5 bg-white/5 p-6 shadow-card", className)} {...props} />;
}

export function CardHeader({ className, ...props }: CardProps) {
  return <div className={cn("mb-4 flex items-center justify-between gap-3", className)} {...props} />;
}

export function CardTitle({ className, ...props }: CardProps) {
  return <h3 className={cn("font-display text-xl tracking-wide text-white", className)} {...props} />;
}

export function CardContent({ className, ...props }: CardProps) {
  return <div className={cn("space-y-4", className)} {...props} />;
}
