export async function extractFeatures(url) {
  const features = [];

  let domain = "";
  let html = "";

  try {
    domain = new URL(url).hostname;

    const response = await fetch(url);
    html = await response.text();
  } catch {
    domain = "";
    html = "";
  }

  // 1 Using IP
  const ipRegex = /(\d{1,3}\.){3}\d{1,3}/;
  features.push(ipRegex.test(url) ? -1 : 1);

  // 2 Long URL
  features.push(url.length >= 75 ? -1 : 1);

  // 3 Short URL
  const shorteners = ["bit.ly", "goo.gl", "tinyurl", "ow.ly", "t.co"];
  features.push(shorteners.some((s) => url.includes(s)) ? -1 : 1);

  // 4 @ symbol
  features.push(url.includes("@") ? -1 : 1);

  // 5 redirect //
  features.push((url.match(/\/\//g) || []).length > 1 ? -1 : 1);

  // 6 dash in domain
  features.push(domain.includes("-") ? -1 : 1);

  // 7 subdomains
  const dots = domain.split(".");
  if (dots.length <= 2) features.push(1);
  else if (dots.length === 3) features.push(0);
  else features.push(-1);

  // 8 HTTPS
  features.push(url.startsWith("https") ? 1 : -1);

  // 9 DomainRegLen placeholder
  features.push(-1);

  // 10 Favicon
  features.push(html.includes("icon") ? 1 : -1);

  // 11 NonStdPort
  try {
    const port = new URL(url).port;
    features.push(port && port !== "80" && port !== "443" ? -1 : 1);
  } catch {
    features.push(-1);
  }

  // 12 HTTPSDomainURL
  features.push(domain.includes("https") ? -1 : 1);

  // 13 RequestURL
  features.push(html.includes("<img") || html.includes("<iframe") ? 0 : 1);

  // 14 AnchorURL
  features.push(html.includes("<a") ? 1 : -1);

  // 15 LinksInScriptTags
  features.push(html.includes("<script") ? 1 : -1);

  // 16 ServerFormHandler
  features.push(html.includes("<form") ? 0 : 1);

  // 17 InfoEmail
  features.push(html.includes("mailto") ? -1 : 1);

  // 18 AbnormalURL placeholder
  features.push(-1);

  // 19 WebsiteForwarding
  features.push(html.includes("window.location") ? -1 : 1);

  // 20 StatusBarCust
  features.push(html.includes("window.status") ? -1 : 1);

  // 21 DisableRightClick
  features.push(html.includes("event.button==2") ? -1 : 1);

  // 22 UsingPopupWindow
  features.push(html.includes("alert(") ? -1 : 1);

  // 23 IframeRedirection
  features.push(html.includes("<iframe") ? -1 : 1);

  // 24 AgeofDomain placeholder
  features.push(-1);

  // 25 DNSRecording placeholder
  features.push(-1);

  // 26 WebsiteTraffic placeholder
  features.push(-1);

  // 27 PageRank placeholder
  features.push(-1);

  // 28 GoogleIndex
  features.push(html.includes("google") ? 1 : -1);

  // 29 LinksPointingToPage placeholder
  features.push(-1);

  // 30 StatsReport placeholder
  features.push(-1);

  return features;
}
