# KHS Elevate

The website of KHS Elevate, professional courses by Kulsoom Hassan School, at https://elevate.kulsoomhassanschool.com.

This repository is only the front end: plain HTML, CSS and JavaScript with no build step. Everything else lives in the Kulsoom Hassan School system (`neveeos/khs`):

- **Courses** are created in the KHS admin under Courses. A course belongs to Elevate when its category is one of *Digital marketing*, *AI & automation*, *Web development* or *SEO & analytics*. Elevate courses are not shown on the school website.
- **The course list** comes from `GET https://www.kulsoomhassanschool.com/api/elevate/catalog` (published Elevate courses, intakes, teachers, bank accounts and registration terms).
- **Registrations** post to `https://www.kulsoomhassanschool.com/api/registration` (and coupons to `/api/coupon`). They appear in the KHS admin with the school's other registrations; payment review, students, finance and e-mails work the same way. There are no demo classes for Elevate.

The KHS backend accepts these requests only from `https://elevate.kulsoomhassanschool.com` (see `ELEVATE_ORIGIN` in `neveeos/khs/lib/http.js`).

## Pages

- `/` (`index.html`): introduction and the course list.
- `/course?id=COURSE_ID` (`course.html`): course details and the registration form.

## Deploy

Import the repository into Vercel with the framework preset **Other**, leave the build command empty, and add the domain `elevate.kulsoomhassanschool.com`. `vercel.json` sets clean URLs and security headers.

Brand: the KHS Elevate logo (`assets/elevate-logo.png`), yellow `#fdc926`, slate `#1c2429`, and the Manrope typeface (SIL Open Font License, `fonts/Manrope-OFL.txt`).

## Analytics (Google Tag Manager GTM-5BZHJ8Q3)

The container loads from `/assets/gtm.js` (no inline script, so the CSP stays strict). GA4 is set up inside the container. The **Meta pixel (dataset 2222257061654747) is installed directly** from `/assets/meta-pixel.js`: do not add a second Meta pixel tag in GTM, or every event is counted twice. Custom HTML tags with inline scripts are blocked by the site's security policy.

Events the site pushes to `dataLayer`:

| Event | When | Fields |
| --- | --- | --- |
| `view_course` | A course page loads | `course_id`, `course_name`, `value`, `currency` |
| `download_outline` | Course outline PDF clicked | `course_id`, `course_name` |
| `begin_registration` | First input in the registration form | `course_id`, `course_name` |
| `complete_registration` | Registration accepted | `event_id`, `course_id`, `course_name`, `value`, `currency` |
| `contact` | WhatsApp or phone link tapped | `method` |

The site sends these Meta events itself: PageView, ViewContent (`view_course`), InitiateCheckout (`begin_registration`), CompleteRegistration (`complete_registration`, with `event_id` as the Event ID so it deduplicates against the school server's Conversions API event) and Contact (`contact`).
