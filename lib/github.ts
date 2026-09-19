import { repository } from "./site";

function isValidSourcePath(sourcePath: string): boolean {
  if (!sourcePath.startsWith("content/") || sourcePath.includes("\\") || sourcePath.includes("\0") || sourcePath.includes("://")) return false;

  const segments = sourcePath.split("/");
  return segments.length > 1
    && segments.every((segment) => segment && segment !== "." && segment !== ".." && !segment.includes(":"))
    && segments.at(-1)?.toLowerCase().endsWith(".md") === true;
}

export function getGithubEditUrl(sourcePath: string | null | undefined): string | null {
  if (typeof sourcePath !== "string" || !isValidSourcePath(sourcePath)) return null;

  const encodedPath = sourcePath.split("/").map((segment) => encodeURIComponent(segment)).join("/");
  return `https://github.com/${repository.owner}/${repository.name}/edit/${encodeURIComponent(repository.branch)}/${encodedPath}`;
}
