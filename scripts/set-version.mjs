import { readFile, writeFile } from "node:fs/promises";

const version = process.argv[2]?.replace(/^v/, "");

if (!version || !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version)) {
  throw new Error(
    "Usage: node scripts/set-version.mjs <vMAJOR.MINOR.PATCH[-PRERELEASE]>",
  );
}

const jsonFiles = ["package.json", "src-tauri/tauri.conf.json"];

for (const file of jsonFiles) {
  const path = new URL(`../${file}`, import.meta.url);
  const source = JSON.parse(await readFile(path, "utf8"));
  source.version = version;
  await writeFile(path, `${JSON.stringify(source, null, 2)}\n`);
}

const cargoPath = new URL("../src-tauri/Cargo.toml", import.meta.url);
const cargoSource = await readFile(cargoPath, "utf8");
await writeFile(
  cargoPath,
  cargoSource.replace(/^version = "[^"]+"/m, `version = "${version}"`),
);

const lockPath = new URL("../src-tauri/Cargo.lock", import.meta.url);
const lockSource = await readFile(lockPath, "utf8");
const packageMarker = 'name = "cc-switch"';
const packageIndex = lockSource.indexOf(packageMarker);

if (packageIndex === -1) {
  throw new Error("Could not locate cc-switch in src-tauri/Cargo.lock");
}

const versionIndex = lockSource.indexOf("version = ", packageIndex);
const versionEnd = lockSource.indexOf("\n", versionIndex);
const lockResult = `${lockSource.slice(0, versionIndex)}version = "${version}"${lockSource.slice(versionEnd)}`;
await writeFile(lockPath, lockResult);
