import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/Card";

interface PlaceholderPanelProps {
  children: ReactNode;
}

export function PlaceholderPanel({ children }: PlaceholderPanelProps) {
  return (
    <Card className="mt-12 border-dashed">
      <CardContent className="pt-6 text-muted-foreground">{children}</CardContent>
    </Card>
  );
}
