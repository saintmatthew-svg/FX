import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ResponsiveLayoutProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: boolean;
}

export default function ResponsiveLayout({
  children,
  className,
  maxWidth = "xl",
  padding = true,
}: ResponsiveLayoutProps) {
  const maxWidthClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-7xl",
    "2xl": "max-w-none",
    full: "max-w-full",
  }[maxWidth];

  return (
    <div
      className={cn(
        "mx-auto w-full",
        maxWidthClass,
        padding && "px-4 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface GridLayoutProps {
  children: ReactNode;
  cols?: number;
  gap?: number;
  className?: string;
  responsive?: boolean;
}

export function GridLayout({
  children,
  cols = 1,
  gap = 6,
  className,
  responsive = true,
}: GridLayoutProps) {
  const gridClass = responsive
    ? `grid grid-cols-1 ${cols >= 2 ? "md:grid-cols-2" : ""} ${cols >= 3 ? "lg:grid-cols-3" : ""} ${cols >= 4 ? "xl:grid-cols-4" : ""}`
    : `grid grid-cols-${cols}`;

  return (
    <div className={cn(gridClass, `gap-${gap}`, className)}>{children}</div>
  );
}

interface FlexLayoutProps {
  children: ReactNode;
  direction?: "row" | "col";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  gap?: number;
  wrap?: boolean;
  className?: string;
}

export function FlexLayout({
  children,
  direction = "row",
  align = "start",
  justify = "start",
  gap = 4,
  wrap = false,
  className,
}: FlexLayoutProps) {
  return (
    <div
      className={cn(
        "flex",
        `flex-${direction}`,
        `items-${align}`,
        `justify-${justify}`,
        `gap-${gap}`,
        wrap && "flex-wrap",
        className,
      )}
    >
      {children}
    </div>
  );
}
