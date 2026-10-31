/** Campaign labels only: never persist arbitrary query strings or customer data. */
const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
const STORAGE_KEY = 'presso_campaign_v1';
const MAX_AGE = 30 * 24 * 60 * 60 * 1000;

export function campaignFromSearch(search: string): string {
  const input = new URLSearchParams(search);
  const output = new URLSearchParams();
  for (const key of KEYS) {
    const value = input.get(key)?.trim();
    // Campaign naming convention: labels, not emails, phone numbers or URLs.
    if (value && value.length <= 120 && /^[a-zA-Z0-9_ .-]+$/.test(value) && !/\d{8,}/.test(value)) output.set(key, value);
  }
  return output.toString();
}

export function readCampaign(): string {
  if (typeof window === 'undefined') return '';
  const current = campaignFromSearch(window.location.search);
  try {
    if (current) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ value: current, at: Date.now() }));
      return current;
    }
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null');
    if (saved && typeof saved.at === 'number' && Date.now() >= saved.at && Date.now() - saved.at < MAX_AGE && typeof saved.value === 'string') return campaignFromSearch(saved.value);
    window.localStorage.removeItem(STORAGE_KEY);
  } catch { /* Storage can be unavailable; current campaign still works. */ }
  return current;
}

/** Preserve only campaign labels inside Google Play's install-referrer parameter. */
export function attributedPlayUrl(href: string, campaign: string): string {
  try {
    const url = new URL(href);
    if (url.origin !== 'https://play.google.com' || url.pathname !== '/store/apps/details' || url.searchParams.get('id') !== 'com.presso.presso_app') return href;
    const safe = campaignFromSearch(campaign);
    if (safe) url.searchParams.set('referrer', safe);
    else url.searchParams.delete('referrer');
    return url.toString();
  } catch { return href; }
}

/** Apple aggregate campaign reporting; does not pass campaign identity into iOS. */
export function attributedAppleUrl(href: string, campaign: string, providerToken: string): string {
  try {
    const url = new URL(href);
    if (url.origin !== 'https://apps.apple.com' || !url.pathname.endsWith('/id6780192938') || !/^\d+$/.test(providerToken)) return href;
    const labels = new URLSearchParams(campaignFromSearch(campaign));
    const token = [labels.get('utm_source'), labels.get('utm_medium'), labels.get('utm_campaign')].filter(Boolean).join('_');
    // Never silently truncate distinct campaigns into the same Apple token.
    if (!token || token.length > 30) return href;
    url.searchParams.set('pt', providerToken);
    url.searchParams.set('ct', token);
    url.searchParams.set('mt', '8');
    return url.toString();
  } catch { return href; }
}
