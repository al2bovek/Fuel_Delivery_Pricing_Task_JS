import fs from "fs/promises";

export async function writeCsv(
  filePath,
  author,
  header,
  rows
) {
  const content = [
    author,
    header,
    ...rows,
  ].join("\n");

  await fs.writeFile(
    filePath,
    content,
    "utf8"
  );
}