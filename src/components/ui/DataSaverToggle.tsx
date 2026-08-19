"use client";

import { IconBoltOff } from "@tabler/icons-react";
import { Button } from "@/components/ui/Button";
import { useDataSaver } from "@/components/providers/DataSaverProvider";
import { trackEvent } from "@/lib/analytics";

export function DataSaverToggle() {
  const { enabled, toggle } = useDataSaver();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={enabled ? "Disable data saver mode" : "Enable data saver mode"}
      aria-pressed={enabled}
      onClick={() => {
        const next = !enabled;
        toggle();
        trackEvent({ name: "data_saver_toggle", enabled: next });
      }}
      title="Data saver, reduces animations and heavy visuals"
    >
      <IconBoltOff
        className={enabled ? "size-5 text-accent" : "size-5"}
        stroke={1.5}
      />
    </Button>
  );
}
