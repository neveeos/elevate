// Detailed course pages. The fee, intakes and registration come live from Kulsoom Hassan
// School; the curriculum, outline download and instructor profile for each course live here.
// Keyed by the course's id in KHS admin. `slug` gives the course a readable address:
// /courses/<slug>. `priceUsd` is the price shown on the pages; the bank transfer is
// still paid in PKR, at the fee set in KHS admin.

export const COURSE_CONTENT = {
  'ea39b30d-bb9f-4ad5-bb42-9155be7bdf68': {
    slug: 'hospitality-tourism-digital-marketing',
    priceUsd: 149,
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
  'a495c4af-0d40-43ff-af4f-bc86fbcad30a': {
    slug: 'generative-ai-for-professionals',
    kicker: 'Practical professional course',
    title: 'Generative AI for Professionals',
    tagline: 'Use ChatGPT, Claude, Gemini and AI automation to do better work in less time, in 4 weeks.',
    glance: [
      ['Length', '4 weeks'],
      ['Sessions', '8 live sessions, 2 a week'],
      ['Contact hours', '12 hours (1.5 hours a session)'],
      ['Format', 'Live online cohort'],
    ],
    overview: [
      'Generative AI is now part of everyday work, but most people use a fraction of what it can do and trust it in the wrong places. This course teaches you how AI assistants such as ChatGPT, Claude and Gemini work, how to brief them well, and how to check what they give you.',
      'Over four weeks you build a personal AI toolkit for writing, research, analysis, content and automation, using your own tasks or a case business. Every 90-minute class pairs 30 minutes of method with 60 minutes of hands-on practice.',
    ],
    audience: [
      ['Professionals and managers', 'Write, research, analyse and plan faster, with results you can stand behind.'],
      ['Business owners and freelancers', 'Produce content, proposals and customer replies at a fraction of the time.'],
      ['Teams adopting AI', 'Agree good practice for accuracy, privacy and responsible use.'],
    ],
    split: [['30 minutes', 'Methods and examples: how to brief, check and combine AI tools'], ['60 minutes', 'Hands-on practice on your own work with the instructor']],
    weeks: [
      {
        title: 'How generative AI works and how to brief it',
        summary: 'Understand what large language models are good and bad at, and write prompts that give dependable results.',
        sessions: ['How AI assistants work: models, context, limits and hallucinations', 'Prompting that works: roles, context, examples, structure and iteration'],
        deliverables: ['Personal prompt library for your 10 most common tasks', 'Comparison of ChatGPT, Claude and Gemini on a real task'],
      },
      {
        title: 'Writing, research and analysis',
        summary: 'Use AI to draft, edit, research and analyse, and verify the output before it reaches anyone else.',
        sessions: ['Writing and editing with AI: e-mails, reports, proposals and posts in your voice', 'Research, document summaries and spreadsheet analysis with fact-checking'],
        deliverables: ['A report drafted and verified with AI', 'A data analysis with charts from a spreadsheet'],
      },
      {
        title: 'Creative content: images, video and presentations',
        summary: 'Create visuals, short videos and slide decks with generative tools, and know the rules on use and copyright.',
        sessions: ['Image generation and design tools for marketing and presentations', 'AI video, voice and slide creation for short-form content'],
        deliverables: ['A set of on-brand social media visuals', 'A short AI-assisted video and slide deck'],
      },
      {
        title: 'Custom assistants, automation and responsible use',
        summary: 'Turn repeated tasks into custom assistants and no-code automations, with clear rules for safe use.',
        sessions: ['Custom assistants and projects with your own documents and instructions', 'No-code automation and an AI policy for your work or team'],
        deliverables: ['A custom assistant for one business task', 'An automated workflow and a one-page AI use policy'],
      },
    ],
    includes: [
      ['A personal AI toolkit', 'Your prompt library, custom assistant and automated workflow, ready to use at work.'],
      ['A portfolio of AI-assisted work', 'A verified report, data analysis, visuals, video and slide deck.'],
      ['An AI use policy', 'A one-page guide to accuracy, privacy and copyright for you or your team.'],
      ['Certificate of completion', 'From KHS Elevate, Kulsoom Hassan School.'],
    ],
    faq: [
      ['Do I need technical skills?', 'No. If you can use e-mail and a web browser, you can take this course. No coding is involved.'],
      ['Which AI tools do I need?', 'Free accounts are enough to start. The instructor shows where a paid plan is worth it and where it is not.'],
      ['When does it start?', 'The course is coming soon. Message us on WhatsApp and we will tell you first when the intake, timetable and fee are announced.'],
      ['Will I get a certificate?', 'Yes, a certificate of completion from KHS Elevate, Kulsoom Hassan School, when you complete the course.'],
    ],
  },
  'ffc0fc86-42da-4f6c-9f01-409949c7f327': {
    slug: 'full-stack-web-development-with-ai',
    kicker: 'Practical professional course',
    title: 'Full-Stack Web Development with Claude and AI Tools',
    tagline: 'Build and launch real web applications with Next.js, a database and AI coding assistants such as Claude Code, in 8 weeks.',
    glance: [
      ['Length', '8 weeks'],
      ['Sessions', '16 live sessions, 2 a week'],
      ['Contact hours', '24 hours (1.5 hours a session)'],
      ['Format', 'Live online cohort'],
    ],
    overview: [
      'Professional software teams now build with AI coding assistants at their side. This course teaches modern full-stack web development that way: you learn the foundations properly, then use Claude, Claude Code and other AI tools to plan, write, test and review code faster, while understanding every line you ship.',
      'Over eight weeks you go from how the web works to a deployed application with a database, sign-in and a polished interface. Every 90-minute class pairs 30 minutes of concepts with 60 minutes of live building.',
    ],
    audience: [
      ['Beginners and career switchers', 'Learn a modern stack and finish with a deployed project for your portfolio.'],
      ['Junior developers', 'Fill gaps in full-stack skills and learn to work productively with AI coding tools.'],
      ['Founders and product people', 'Build working prototypes and understand how your product is made.'],
    ],
    split: [['30 minutes', 'Concepts, patterns and how professionals use AI coding tools'], ['60 minutes', 'Live building: you write and ship code with the instructor']],
    weeks: [
      {
        title: 'Web foundations and your AI-assisted workflow',
        summary: 'Set up a professional workflow and understand how browsers, servers and the web fit together.',
        sessions: ['How the web works: HTML, CSS, JavaScript, HTTP and the browser', 'Tools of the trade: VS Code, terminal, Git, GitHub and Claude Code'],
        deliverables: ['A configured development environment and GitHub profile', 'A responsive personal page, live on the web'],
      },
      {
        title: 'JavaScript and TypeScript essentials',
        summary: 'Learn the language of the web well enough to read, write and review AI-generated code with confidence.',
        sessions: ['JavaScript fundamentals: data, functions, objects and async code', 'TypeScript and reading code critically: prompts for explaining and refactoring'],
        deliverables: ['A set of small interactive features', 'A code review checklist for AI-written code'],
      },
      {
        title: 'React interfaces',
        summary: 'Build interactive interfaces from components, state and data.',
        sessions: ['React components, props and state', 'Forms, lists and fetching data from APIs'],
        deliverables: ['A multi-screen React interface', 'A form with validation and error states'],
      },
      {
        title: 'Next.js applications',
        summary: 'Structure a real application with routing, server rendering and API routes.',
        sessions: ['Next.js routing, layouts and server components', 'API routes, server actions and environment variables'],
        deliverables: ['The skeleton of your portfolio application', 'Working API routes for your app'],
      },
      {
        title: 'Databases and data modelling',
        summary: 'Design a PostgreSQL database and connect it safely to your application.',
        sessions: ['Relational data modelling and SQL with PostgreSQL', 'Connecting a database (Supabase) and handling data safely'],
        deliverables: ['A database schema with migrations', 'Create, read, update and delete features in your app'],
      },
      {
        title: 'Sign-in, permissions and security',
        summary: 'Add accounts and make sure each user sees only what they should.',
        sessions: ['Authentication: sign-up, sign-in and sessions', 'Permissions, row-level security and common web security mistakes'],
        deliverables: ['Secure sign-in in your application', 'Role-based access with database rules'],
      },
      {
        title: 'Testing, quality and AI agents',
        summary: 'Keep a growing codebase working, and use AI agents for larger changes safely.',
        sessions: ['Automated tests, debugging and code review', 'Planning and delegating larger features to Claude Code, then reviewing the result'],
        deliverables: ['Automated tests for your key features', 'A feature built end to end with an AI agent and reviewed by you'],
      },
      {
        title: 'Deployment and capstone',
        summary: 'Ship your application, monitor it and present it.',
        sessions: ['Deploying to Vercel, custom domains, performance and monitoring', 'Capstone presentations and your next steps as a developer'],
        deliverables: ['A deployed full-stack application on its own address', 'Portfolio write-up and project presentation'],
      },
    ],
    includes: [
      ['A deployed full-stack application', 'Your capstone: a working app with a database, sign-in and tests, live on the web.'],
      ['A GitHub portfolio', 'Every exercise and project in version control, ready to show employers or clients.'],
      ['An AI-assisted workflow', 'Prompts, checklists and habits for building with Claude and other AI tools responsibly.'],
      ['Certificate of completion', 'From KHS Elevate, Kulsoom Hassan School.'],
    ],
    faq: [
      ['Do I need to know how to code?', 'No, but you need basic computer skills and time to practise between classes. Some HTML or programming experience helps.'],
      ['Will AI write the code for me?', 'AI tools speed up the work, but the course teaches you to understand, check and fix every line. That is what employers and clients pay for.'],
      ['Which AI tools do I need?', 'You can start with free tiers. The instructor explains which paid plans, such as Claude, are worth it for regular development work.'],
      ['When does it start?', 'The course is coming soon. Message us on WhatsApp and we will tell you first when the intake, timetable and fee are announced.'],
    ],
  },
  '9aa1be8f-218d-4146-9c54-95f75cb6a42c': {
    slug: 'digital-marketing-social-media-ads-analytics',
    kicker: 'Practical professional course',
    title: 'Digital Marketing: Social Media, Ads and Analytics',
    tagline: 'Plan, run and measure social media and paid campaigns on Meta and Google that bring real customers, in 6 weeks.',
    glance: [
      ['Length', '6 weeks'],
      ['Sessions', '12 live sessions, 2 a week'],
      ['Contact hours', '18 hours (1.5 hours a session)'],
      ['Format', 'Live online cohort'],
    ],
    overview: [
      'A practical course in the digital marketing businesses actually pay for: content that earns attention, campaigns that bring leads and sales, and reporting that shows what worked. You learn to plan, create, run and measure, not just to post.',
      'Over six weeks you build a complete marketing plan and campaign set for your own business or a case brand. Every 90-minute class pairs 30 minutes of frameworks with 60 minutes of live execution in the real tools.',
    ],
    audience: [
      ['Business owners', 'Bring in customers online without wasting money on ads that do not convert.'],
      ['Marketers and freelancers', 'Add paid ads, tracking and reporting to your skills, and win better clients.'],
      ['Graduates and career starters', 'Build job-ready skills and a portfolio for marketing roles.'],
    ],
    split: [['30 minutes', 'Frameworks and real campaign examples'], ['60 minutes', 'Live execution in Meta, Google and analytics tools']],
    weeks: [
      {
        title: 'Strategy, audience and positioning',
        summary: 'Set measurable goals and understand who you are selling to before you spend on anything.',
        sessions: ['The digital marketing funnel, goals and budgets', 'Customer personas, offers and competitor research (with AI tools)'],
        deliverables: ['Marketing goals and budget sheet', 'Customer persona and offer map'],
      },
      {
        title: 'Social media content',
        summary: 'Plan and create content that builds trust and drives enquiries.',
        sessions: ['Content pillars, calendars and platform playbooks', 'Short-form video and design for Reels, TikTok and Shorts'],
        deliverables: ['30-day content calendar', 'Three video scripts and a set of post designs'],
      },
      {
        title: 'Meta ads',
        summary: 'Run Facebook and Instagram campaigns that are built to bring leads and sales.',
        sessions: ['Meta Ads Manager: campaign structure, audiences and budgets', 'Ad creative, testing and optimisation'],
        deliverables: ['A complete Meta campaign set-up', 'An ad creative test plan'],
      },
      {
        title: 'Google search and local visibility',
        summary: 'Be found when people search for what you sell.',
        sessions: ['Google Search ads: keywords, ad copy and bidding', 'SEO basics and Google Business Profile'],
        deliverables: ['A Google Search campaign plan', 'Local SEO and Google Business Profile audit'],
      },
      {
        title: 'Tracking and analytics',
        summary: 'Measure every lead and sale so you know which campaigns pay.',
        sessions: ['GA4 and Google Tag Manager: events, conversions and UTM links', 'Meta pixel, Conversions API and lead tracking to sales'],
        deliverables: ['A tracking plan for a website', 'A working conversion set-up checklist'],
      },
      {
        title: 'Reporting, optimisation and capstone',
        summary: 'Turn numbers into decisions, and present a complete plan.',
        sessions: ['Dashboards, monthly reports and deciding what to scale, fix or stop', 'Capstone: present your 90-day digital marketing plan'],
        deliverables: ['A monthly report template and dashboard', 'A 90-day digital marketing plan and pitch'],
      },
    ],
    includes: [
      ['A 90-day digital marketing plan', 'Your capstone: a complete plan you can run for your business or show employers and clients.'],
      ['Campaign assets', 'Content calendar, scripts, designs, Meta and Google campaign plans.'],
      ['Tracking and reporting templates', 'A tracking plan, conversion checklist, report template and dashboard.'],
      ['Certificate of completion', 'From KHS Elevate, Kulsoom Hassan School.'],
    ],
    faq: [
      ['Do I need marketing experience?', 'No. The course starts with the fundamentals and suits beginners as well as people who already post or boost content.'],
      ['Do I need to spend money on ads?', 'No. You build campaigns in the real tools, and the instructor shows how to test with a small budget if you choose to run them.'],
      ['When does it start?', 'The course is coming soon. Message us on WhatsApp and we will tell you first when the intake, timetable and fee are announced.'],
      ['Will I get a certificate?', 'Yes, a certificate of completion from KHS Elevate, Kulsoom Hassan School, when you complete the course and capstone.'],
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
