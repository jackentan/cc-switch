import { readFile, writeFile } from "node:fs/promises";

const files = ["src-tauri/Cargo.toml", "src-tauri/tauri.conf.json"];

for (const file of files) {
  const path = new URL(`../${file}`, import.meta.url);
  const source = await readFile(path, "utf8");
  const result = source.replaceAll(
    "farion1231/cc-switch",
    "jackentan/cc-switch",
  );
  if (result !== source) {
    await writeFile(path, result);
  }
}
