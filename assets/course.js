import { API, loadCatalog, courseFee, instalmentSplit, pkr, formatDate, esc, whatsapp, year, track, attribution } from './common.js';
import { contentFor, courseIdForSlug, coursePath } from './course-content.js';

year();
function wireWhatsapp(root = document) {
  for (const a of root.querySelectorAll('[data-whatsapp]')) {
    a.href = whatsapp(a.dataset.whatsapp);
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  }
}
wireWhatsapp();

// /courses/<slug> (readable address) or /course?id=<id>.
const slugMatch = location.pathname.match(/^\/courses\/([a-z0-9-]+)\/?$/);
const id = (slugMatch ? courseIdForSlug(slugMatch[1]) : new URLSearchParams(location.search).get('id')) || '';
const head = document.getElementById('course-head');
const body = document.getElementById('course-body');
const summary = document.getElementById('course-summary');
const area = document.getElementById('register-area');
const lines = (text) => String(text || '').split('\n').map((l) => l.trim()).filter(Boolean);
const todayPk = () => new Date(Date.now() + 5 * 3600_000).toISOString().slice(0, 10);

function notFound() {
  document.title = 'Course not found | KHS Elevate';
  head.innerHTML = '<h1>This course is not available.</h1><p class="subtitle">It may have finished or not opened yet.</p>';
  body.innerHTML = '<p><a class="button dark" href="/#courses">See all courses</a></p>';
  summary.remove();
  area.innerHTML = '<p class="muted">Choose a course from the course list to register.</p>';
}

function render({ courses, batches, teachers, accounts, terms }) {
  const course = courses.find((c) => c.id === id);
  if (!course) return notFound();
  const intakes = batches.filter((b) => b.course_id === course.id);
  const open = intakes.filter((b) => b.open_for_registration);
  const first = open[0] || intakes[0] || null;
  const teacher = teachers.find((t) => t.id === first?.instructor_id);
  const fee = courseFee(course, first);

  const content = contentFor(course.id);
  const title = content?.title || course.title;
  const tagline = content?.tagline || course.subtitle || '';
  document.title = `${title} | KHS Elevate`;
  const dock = document.getElementById('dock-wa');
  if (dock) dock.href = whatsapp(`Assalam o Alaikum KHS Elevate, I would like to ask about the ${title} course.`);
  document.querySelector('meta[name="description"]').content = (tagline || course.description || '').slice(0, 160);
  if (content && !slugMatch) history.replaceState(null, '', coursePath(course) + location.hash);
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href = location.origin + coursePath(course);

  const registerCta = open.length
    ? '<a class="button" href="#register">Register now</a>'
    : `<a class="button" href="#" data-whatsapp="Assalam o Alaikum KHS Elevate, please tell me when registration opens for ${esc(title)}.">Ask about the next intake</a>`;
  const outlineLink = (cls) => content?.outline ? `<a class="button ${cls}" href="${esc(content.outline.href)}" download>Download course outline</a>` : '';
  const feeText = course.coming_soon ? 'Coming soon' : fee ? pkr(fee) : 'Fee to be announced';

  head.innerHTML = content ? `
    <p class="kicker">${esc(content.kicker)}</p>
    <h1>${esc(title)}</h1>
    ${tagline ? `<p class="subtitle">${esc(tagline)}</p>` : ''}
    <dl class="glance">
      <div><dt>Starts</dt><dd>${first ? formatDate(first.start_date) : 'To be announced'}</dd></div>
      ${content.glance.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}
      <div><dt>Fee</dt><dd>${feeText}</dd></div>
    </dl>
    <div class="actions">${registerCta}${outlineLink('ghost')}</div>` : `
    <h1>${esc(title)}</h1>
    ${tagline ? `<p class="subtitle">${esc(tagline)}</p>` : ''}`;
  wireWhatsapp(head);

  body.innerHTML = content ? richBody(content, course, first) : plainBody(course, teacher);

  summary.innerHTML = `
    <div class="fee">${feeText}</div>
    <dl class="facts" style="margin-top:16px">
      <div><dt>Starts</dt><dd>${first ? formatDate(first.start_date) : 'To be announced'}</dd></div>
      ${first?.schedule ? `<div><dt>Class days</dt><dd>${esc(first.schedule)}</dd></div>` : ''}
      ${course.duration ? `<div><dt>Length</dt><dd>${esc(course.duration)}</dd></div>` : ''}
      <div><dt>Format</dt><dd>${esc(first?.format || 'Live online')}</dd></div>
      ${content?.instructor ? `<div><dt>Instructor</dt><dd>${esc(content.instructor.name)}</dd></div>` : ''}
      ${course.instalments_max > 1 ? `<div><dt>Payment</dt><dd>Up to ${course.instalments_max} instalments</dd></div>` : ''}
    </dl>
    ${registerCta}
    ${content?.outline ? `<a class="outline-link" href="${esc(content.outline.href)}" download>${esc(content.outline.label)}</a>` : ''}`;
  wireWhatsapp(summary);
  if (content) structuredData(content, course, first, fee);
  track('view_course', { course_id: course.id, course_name: title, value: fee || undefined, currency: 'PKR' });
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[download]');
    if (a) track('download_outline', { course_id: course.id, course_name: title });
  });

  if (!open.length) {
    area.innerHTML = `<p class="muted">Registration for this course is not open yet.</p><p><a class="button dark" href="#" data-whatsapp="Assalam o Alaikum KHS Elevate, please tell me when registration opens for ${esc(course.title)}.">Ask on WhatsApp</a></p>`;
    wireWhatsapp(area);
    return;
  }
  form(course, open, accounts, terms);
}

function plainBody(course, teacher) {
  const outcomes = lines(course.outcomes);
  const reqs = lines(course.entry_requirements);
  return `
    <h2>About the course</h2>
    ${lines(course.description).map((p) => `<p>${esc(p)}</p>`).join('')}
    ${outcomes.length ? `<h2>What you will be able to do</h2><ul>${outcomes.map((o) => `<li>${esc(o)}</li>`).join('')}</ul>` : ''}
    ${reqs.length ? `<h2>Before you join</h2><ul>${reqs.map((o) => `<li>${esc(o)}</li>`).join('')}</ul>` : ''}
    ${teacher ? `<h2>Your teacher</h2><p><strong>${esc(teacher.name)}</strong>${teacher.specialty ? ` · ${esc(teacher.specialty)}` : ''}</p>${teacher.bio ? `<p class="muted">${esc(teacher.bio)}</p>` : ''}` : ''}
    <h2>How classes work</h2>
    <p>Classes are live online on Zoom at the times below (Pakistan time). You need a computer and a stable internet connection. You receive the class link by e-mail once your registration is confirmed.</p>`;
}

function richBody(c, course, first) {
  const t = c.instructor;
  let n = 0;
  return `
    <section class="block" aria-labelledby="overview">
      <h2 id="overview">Overview</h2>
      ${c.overview.map((p) => `<p>${esc(p)}</p>`).join('')}
    </section>

    <section class="block" aria-labelledby="who">
      <h2 id="who">Who it is for</h2>
      <div class="audience">${c.audience.map(([h, p]) => `<div><strong>${esc(h)}</strong><span>${esc(p)}</span></div>`).join('')}</div>
    </section>

    <section class="block" aria-labelledby="how">
      <h2 id="how">How every class runs</h2>
      <div class="split" role="img" aria-label="Each 90-minute class: 30 minutes of frameworks, 60 minutes of live execution">
        ${c.split.map(([k, v], i) => `<div class="split-part ${i ? 'do' : 'learn'}"><strong>${esc(k)}</strong><span>${esc(v)}</span></div>`).join('')}
      </div>
      <p class="muted small">Classes are live online (Pakistan time). You receive the class link by e-mail once your registration is confirmed.</p>
    </section>

    <section class="block" aria-labelledby="curriculum">
      <div class="block-head"><h2 id="curriculum">Curriculum</h2>${c.outline ? `<a class="plain" href="${esc(c.outline.href)}" download>Download the outline (PDF)</a>` : ''}</div>
      <ol class="weeks">
        ${c.weeks.map((w, i) => `
          <li>
            <details${i === 0 ? ' open' : ''}>
              <summary><span class="week-no">Week ${i + 1}</span><span class="week-title">${esc(w.title)}</span></summary>
              <p>${esc(w.summary)}</p>
              <div class="week-grid">
                <div><h3>Sessions</h3><ul class="sessions">${w.sessions.map((x) => `<li><span>Session ${++n}</span>${esc(x)}</li>`).join('')}</ul></div>
                <div><h3>You will produce</h3><ul class="deliverables">${w.deliverables.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
              </div>
            </details>
          </li>`).join('')}
      </ol>
    </section>

    <section class="block" aria-labelledby="leave">
      <h2 id="leave">What you leave with</h2>
      <div class="includes">${c.includes.map(([h, p]) => `<div><strong>${esc(h)}</strong><span>${esc(p)}</span></div>`).join('')}</div>
    </section>

    ${t ? `
    <section class="block" aria-labelledby="instructor">
      <h2 id="instructor">Your instructor</h2>
      <article class="instructor">
        <div class="monogram" aria-hidden="true">${esc(t.initials)}</div>
        <div class="instructor-main">
          <h3>${esc(t.name)}</h3>
          <p class="headline">${esc(t.headline)}</p>
          <ul class="roles">${t.roles.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
          <p>${esc(t.summary)}</p>
          <dl class="results">${t.results.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
          <details class="more">
            <summary>Experience and education</summary>
            ${t.more.map((p) => `<p>${esc(p)}</p>`).join('')}
            <ul>${t.education.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>
          </details>
        </div>
      </article>
    </section>` : ''}

    ${c.outline ? `
    <section class="block download" aria-labelledby="outline-title">
      <div>
        <h2 id="outline-title">Take the outline with you</h2>
        <p>The week-by-week curriculum and deliverables on two pages, to read later or share with your manager.</p>
      </div>
      <a class="button dark" href="${esc(c.outline.href)}" download>Download PDF</a>
    </section>` : ''}

    ${c.faq?.length ? `
    <section class="block faq" aria-labelledby="course-faq">
      <h2 id="course-faq">Questions</h2>
      ${c.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}
    </section>` : ''}`;
}

// Course details for search engines (schema.org Course), as top universities publish.
function structuredData(c, course, first, fee) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: c.title,
    description: c.tagline,
    url: location.origin + coursePath(course),
    provider: { '@type': 'EducationalOrganization', name: 'KHS Elevate, Kulsoom Hassan School', sameAs: 'https://www.kulsoomhassanschool.com' },
    ...(fee ? { offers: { '@type': 'Offer', price: fee, priceCurrency: 'PKR', category: 'Paid' } } : {}),
    hasCourseInstance: first ? [{
      '@type': 'CourseInstance', courseMode: 'Online', startDate: first.start_date, ...(first.end_date ? { endDate: first.end_date } : {}),
      ...(c.instructor ? { instructor: { '@type': 'Person', name: c.instructor.name } } : {}),
    }] : undefined,
  };
  const el = document.createElement('script');
  el.type = 'application/ld+json';
  el.textContent = JSON.stringify(data);
  document.head.appendChild(el);
}

function form(course, open, accounts, terms) {
  const maxInst = Math.min(Math.max(Number(course.instalments_max) || 1, 1), 6);
  area.innerHTML = `
    <form id="reg" novalidate>
      <fieldset>
        <legend>1. Intake</legend>
        <div class="grid">
          <label class="${maxInst > 1 ? '' : 'wide'}">Intake
            <select name="batch_id" required>
              ${open.map((b) => `<option value="${esc(b.id)}">${esc(b.label || 'Starts ' + formatDate(b.start_date))} · ${esc(b.schedule || 'times to be confirmed')}</option>`).join('')}
            </select>
          </label>
          ${maxInst > 1 ? `<label>Pay in
            <select name="instalment_count">${Array.from({ length: maxInst }, (_, i) => `<option value="${i + 1}">${i === 0 ? 'One payment' : `${i + 1} instalments`}</option>`).join('')}</select>
          </label>` : ''}
        </div>
      </fieldset>

      <fieldset>
        <legend>2. Your details</legend>
        <div class="grid">
          <label>Full name <small>as it should appear on your certificate</small><input name="name" required maxlength="120" autocomplete="name"></label>
          <label>Email<input name="email" type="email" required maxlength="160" autocomplete="email"></label>
          <label>Phone / WhatsApp<input name="phone" type="tel" required maxlength="40" autocomplete="tel" placeholder="+92 300 1234567"></label>
          <label>City<input name="city" required maxlength="100" autocomplete="address-level2"></label>
          <label>Date of birth<input name="date_of_birth" type="date" required max="${todayPk()}"></label>
          <label>Father’s / husband’s name<input name="father_name" required maxlength="120"></label>
          <label>CNIC or passport number<input name="id_number" required maxlength="40" placeholder="35202-1234567-1"></label>
          <label>Place of birth<input name="place_of_birth" required maxlength="100"></label>
          <label>Nationality<input name="nationality" required maxlength="80" value="Pakistani"></label>
          <label>Country of residence<input name="country_of_residence" required maxlength="80" value="Pakistan"></label>
          <label class="wide">Current address<input name="address" required maxlength="300" autocomplete="street-address"></label>
          <label>Emergency phone <small>optional</small><input name="emergency_phone" type="tel" maxlength="40"></label>
          <label>Your experience in this area <small>optional</small><input name="current_level" maxlength="80" placeholder="e.g. Beginner, run my own page"></label>
          <label class="wide">Why are you joining?<textarea name="learning_reason" required maxlength="1000" placeholder="e.g. I market our family hotel and want more direct bookings."></textarea></label>
        </div>
      </fieldset>

      <fieldset>
        <legend>3. Payment</legend>
        <div class="pay-box">
          <div>Pay now: <span class="amount" id="due-now"></span></div>
          <p class="muted" id="due-note"></p>
          <div class="accounts">
            ${accounts.map((a) => `<div class="account"><b>${esc(a.bank)}</b>${esc(a.account_title)}<br>Account: ${esc(a.account_number)}${a.iban ? `<br>IBAN: ${esc(a.iban)}` : ''}</div>`).join('')}
          </div>
        </div>
        <div class="coupon">
          <label>Coupon code <small>optional, enter your email above first</small><input name="coupon" maxlength="32" autocomplete="off"></label>
          <button class="button dark" type="button" id="apply">Apply</button>
        </div>
        <p class="status" id="coupon-status" role="status"></p>
        <div class="grid" style="margin-top:12px">
          <label>Name on the bank transfer<input name="payer_name" required maxlength="120"></label>
          <label>Transaction reference / ID<input name="transaction_reference" required maxlength="120"></label>
          <label>Date of payment<input name="payment_date" type="date" required max="${todayPk()}" value="${todayPk()}"></label>
          <label>Amount you transferred (PKR)<input name="paid_amount" type="number" min="1" step="1" required></label>
          <label class="wide">Payment receipt <small>photo or screenshot, JPG or PNG</small><input name="receipt" type="file" accept="image/jpeg,image/png" required></label>
        </div>
      </fieldset>

      <fieldset>
        <legend>4. Terms</legend>
        <div class="terms"><ol>${terms.items.map((t) => `<li>${esc(t)}</li>`).join('')}</ol></div>
        <label class="check" style="margin-top:14px"><input type="checkbox" name="terms_accepted" required> I have read and accept the terms and conditions.</label>
        <label class="check" style="margin-top:10px"><input type="checkbox" name="consent" required> Kulsoom Hassan School may contact me about this registration by e-mail, phone or WhatsApp.</label>
        <input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px">
      </fieldset>

      <button class="button" type="submit" id="submit">Submit registration</button>
      <p class="status" id="status" role="status"></p>
    </form>`;

  const f = document.getElementById('reg');
  const requestId = crypto.randomUUID();
  let quote = null;

  const batchOf = () => open.find((b) => b.id === f.batch_id.value);
  const count = () => Number(f.instalment_count?.value || 1);
  const total = () => (quote && quote.batch_id === f.batch_id.value && quote.email === f.email.value.trim().toLowerCase() ? Number(quote.expected_amount) : courseFee(course, batchOf()));
  function update() {
    const t = total();
    const now = t ? instalmentSplit(t, count())[0] : null;
    document.getElementById('due-now').textContent = now ? pkr(now) : 'Contact the school';
    document.getElementById('due-note').textContent = !t ? '' : count() > 1
      ? `Course fee ${pkr(t)}, in ${count()} instalments. The rest is due monthly; the school sends reminders.`
      : `Full course fee${quote ? ' after your coupon' : ''}.`;
    if (now && (!f.paid_amount.value || f.paid_amount.dataset.auto === '1')) {
      f.paid_amount.value = now;
      f.paid_amount.dataset.auto = '1';
    }
  }
  f.paid_amount.addEventListener('input', () => { f.paid_amount.dataset.auto = '0'; });
  f.batch_id.addEventListener('change', () => { quote = null; update(); });
  f.instalment_count?.addEventListener('change', update);
  update();

  document.getElementById('apply').addEventListener('click', async () => {
    const out = document.getElementById('coupon-status');
    out.className = 'status';
    out.textContent = 'Checking…';
    try {
      const r = await fetch(API + '/api/coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: f.coupon.value, email: f.email.value, batch_id: f.batch_id.value }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data.error || 'The coupon could not be applied.');
      quote = data.quote;
      out.className = 'status ok';
      out.textContent = `Coupon applied: ${quote.discount_percent}% off. Submit before ${new Date(quote.expires_at).toLocaleString('en-GB', { timeZone: 'Asia/Karachi' })} PKT.`;
      f.paid_amount.dataset.auto = '1';
      update();
    } catch (e) {
      quote = null;
      out.className = 'status error';
      out.textContent = e.message;
      update();
    }
  });

  f.addEventListener('input', () => track('begin_registration', { course_id: course.id, course_name: course.title, value: courseFee(course, open[0]) || undefined, currency: 'PKR' }), { once: true });
  f.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('status');
    const button = document.getElementById('submit');
    status.className = 'status';
    if (!f.reportValidity()) return;
    const t = total();
    if (!t) {
      status.className = 'status error';
      status.textContent = 'The fee for this intake is not set yet. Please contact the school.';
      return;
    }
    button.disabled = true;
    status.textContent = 'Preparing your receipt…';
    try {
      const receipt = await receiptData(f.receipt.files[0]);
      status.textContent = 'Sending your registration…';
      const v = (k) => (f[k] ? f[k].value : '');
      const payload = {
        kind: 'registration', request_id: requestId, consent: f.consent.checked, website: v('website'),
        name: v('name'), email: v('email'), phone: v('phone'), city: v('city'), course_id: course.id, batch_id: v('batch_id'),
        date_of_birth: v('date_of_birth'), father_name: v('father_name'), id_number: v('id_number'), place_of_birth: v('place_of_birth'),
        nationality: v('nationality'), country_of_residence: v('country_of_residence'), address: v('address'),
        emergency_phone: v('emergency_phone'), current_level: v('current_level'), previous_institute: '', learning_reason: v('learning_reason'),
        terms_accepted: f.terms_accepted.checked, terms_version: terms.version,
        payer_name: v('payer_name'), transaction_reference: v('transaction_reference'), payment_date: v('payment_date'),
        paid_amount: Number(v('paid_amount')), expected_amount: t, instalment_count: count(),
        coupon_quote_id: quote && quote.batch_id === v('batch_id') ? quote.id : null,
        receipt, attribution: attribution(),
      };
      const r = await fetch(API + '/api/registration', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data.error || 'Your registration could not be sent. Keep your receipt and try again, or contact us on WhatsApp.');
      const ref = String(data.reference || requestId).slice(0, 8).toUpperCase();
      // event_id matches the server-side Meta event, so Meta counts the registration once.
      track('complete_registration', { event_id: 'registration:' + data.reference, course_id: course.id, course_name: course.title, value: t, currency: 'PKR' });
      area.innerHTML = `<div class="done" role="status">
        <h3>Registration received</h3>
        <p>Thank you. Your reference is <strong>${esc(ref)}</strong>. We have e-mailed a copy to ${esc(payload.email)}.</p>
        <p>Kulsoom Hassan School will verify your payment and e-mail your confirmation and class link. You do not need to pay again.</p>
        <p><a href="#" data-whatsapp="Assalam o Alaikum KHS Elevate, my registration reference is ${esc(ref)}.">Questions? WhatsApp us with your reference</a></p>
      </div>`;
      wireWhatsapp(area);
      area.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err) {
      status.className = 'status error';
      status.textContent = err.message;
      button.disabled = false;
    }
  });
}

/** The receipt as a data URL the school accepts: JPG or PNG, at most 2 MB (larger photos are resized). */
async function receiptData(file) {
  if (!file) throw new Error('Upload your payment receipt.');
  if (!/^image\/(png|jpeg)$/.test(file.type) && !/^image\//.test(file.type)) throw new Error('Upload the receipt as a JPG or PNG image.');
  const read = (blob) => new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = () => reject(new Error('The receipt could not be read.'));
    r.readAsDataURL(blob);
  });
  if (/^image\/(png|jpeg)$/.test(file.type) && file.size <= 1_900_000) return read(file);
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = () => reject(new Error('Upload the receipt as a JPG or PNG image.'));
      i.src = url;
    });
    const scale = Math.min(1, 1800 / Math.max(img.width, img.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
    for (const q of [0.85, 0.7, 0.55]) {
      const blob = await new Promise((r) => canvas.toBlob(r, 'image/jpeg', q));
      if (blob && blob.size <= 1_900_000) return read(blob);
    }
    throw new Error('The receipt image is too large. Take a screenshot instead.');
  } finally {
    URL.revokeObjectURL(url);
  }
}


loadCatalog().then(render).catch(() => {
  head.innerHTML = '<h1>The course could not be loaded.</h1><p class="subtitle">Please refresh the page, or contact us on WhatsApp.</p>';
  summary.remove();
  area.innerHTML = '<p><a class="button dark" href="#" data-whatsapp="Assalam o Alaikum KHS Elevate, the course page did not load for me.">WhatsApp us</a></p>';
  wireWhatsapp(area);
});
