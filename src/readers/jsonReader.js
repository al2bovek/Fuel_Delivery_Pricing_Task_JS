import fs from "fs/promises";

export async function readJson(path) {
  const content =
    await fs.readFile(path, "utf8");

  return JSON.parse(content);
}