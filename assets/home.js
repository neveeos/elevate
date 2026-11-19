import { loadCatalog, nextBatch, courseFee, pkr, formatDate, esc, whatsapp, year } from './common.js';

year();
for (const a of document.querySelectorAll('[data-whatsapp]')) {
  a.href = whatsapp(a.dataset.whatsapp);
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
}

const list = document.getElementById('course-list');

function card(course, batch, teachers) {
  const fee = courseFee(course, batch);
  const teacher = teachers.find((t) => t.id === batch?.instructor_id);
  const href = '/course?id=' + encodeURIComponent(course.id);
  const open = batch?.open_for_registration;
  return `
    <article class="course">
      <div class="course-main">
        <span class="course-tag">${esc(course.category)}${course.level ? ' · ' + esc(course.level) : ''}</span>
        <h3>${esc(course.title)}</h3>
        ${course.subtitle ? `<p class="subtitle">${esc(course.subtitle)}</p>` : ''}
        <p class="description">${esc(course.description)}</p>
      </div>
      <div class="course-side">
        <div class="fee">${course.coming_soon ? 'Coming soon' : fee ? pkr(fee) : 'Fee to be announced'}</div>
        <dl class="facts">
          <div><dt>Starts</dt><dd>${batch ? formatDate(batch.start_date) : 'To be announced'}</dd></div>
          ${batch?.schedule ? `<div><dt>Classes</dt><dd>${esc(batch.schedule)}</dd></div>` : ''}
          ${course.duration ? `<div><dt>Length</dt><dd>${esc(course.duration)}</dd></div>` : ''}
          ${teacher ? `<div><dt>Teacher</dt><dd>${esc(teacher.name)}</dd></div>` : ''}
          ${course.instalments_max > 1 ? `<div><dt>Payment</dt><dd>Up to ${course.instalments_max} instalments</dd></div>` : ''}
        </dl>
        <a class="button" href="${href}${open ? '#register' : ''}">${open ? 'Register' : 'Course details'}</a>
        ${!open && !course.coming_soon ? '<p class="note">Registration opens soon for the next intake.</p>' : ''}
      </div>
    </article>`;
}

loadCatalog()
  .then(({ courses, batches, teachers }) => {
    if (!courses.length) {
      list.innerHTML = `<p class="empty">New courses are being prepared. <a href="#" data-wa>Message us on WhatsApp</a> to hear when registration opens.</p>`;
    } else {
      list.innerHTML = courses.map((c) => card(c, nextBatch(c, batches), teachers)).join('');
    }
  })
  .catch(() => {
    list.innerHTML = `<p class="empty">Courses could not be loaded just now. Please refresh, or <a href="#" data-wa>message us on WhatsApp</a>.</p>`;
  })
  .finally(() => {
    for (const a of list.querySelectorAll('[data-wa]')) {
      a.href = whatsapp('Assalam o Alaikum KHS Elevate, I would like to know about your next course.');
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }
  });
