"use client";

import { IconBoltOff } from "@tabler/icons-react";
import { Button } from "@/components/ui/Button";
import { useDataSaver } from "@/components/providers/DataSaverProvider";

export function DataSaverToggle() {
  const { enabled, toggle } = useDataSaver();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={enabled ? "Disable data saver mode" : "Enable data saver mode"}
      aria-pressed={enabled}
      onClick={toggle}
      title="Data saver, reduces animations and heavy visuals"
    >
      <IconBoltOff
        className={enabled ? "size-5 text-accent" : "size-5"}
        stroke={1.5}
      />
    </Button>
  );
}
