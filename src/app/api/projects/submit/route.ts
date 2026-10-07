import { jsonError } from "@/lib/security";

export const runtime = "nodejs";

/** Reader idea submissions are paused until a later release. Form UI is also hidden. */
export async function POST() {
  return jsonError("Idea submissions are paused for now.", 503);
}
