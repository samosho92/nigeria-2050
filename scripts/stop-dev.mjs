import { execSync } from "node:child_process";

const PORT = process.env.PORT ?? "3500";
const MAX_WAIT_MS = 5000;

function getPidsOnPort() {
  try {
    return execSync(`lsof -t -i :${PORT} 2>/dev/null`, { encoding: "utf8" })
      .trim()
      .split("\n")
      .filter(Boolean);
  } catch {
    return [];
  }
}

const pids = getPidsOnPort();
if (pids.length === 0) {
  process.exit(0);
}

for (const pid of pids) {
  try {
    process.kill(Number(pid), "SIGTERM");
  } catch {
    // Process may have already exited.
  }
}

const deadline = Date.now() + MAX_WAIT_MS;
while (Date.now() < deadline) {
  if (getPidsOnPort().length === 0) {
    console.log(`Stopped dev server on port ${PORT}.`);
    process.exit(0);
  }
  execSync("sleep 0.2");
}

for (const pid of getPidsOnPort()) {
  try {
    process.kill(Number(pid), "SIGKILL");
  } catch {
    // ignore
  }
}

execSync("sleep 0.2");

if (getPidsOnPort().length === 0) {
  console.log(`Stopped dev server on port ${PORT}.`);
} else {
  console.error(`Warning: could not fully stop processes on port ${PORT}.`);
  process.exit(1);
}
