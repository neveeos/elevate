// Meta pixel for KHS Elevate (dataset 2222257061654747). Loaded as a file so the site's
// Content Security Policy stays strict. Events are sent from track() in common.js;
// CompleteRegistration carries the same event ID as the school server's event, so Meta
// counts each registration once.
!function (f, b, e, v, n, t, s) {
  if (f.fbq) return;
  n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
  if (!f._fbq) f._fbq = n;
  n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
  t = b.createElement(e); t.async = !0; t.src = v;
  s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
}(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2222257061654747');
fbq('track', 'PageView');
