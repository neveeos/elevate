// KHS Elevate: shared helpers. Courses, registrations and payments live in the
// Kulsoom Hassan School system; this site reads and writes through its API.

export const API = 'https://www.kulsoomhassanschool.com';
export const WHATSAPP = '923167420006';
export const PHONE_DISPLAY = '+92 316 7420006';

export const whatsapp = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

export const pkr = (n) =>
  n == null || n === '' ? '' : 'PKR ' + Number(n).toLocaleString('en-US', { maximumFractionDigits: 2 });

export const usd = (n) =>
  n == null || n === '' ? '' : 'US$' + Number(n).toLocaleString('en-US', { maximumFractionDigits: 2 });

/** The price to show: US dollars where the course page sets one, otherwise the PKR fee. */
export function priceText(course, fee, content) {
  if (course.coming_soon) return 'Coming soon';
  if (content?.priceUsd) return usd(content.priceUsd);
  return fee ? pkr(fee) : 'Fee to be announced';
}

export function formatDate(iso) {
  if (!iso) return 'To be announced';
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso + 'T00:00:00Z'));
}

/** Escape text before putting it into HTML. */
export const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** Fee after the course's own discount, as the school calculates it. */
export function courseFee(course, batch) {
  const base = batch && batch.fee_override != null ? Number(batch.fee_override) : Number(course.fee_amount);
  if (!(base > 0)) return null;
  const pct = Number(course.discount_percent) || 0;
  return Math.round(base * (100 - pct)) / 100;
}

/** Whole-rupee instalments, the first taking any remainder (same rule as the school). */
export function instalmentSplit(total, count) {
  if (count <= 1) return [total];
  const each = Math.floor(total / count);
  const first = Math.round((total - each * (count - 1)) * 100) / 100;
  return [first, ...Array(count - 1).fill(each)];
}

let catalog;
/** Published Elevate courses, intakes, teachers, bank accounts and terms. */
export function loadCatalog() {
  catalog ||= fetch(API + '/api/elevate/catalog', { headers: { Accept: 'application/json' } }).then((r) => {
    if (!r.ok) throw new Error('Courses could not be loaded.');
    return r.json();
  });
  return catalog;
}

/** The intake to show for a course: the soonest one taking registrations, else the soonest one. */
export function nextBatch(course, batches) {
  const list = batches.filter((b) => b.course_id === course.id);
  return list.find((b) => b.open_for_registration) || list[0] || null;
}

export function year() {
  for (const el of document.querySelectorAll('[data-year]')) el.textContent = String(new Date().getFullYear());
}

/** Send an event to Google Tag Manager (GA4 and the Meta pixel are configured there). */
export function track(event, params = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  metaEvent(event, params);
}

// The same moments as standard Meta events, with value and currency where there is a price.
const META_EVENTS = { view_course: 'ViewContent', begin_registration: 'InitiateCheckout', complete_registration: 'CompleteRegistration', contact: 'Contact' };
function metaEvent(event, p) {
  const name = META_EVENTS[event];
  if (!name || typeof window.fbq !== 'function') return;
  const data = { content_type: 'product' };
  if (p.course_id) data.content_ids = [p.course_id];
  if (p.course_name) data.content_name = p.course_name;
  if (p.value > 0) { data.value = Number(p.value); data.currency = p.currency || 'PKR'; }
  try { window.fbq('track', name, data, p.event_id ? { eventID: p.event_id } : undefined); } catch { /* never block the page */ }
}

// Remember where the visitor first came from (ad tags and click IDs) for this visit,
// so a registration made a few pages later is still credited to the ad.
const ATTR_KEY = 'elevate_attribution';
const ATTR_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'];
try {
  const q = new URLSearchParams(location.search);
  if (ATTR_PARAMS.some((k) => q.get(k)) && !sessionStorage.getItem(ATTR_KEY)) {
    const first = { landing_page: location.href.slice(0, 500), referrer: document.referrer.slice(0, 500) };
    for (const k of ATTR_PARAMS) if (q.get(k)) first[k] = q.get(k).slice(0, 200);
    sessionStorage.setItem(ATTR_KEY, JSON.stringify(first));
  }
} catch { /* storage unavailable */ }

/** UTM tags, landing page and Meta browser IDs, sent with a registration. */
export function attribution() {
  let out = {};
  try { out = JSON.parse(sessionStorage.getItem(ATTR_KEY) || '{}'); } catch { out = {}; }
  if (!out.landing_page) out = { landing_page: location.href.slice(0, 500), referrer: document.referrer.slice(0, 500) };
  const cookies = Object.fromEntries(document.cookie.split('; ').filter(Boolean).map((c) => [c.split('=')[0], decodeURIComponent(c.split('=').slice(1).join('='))]));
  if (cookies._fbp) out.fbp = cookies._fbp;
  if (cookies._fbc) out.fbc = cookies._fbc;
  else if (out.fbclid) out.fbc = `fb.1.${Date.now()}.${out.fbclid}`;
  if (!out.utm_source) out.utm_source = 'elevate';
  return out;
}

// WhatsApp and phone taps, for GA4 and the Meta pixel (as a Contact).
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="https://wa.me"], a[href^="tel:"]');
  if (a) track('contact', { method: a.href.startsWith('tel:') ? 'phone' : 'whatsapp' });
});
