import { readFile, writeFile } from "node:fs/promises";

const repository = "jackentan/cc-switch";
const updaterPublicKey =
  "dW50cnVzdGVkIGNvbW1lbnQ6IG1pbmlzaWduIHB1YmxpYyBrZXk6IDFEN0NGQjY3ODUwMzExOEYKUldTUEVRT0ZaL3Q4SGVnNVFBK0paWUZuYlpCL2pPUFU5ZnlpM1hTRCtnNU8wUU5xMXFtZ1EwTlYK";

for (const file of ["src-tauri/Cargo.toml"]) {
  const path = new URL(`../${file}`, import.meta.url);
  const source = await readFile(path, "utf8");
  const result = source.replaceAll("farion1231/cc-switch", repository);
  if (result !== source) {
    await writeFile(path, result);
  }
}

const tauriPath = new URL("../src-tauri/tauri.conf.json", import.meta.url);
const tauriSource = await readFile(tauriPath, "utf8");
let tauriResult = tauriSource.replaceAll("farion1231/cc-switch", repository);
const tauriConfig = JSON.parse(tauriResult);
const currentPublicKey = tauriConfig.plugins?.updater?.pubkey;

if (typeof currentPublicKey !== "string") {
  throw new Error("Tauri updater public key is missing");
}

tauriResult = tauriResult.replace(
  JSON.stringify(currentPublicKey),
  JSON.stringify(updaterPublicKey),
);

const expectedEndpoint = `https://github.com/${repository}/releases/latest/download/latest.json`;
const resultConfig = JSON.parse(tauriResult);
if (resultConfig.plugins.updater.pubkey !== updaterPublicKey) {
  throw new Error("Could not restore the Jackentan updater public key");
}
if (!resultConfig.plugins.updater.endpoints?.includes(expectedEndpoint)) {
  throw new Error("Could not restore the Jackentan updater endpoint");
}

if (tauriResult !== tauriSource) {
  await writeFile(tauriPath, tauriResult);
}
