import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6 shadow-sm",
        hover && "transition-shadow hover:shadow-md dark:hover:shadow-teal-900/10",
        className
      )}
    >
      {children}
    </div>
  );
}
