// Detailed course pages. The fee, intakes and registration come live from Kulsoom Hassan
// School; the curriculum, outline download and instructor profile for each course live here.
// Keyed by the course's id in KHS admin. `slug` gives the course a readable address:
// /courses/<slug>.

export const COURSE_CONTENT = {
  'ea39b30d-bb9f-4ad5-bb42-9155be7bdf68': {
    slug: 'hospitality-tourism-digital-marketing',
    kicker: 'Practical executive course',
    title: '360-Degree Hospitality & Tourism Digital Marketing',
    tagline: 'Master direct bookings, high-converting content, metasearch and guest lifecycle retention in 4 weeks.',
    glance: [
      ['Length', '4 weeks'],
      ['Sessions', '8 live sessions, 2 a week'],
      ['Contact hours', '12 hours (1.5 hours a session)'],
      ['Format', 'Live online cohort'],
    ],
    overview: [
      'A practical course for people who market hotels, resorts, tours and destinations. Over four weeks you build a direct-booking engine, content that turns inspiration into room nights, paid campaigns that follow occupancy, and a guest journey that brings people back.',
      'Every 90-minute class pairs 30 minutes of proven frameworks with 60 minutes of live execution on your own property or a case brand. You finish with a complete 90-day 360° marketing plan and a portfolio of campaign assets.',
    ],
    audience: [
      ['Hoteliers and resort marketers', 'Grow direct bookings and cut what you pay online travel agencies.'],
      ['Tour operators and travel companies', 'Fill departures and packages with content, creators and paid campaigns.'],
      ['Destination teams and consultants', 'Plan and measure campaigns that reach travellers before they book.'],
    ],
    split: [['30 minutes', 'Frameworks that work in hospitality, with real examples'], ['60 minutes', 'Live execution: you build the asset in class with the instructor']],
    weeks: [
      {
        title: 'Direct bookings and search dominance',
        summary: 'Cut OTA commission (15–25%) by turning your website and local search presence into a direct booking engine.',
        sessions: ['The modern hospitality funnel and brand positioning', 'Local SEO, Google Business Profile and destination discovery'],
        deliverables: ['3-tier guest persona matrix', 'Google Business Profile and local SEO audit'],
      },
      {
        title: 'Social storytelling and creator partnerships',
        summary: 'Turn visual inspiration into measurable room nights and tour bookings with short-form video and vetted creators.',
        sessions: ['Short-form video and sensory storytelling (TikTok, Reels, Shorts)', 'Influencer marketing, user-generated content and community loops'],
        deliverables: ['30-day content calendar and 3 vertical video scripts', 'Influencer outreach brief and stay ROI calculator'],
      },
      {
        title: 'Paid acquisition, metasearch and yield marketing',
        summary: 'Spend ad budgets profitably across Search, metasearch and Meta, in step with occupancy forecasts.',
        sessions: ['Paid search and Google Hotel Ads (metasearch)', 'Paid social (Meta) and seasonal yield marketing'],
        deliverables: ['Google Search and Hotel Ads metasearch budget plan', '3-stage Meta Ads shoulder-season funnel'],
      },
      {
        title: 'Reputation, lifecycle CRM and 360° capstone',
        summary: 'Raise guest lifetime value, protect review ratings and bring every channel into one revenue system.',
        sessions: ['Online reputation management and automated guest journeys', 'Hospitality analytics, attribution and final capstone pitch'],
        deliverables: ['5-e-mail automated guest journey and review playbook', 'Complete 90-day 360° marketing strategy pitch deck'],
      },
    ],
    includes: [
      ['A 90-day 360° marketing plan', 'Your capstone: an agency-grade plan and pitch deck you can put to work or show employers.'],
      ['A portfolio of campaign assets', 'Personas, audits, content calendar, video scripts, ad funnels and an e-mail guest journey.'],
      ['Templates and calculators', 'Audit checklists, budget calculators and the stay ROI calculator to reuse after the course.'],
      ['Certificate of completion', 'From KHS Elevate, Kulsoom Hassan School.'],
    ],
    outline: {
      href: '/downloads/khs-elevate-360-hospitality-tourism-digital-marketing-outline.pdf',
      label: 'Course outline (PDF, 2 pages, 89 KB)',
    },
    instructor: {
      name: 'Wazah Nadeem',
      initials: 'WN',
      headline: 'Hospitality marketing instructor',
      roles: [
        'Marketing Consultant, PC Attabad Lake Hunza',
        'Director Commercials, Northern Passage Tour & Travels',
        'Visiting Faculty, Tourism & Hospitality, Akhuwat University',
      ],
      summary:
        'Wazah Nadeem is a hospitality marketing professional, tourism educator and commercial leader based in Lahore. Before his current roles he led hotel and leisure marketing at Luxus Group.',
      results: [
        ['70%', 'sales growth for Luxus Hunza'],
        ['40%', 'sales growth for Sozo Water Park'],
        ['30%', 'rise in social audience engagement'],
      ],
      education: [
        'BBA (Hons), Marketing and Finance, Lahore School of Economics',
        'Master’s in Human Resource Management, Institute of Administrative Sciences, University of the Punjab',
      ],
      more: [
        'As Group Marketing Manager at Luxus Group he directed digital, social and conventional marketing for Luxus Hotels and Sozo Water Park, and led the 360° branding and launches of Himmel Resorts and Luxus Catering.',
        'Earlier he led nationwide trade marketing and more than 20 cross-organisational partnerships at Zameen.com, creative and B2B business development at One4All Advertising Solutionists, and PR and client growth at Linking Media, including foreign-dignitary event operations for AdAsia 2019.',
        'Certifications: Google Analytics and Facebook Ads.',
      ],
    },
    faq: [
      ['Do I need marketing experience?', 'No. The course suits hospitality staff new to digital marketing as well as marketers who want a hospitality focus. You work on your own property or a case brand.'],
      ['What if I miss a session?', 'Tell the school in advance. You can catch up with the session materials and bring questions to the next class.'],
      ['Will I get a certificate?', 'Yes, a certificate of completion from KHS Elevate, Kulsoom Hassan School, when you complete the course and capstone.'],
      ['How do I pay?', 'By bank transfer to the school’s account shown in the registration form. Your seat is confirmed by e-mail once the payment is verified.'],
    ],
  },
};

export function contentFor(courseId) {
  return COURSE_CONTENT[courseId] || null;
}

export function courseIdForSlug(slug) {
  return Object.entries(COURSE_CONTENT).find(([, c]) => c.slug === slug)?.[0] || null;
}

export function coursePath(course) {
  const c = COURSE_CONTENT[course.id];
  return c ? '/courses/' + c.slug : '/course?id=' + encodeURIComponent(course.id);
}
