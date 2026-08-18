"use client";

import { useEffect, useState } from "react";

/** Returns false on SSR and first client paint, true after mount. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
