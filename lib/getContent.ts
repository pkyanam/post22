import fs from "fs";
import path from "path";

export function getContent(slug: string): string {
  const filePath = path.join(process.cwd(), "content", `${slug}.md`);
  return fs.readFileSync(filePath, "utf8");
}
