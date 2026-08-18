import { execSync } from "node:child_process";

const PORT = process.env.PORT ?? "3500";

try {
  const pids = execSync(`lsof -t -i :${PORT} 2>/dev/null`, { encoding: "utf8" }).trim();
  if (pids) {
    console.error(`\nError: A process is already using port ${PORT} (PID ${pids.replace(/\n/g, ", ")}).`);
    console.error("Stop the dev server before running build or clean:");
    console.error("  • Ctrl+C in the dev terminal, or");
    console.error("  • npm run stop:dev\n");
    console.error(
      "Running build or deleting .next while dev is active corrupts the Turbopack cache\n" +
        "and causes _buildManifest.js.tmp ENOENT errors.\n",
    );
    process.exit(1);
  }
} catch {
  // Port is free.
}
