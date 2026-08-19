import { useManagedAuth } from "./useManagedAuth";

/** xAI OAuth device-code authentication hook. */
export function useXaiOauth(upstreamProxyUrl?: string) {
  return useManagedAuth("xai_oauth", undefined, upstreamProxyUrl);
}
