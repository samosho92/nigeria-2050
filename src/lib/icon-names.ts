export function iconShortName(name: string): string {
  const nick = name.match(/\(([^)]+)\)/);
  if (nick?.[1]) return nick[1];
  return name.replace(/\s*\([^)]*\)/g, "").trim();
}

export function iconInitials(name: string): string {
  const parts = name
    .replaceAll(/[()‘’']/g, " ")
    .split(/\s+/)
    .filter((part) => part && !/^(of|the|alhaja|sir|lady|dr|chief)$/i.test(part));
  const letters = parts
    .filter((part) => /^[\p{L}]/u.test(part))
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "");
  return letters.join("") || name.slice(0, 2).toUpperCase();
}
