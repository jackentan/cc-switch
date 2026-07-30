export interface ProviderUpstreamProxyFormConfig {
  enabled: boolean;
  url: string;
}

const SUPPORTED_PROXY_PROTOCOLS = new Set([
  "http:",
  "https:",
  "socks5:",
  "socks5h:",
]);

export function validateProviderUpstreamProxy(
  config: ProviderUpstreamProxyFormConfig,
): string | undefined {
  if (!config.enabled) return undefined;

  const url = config.url.trim();
  if (!url) {
    return "启用专属代理后请填写代理地址";
  }

  try {
    const parsed = new URL(url);
    if (!SUPPORTED_PROXY_PROTOCOLS.has(parsed.protocol)) {
      return "专属代理仅支持 http、https、socks5、socks5h";
    }
    if (!parsed.hostname) {
      return "专属代理地址缺少主机名";
    }
  } catch {
    return "专属代理地址格式不正确";
  }

  return undefined;
}

export function buildProviderUpstreamProxyConfig(
  config: ProviderUpstreamProxyFormConfig,
) {
  const url = config.url.trim();
  if (!config.enabled && !url) return undefined;

  return {
    enabled: config.enabled,
    url: url || undefined,
  };
}
export function getEnabledProviderUpstreamProxyUrl(
  config?: ProviderUpstreamProxyFormConfig,
): string | undefined {
  if (!config?.enabled) return undefined;
  return config.url.trim() || undefined;
}