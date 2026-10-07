import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";

interface LinkButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "link";
  className?: string;
  onClick?: () => void;
}

const linkVariantMap = {
  primary: buttonVariants({ variant: "primary" }),
  secondary: buttonVariants({ variant: "secondary" }),
  link: buttonVariants({ variant: "link", size: "sm" }),
};

export function LinkButton({
  href,
  children,
  variant = "primary",
  className,
  onClick,
}: LinkButtonProps) {
  return (
    <Link href={href} onClick={onClick} className={cn(linkVariantMap[variant], className)}>
      {children}
    </Link>
  );
}
