/**
 * English Dictionary — THE SOURCE OF TRUTH FOR SHAPE
 * ==================================================
 * Every visible string on the site lives here. The Arabic dictionary is typed
 * against `typeof en`, so this file decides what keys must exist in *both*
 * languages. Add a key here and the build fails until `ar.ts` catches up.
 *
 * Rules for editing:
 *  1. NO `as const`. Widening string literals to `string` is what lets the
 *     Arabic file hold different text while keeping the identical shape.
 *  2. Multi-line headlines are arrays of lines, not strings with <br>. The
 *     component joins them, so translators never touch markup.
 *  3. Anything language-neutral (URLs, emails, phone, image paths) belongs in
 *     lib/site.ts or lib/projects.ts, not here.
 */

const en = {
  // ==========================================================================
  // Page metadata (titles, descriptions) — feeds generateMetadata per route
  // ==========================================================================
  meta: {
    siteTitle: "VADO | Architecture & Engineering Consultants in Al Khobar",
    titleTemplate: "%s | VADO",
    description:
      "Architecture and engineering consultancy in Al Khobar, Saudi Arabia. Since 1994, VADO delivers design, engineering, and project management across the Kingdom.",
    /** Long form for JSON-LD and llms.txt, where depth is welcome. */
    longDescription:
      "VADO (VISION Arch. & Engineering Consultants) is a multidisciplinary architecture and engineering consultancy in Al Khobar, Saudi Arabia. Established in 1994, VADO delivers architectural design, engineering, project management, and site supervision for urban, landscape, cultural, retail, hospitality, and residential projects across the Kingdom.",
    keywords: [
      "VADO",
      "VISION Arch. & Engineering Consultants",
      "architecture firm Saudi Arabia",
      "engineering consultants Al Khobar",
      "architecture consultancy Khobar",
      "master planning Saudi Arabia",
      "urban design",
      "landscape architecture",
      "project management",
      "site supervision",
    ],
    ogImageAlt: "Al Hamra Waterfront masterplan by VADO on the Arabian Gulf",
  },

  // ==========================================================================
  // Brand facts that are actually READ by a visitor, so they need translating.
  // The machine-facing versions (E.164 phone, ISO country code, canonical URL,
  // email) stay language-neutral in lib/site.ts.
  // ==========================================================================
  brand: {
    shortName: "VADO",
    legalName: "VISION Arch. & Engineering Consultants",
    street: "Al Fardan Tower, Office 401",
    city: "Al Khobar",
    region: "Eastern Province",
    country: "Saudi Arabia",
  },

  // ==========================================================================
  // Global chrome
  // ==========================================================================
  nav: {
    about: "About",
    projects: "Projects",
    services: "Services",
    team: "Team",
    contact: "Contact",
    logoAlt: "VADO Consultants",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  langSwitcher: {
    /** Accessible name for the toggle itself. */
    label: "Change language",
    /** Announced target, e.g. "Switch to Arabic". */
    switchTo: "Switch to Arabic",
  },

  a11y: {
    skipToContent: "Skip to content",
  },

  // ==========================================================================
  // Shared content entities (used by more than one surface)
  // ==========================================================================

  /** The four disciplines. Drives ServicesTabs, /services, /about, JSON-LD, llms.txt. */
  services: [
    {
      id: "architectural-design",
      name: "Architectural Design",
      description:
        "Creative architectural solutions that balance aesthetics, function, and context, turning vision into architecture.",
    },
    {
      id: "engineering-design",
      name: "Engineering Design",
      description:
        "Integrated structural and MEP engineering ensuring safety, efficiency, and sustainability in every project.",
    },
    {
      id: "project-management",
      name: "Project Management",
      description:
        "Comprehensive project management from concept to completion, aligning quality, schedule, and budget.",
    },
    {
      id: "site-supervision",
      name: "Site Supervision",
      description:
        "Dedicated on-site supervision delivering precision, consistency, and construction excellence.",
    },
  ],

  /** Guiding principles. Drives GuidingPrinciples, /about, llms.txt. */
  principles: [
    {
      id: "01",
      title: "Innovation",
      description:
        "We turn vision into architecture, pursuing creative, forward-thinking design that answers to context and purpose.",
    },
    {
      id: "02",
      title: "Sustainability",
      description:
        "We design responsibly, shaping functional environments built to serve communities and endure for generations.",
    },
    {
      id: "03",
      title: "Precision",
      description:
        "We hold to engineering rigor and disciplined execution, from the first concept to the final detail on site.",
    },
  ],

  /** Leadership. Drives TeamGrid and /about. Image paths live in the component. */
  team: [
    { name: "Arch. Khalid Al Mulla", role: "President" },
    { name: "Arch. Mutaz Al Mulla", role: "Vice President & Chief Architect" },
  ],

  // ==========================================================================
  // Homepage sections
  // ==========================================================================
  home: {
    /** The single semantic H1, visually hidden behind the image slider. */
    srHeading:
      "VADO: Architecture and Engineering Consultants in Al Khobar, Saudi Arabia",

    hero: {
      tagline: "Est. 1994 — Al Khobar",
      /** Alt text pattern; {title} and {category} are substituted at render. */
      slideAlt: "{title}, {category} project by VADO",
    },

    about: {
      kicker: "About VADO",
      headlineLines: ["Where Vision", "Becomes", "Architecture."],
      body: "VADO (VISION Arch. & Engineering Consultants) is a multidisciplinary consultancy specialized in architecture, engineering, and project development. With decades of experience, VADO delivers innovative, functional, and sustainable solutions tailored to meet the evolving needs of communities and clients across Saudi Arabia.",
      imageAlt:
        "Courtyard Villa by VADO, an arched loggia in warm evening light",
    },

    portfolio: {
      kicker: "Our work",
      viewAll: "View all projects",
    },

    quote: {
      kicker: "VADO Vision Statement",
      statement:
        "To shape meaningful spaces through thoughtful design and engineering excellence, creating environments that inspire, serve, and sustain communities.",
    },

    team: {
      kicker: "Leadership",
      headline: "Meet our people",
      /** Alt text pattern; {name} and {role} are substituted at render. */
      memberAlt: "{name}, {role} at VADO",
    },

    principles: {
      kicker: "What guides us",
    },

    contact: {
      kicker: "Get in Touch",
      headlineLines: ["Ready to bring your", "vision to life?"],
      intro:
        "Contact us to discuss your project and learn how VADO can transform your ideas into reality.",
      infoHeading: "Contact Information",
      emailLabel: "Email",
      phoneLabel: "Phone",
      addressLabel: "Headquarters",
      addressLines: ["Al Fardan Tower – Office 401", "Al Khobar, Saudi Arabia"],
      otherEnquiries:
        "The form on the left is for project enquiries. If you are here for something else:",
      careersLabel: "Careers",
      careersLink: "Submit your CV",
      suppliersLabel: "Suppliers",
      suppliersLink: "Register as a supplier",
      established: "Established 1994 • Al Khobar, Saudi Arabia",
    },

    cta: {
      headline: "Let's Build The Future.",
      button: "Start Your Project",
    },
  },

  // ==========================================================================
  // Forms (shared between the homepage enquiry form, careers, and suppliers)
  // ==========================================================================
  forms: {
    fullName: "Full Name",
    fullNamePlaceholder: "Your full name",
    email: "Email Address",
    emailPlaceholder: "your@email.com",
    phone: "Phone Number",
    phonePlaceholder: "+966 XXX XXX XXX",
    message: "Message",
    messagePlaceholder: "Tell us about your project...",
    send: "Send Message",
    sending: "Sending...",
    sent: "Message Sent!",
    sentShort: "Sent!",
    successNote:
      "Thanks, your message is on its way. We'll be in touch within 24-48 hours.",
    responseNote: "We typically respond within 24-48 hours.",
    genericError: "Something went wrong. Please try again.",
    networkError: "Couldn't reach the mail service. Please try again.",
    networkErrorWithEmail:
      "Couldn't reach the mail service. Please try again, or email us directly at",
    orEmailUs: "Or email us directly at",
    /** Appended to a label when the field is required. */
    requiredMark: " *",
  },

  // ==========================================================================
  // Project gallery lightbox (aria labels)
  // ==========================================================================
  gallery: {
    /** {n} is the image number, {title} the project. */
    openImage: "Open image {n} of {title} in full screen",
    /** {title}, {category}, {n} substituted at render. */
    imageAlt: "{title} by VADO, {category}, image {n}",
    viewerLabel: "{title} image viewer",
    close: "Close image viewer",
    previous: "Previous image",
    next: "Next image",
  },

  // ==========================================================================
  // Subpages
  // ==========================================================================
  pages: {
    about: {
      metaTitle: "About Our Architecture and Engineering Consultancy in Al Khobar",
      metaDescription:
        "VADO is a multidisciplinary architecture and engineering consultancy in Al Khobar, Saudi Arabia, established in 1994 by VISION Arch. & Engineering Consultants.",
      kicker: "About VADO",
      heading:
        "An architecture and engineering consultancy in Al Khobar, Saudi Arabia.",
      /** {year} and {city} are substituted from lib/site.ts. */
      intro:
        "VADO (VISION Arch. & Engineering Consultants) is a multidisciplinary consultancy specialized in architecture, engineering, and project development. Established in {year} and based in {city}, the practice delivers innovative, functional, and sustainable solutions tailored to the evolving needs of communities and clients across Saudi Arabia.",
      bandImageAlt:
        "Al Hamra Waterfront masterplan by VADO on the Arabian Gulf",
      whatWeDoKicker: "What we do",
      whatWeDoHeading: "From first concept to final detail",
      whatWeDoBody:
        "Our work spans urban, landscape, cultural, retail, hospitality, and residential projects across the Kingdom, delivered through four integrated disciplines.",
      principlesKicker: "What guides us",
      leadershipKicker: "Leadership",
      leadershipHeading: "Meet our people",
      ctaHeading: "Have a project in mind?",
      ctaBody:
        "Tell us about your vision and we will help you shape it into architecture.",
      ctaLink: "Get in touch",
    },

    services: {
      metaTitle: "Architecture & Engineering Services in Saudi Arabia",
      metaDescription:
        "VADO delivers architectural design, engineering design, project management, and site supervision across Saudi Arabia, from our studio in Al Khobar.",
      kicker: "Our Services",
      heading: "Architecture and engineering services in Saudi Arabia",
      /** {legalName}, {year}, {city}, {country} substituted from lib/site.ts. */
      intro:
        "VADO ({legalName}) is a multidisciplinary consultancy established in {year} and based in {city}, {country}. Our work spans four connected disciplines that carry a project from concept to completion. Explore each one below.",
      /** {project} is the project title. */
      relatedProject: "View related project: {project}",
      ctaHeading: "Have a project in mind?",
      ctaBody:
        "Tell us about your site, your program, and your timeline. We will help you plan the right path, from first design through construction.",
      ctaButton: "Start a conversation",
      /** Alt text for each discipline's paired project image. */
      mediaAlt: {
        "architectural-design":
          "Matal, a waterfront mixed-use development by VADO in Al Khobar",
        "engineering-design":
          "Tholal, a commercial boulevard by VADO in Al Khobar",
        "project-management":
          "Al Hamra Waterfront, a master plan by VADO in Dammam",
        "site-supervision":
          "On-site view of Matal, a waterfront development by VADO in Al Khobar",
      },
    },

    projects: {
      metaTitle: "Architecture Projects in Saudi Arabia",
      metaDescription:
        "Explore VADO's architecture projects in Saudi Arabia: master plans, waterfront developments, commercial boulevards, and private villas across the Eastern Province.",
      kicker: "Selected Work",
      heading: "Architecture projects in Saudi Arabia",
      intro:
        "A selection of VADO's architecture and engineering work across the Eastern Province, spanning waterfront master plans, mixed-use destinations, commercial boulevards, and private residences. Each project reflects a considered balance of place, function, and enduring design.",
      /** {title}, {category}, {location} substituted at render. */
      cardAlt: "{title}, a {category} project by VADO in {location}",
      ctaBody:
        "Have a project in mind? We would be glad to discuss how VADO can bring it to life.",
      ctaLink: "Start a conversation",
    },

    project: {
      notFoundTitle: "Project Not Found",
      back: "Back to Projects",
      /** {title}, {type}, {location} substituted at render. */
      heroAlt: "{title}, {type} by VADO in {location}",
      detailsLabel: "Project Details",
      client: "Client",
      location: "Location",
      type: "Type",
      previous: "Previous",
      next: "Next",
      /** Breadcrumb labels for JSON-LD. */
      breadcrumbHome: "Home",
      breadcrumbProjects: "Projects",
    },

    careers: {
      metaTitle: "Careers — Submit Your CV",
      metaDescription:
        "Join VADO, an architecture and engineering consultancy in Al Khobar, Saudi Arabia. Submit your CV and portfolio to be considered for current and future roles.",
      kicker: "Careers",
      heading: "Join the VADO team",
      intro:
        "We are always glad to meet architects, engineers, and project professionals who care about the craft. Share your CV and portfolio below and we will keep you in mind for current and upcoming roles.",
      howItWorksHeading: "How it works",
      howItWorksBody:
        "Add a link to your CV or portfolio (a Google Drive, Dropbox, or LinkedIn link works well). Tell us the kind of role you are looking for, and we will reach out if there is a fit.",
      preferEmail: "Prefer email? Write to us at",
      roleLabel: "Role of Interest",
      rolePlaceholder: "e.g. Architect, Structural Engineer, BIM",
      cvLabel: "Link to your CV or portfolio",
      cvPlaceholder: "Google Drive, Dropbox, or LinkedIn link",
      noteLabel: "Short note",
      notePlaceholder: "Anything you'd like us to know (optional)",
      submitLabel: "Submit Application",
      successText:
        "Thanks, your application is on its way. We'll be in touch if there's a fit.",
      /** Web3Forms subject line. Kept English so the inbox stays sortable. */
      emailSubject: "New CV submission — VADO Careers",
    },

    suppliers: {
      metaTitle: "Suppliers — Register Your Company",
      metaDescription:
        "Suppliers and vendors: register your company with VADO, an architecture and engineering consultancy in Al Khobar, Saudi Arabia, to be considered for our projects.",
      kicker: "Suppliers",
      heading: "Become a VADO supplier",
      intro:
        "We work with reliable suppliers and vendors across materials, products, and specialist services. Register your company below and our team will add you to our list for relevant projects.",
      howItWorksHeading: "How it works",
      howItWorksBody:
        "Share your company details and what you supply. We keep this on file and reach out when there is a project that matches what you offer.",
      preferEmail: "Prefer email? Write to us at",
      companyLabel: "Company Name",
      companyPlaceholder: "Your company name",
      contactPersonLabel: "Contact Person",
      contactPersonPlaceholder: "Full name",
      supplierEmailPlaceholder: "company@email.com",
      categoryLabel: "What you supply",
      categoryPlaceholder: "Products or services you provide",
      websiteLabel: "Website",
      websitePlaceholder: "https://",
      aboutLabel: "About your company",
      aboutPlaceholder: "Tell us about your company (optional)",
      submitLabel: "Register as a Supplier",
      successText:
        "Thanks, your details are on their way. We'll review and reach out for a fit.",
      /** Web3Forms subject line. Kept English so the inbox stays sortable. */
      emailSubject: "New supplier enquiry — VADO",
    },
  },

  /** Homepage enquiry form subject. Kept English so the inbox stays sortable. */
  enquirySubject: "New enquiry from the VADO website",

  // ==========================================================================
  // FAQ structured data (FAQPage JSON-LD on the homepage)
  // ==========================================================================
  faq: [
    {
      question: "What is VADO?",
      answer:
        "VADO (VISION Arch. & Engineering Consultants) is a multidisciplinary architecture and engineering consultancy based in Al Khobar, Saudi Arabia. Established in 1994, it delivers architecture, engineering, and project development services across the Kingdom.",
    },
    {
      question: "Where is VADO located?",
      answer:
        "VADO is headquartered at Al Fardan Tower, Office 401, in Al Khobar, Saudi Arabia, and serves clients throughout Saudi Arabia.",
    },
    {
      question: "What services does VADO offer?",
      answer:
        "VADO provides architectural design, engineering design, project management, and site supervision, covering projects from first concept through construction on site.",
    },
    {
      question: "When was VADO established?",
      answer:
        "VADO was established in 1994 and has decades of experience delivering urban, landscape, cultural, retail, hospitality, and residential projects in Saudi Arabia.",
    },
    {
      question: "What types of projects does VADO work on?",
      answer:
        "VADO's portfolio spans waterfront master plans, mixed-use developments, commercial destinations, and private residential villas, including Al Hamra Waterfront, Matal, Tholal, and Courtyard Villa.",
    },
    {
      question: "How can I contact VADO?",
      answer:
        "You can reach VADO by email at info@vado.sa or by phone at +966 542 900 447.",
    },
  ],

  // ==========================================================================
  // Footer
  // ==========================================================================
  footer: {
    blurb:
      "VISION Arch. & Engineering Consultants. Transforming ideas into built realities through thoughtful design and engineering excellence since 1994.",
    contactHeading: "Contact",
    quickLinksHeading: "Quick Links",
    addressLines: ["Al Fardan Tower – Office 401", "Al Khobar, Saudi Arabia"],
    /** {year} is substituted at render. */
    copyright:
      "© {year} VISION Arch. & Engineering Consultants. All rights reserved.",
    linkedin: "LinkedIn",
    instagram: "Instagram",
    twitter: "Twitter",
  },

  // ==========================================================================
  // Sections currently commented out of the homepage. Translated so that
  // re-enabling one never ships an English-only band.
  // ==========================================================================
  hidden: {
    servicesLinks: [
      "Explore our projects",
      "Learn about our vision",
      "Start your project today",
    ],
    featureCards: [
      {
        title: "Architectural Design",
        description:
          "Comprehensive architectural solutions that balance form, function, and identity, transforming concepts into refined, buildable spaces.",
      },
      {
        title: "Engineering Excellence",
        description:
          "Integrated engineering services across structural, mechanical, electrical, and plumbing disciplines to ensure safe and sustainable performance.",
      },
    ],
    blog: {
      kicker: "Latest news",
      heading: "From the blog",
      viewAll: "View all posts",
      posts: [
        {
          title: "The Art of Minimalist Architecture",
          category: "Design",
          date: "September 15, 2023",
        },
        {
          title: "Sustainable Building Materials",
          category: "Sustainability",
          date: "September 10, 2023",
        },
        {
          title: "Urban Planning for the Future",
          category: "Urban",
          date: "September 5, 2023",
        },
        {
          title: "Interior Design Trends 2024",
          category: "Interior",
          date: "August 28, 2023",
        },
      ],
    },
  },
};

/**
 * The contract every other language must satisfy. Derived from the English
 * object above, so this type updates itself the moment a key is added.
 */
export type Dictionary = typeof en;

export default en;
