// KHS Elevate: shared helpers. Courses, registrations and payments live in the
// Kulsoom Hassan School system; this site reads and writes through its API.

export const API = 'https://www.kulsoomhassanschool.com';
export const WHATSAPP = '923167420006';
export const PHONE_DISPLAY = '+92 316 7420006';

export const whatsapp = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

export const pkr = (n) =>
  n == null || n === '' ? '' : 'PKR ' + Number(n).toLocaleString('en-US', { maximumFractionDigits: 2 });

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
