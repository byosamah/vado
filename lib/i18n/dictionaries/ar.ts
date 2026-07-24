/**
 * Arabic Dictionary (Modern Standard Arabic)
 * ==========================================
 * Typed against `Dictionary` (= typeof en), so the compiler enforces that this
 * file has EXACTLY the same keys as the English one. A key missing here fails
 * the build; a key here that English does not have also fails the build.
 *
 * Translation notes for future editors:
 *  - The brand is written ڤادو in running Arabic text, while the logo stays Latin.
 *    The first letter is ڤ (VEH, U+06A4), ف with THREE dots, not the one-dot ف.
 *    That is deliberate: Arabic has no native /v/, and ڤ is the Gulf convention
 *    for preserving it in a foreign name, so ڤادو reads "VADO" rather than
 *    "FADO". Conservative MSA would spell loanwords with ف (فيديو, فيينا); the
 *    firm chose the pronunciation-preserving form. Do NOT "correct" it to ف.
 *  - The legal name is TRANSLATED, not transliterated: "VISION Arch. &
 *    Engineering Consultants" is الرؤيا للاستشارات المعمارية والهندسية. So the
 *    two halves of the name are handled differently on purpose — ڤادو keeps its
 *    foreign sound because it is a coined mark, while VISION becomes the Arabic
 *    word because it carries meaning. Do not "fix" this to ڤيجن.
 *  - Project names are the firm's own Arabic names, not translations of the
 *    Latin ones: Tholal is ظُلل (note the damma), Matal is مطل. Keep the
 *    diacritic; it distinguishes ظُلل from the plural ظِلال.
 *  - Western numerals (1994, 401, +966) throughout, matching Saudi corporate
 *    web convention and keeping the numeric design consistent across editions.
 *  - "Site Supervision" renders as الإشراف على التنفيذ, the standard Saudi
 *    engineering term, rather than a literal الإشراف على الموقع.
 *  - Copy that referenced physical position in English ("the form on the left")
 *    is rewritten to be direction-neutral, because the layout mirrors in RTL.
 *  - Web3Forms subject lines stay in English but carry an (AR) marker, so the
 *    shared inbox stays sortable AND shows which edition the lead came from.
 */

import type { Dictionary } from "./en";

const ar: Dictionary = {
  meta: {
    siteTitle: "ڤادو | استشاريو العمارة والهندسة في الخبر",
    titleTemplate: "%s | ڤادو",
    description:
      "استشارات معمارية وهندسية في الخبر، المملكة العربية السعودية. منذ عام 1994 تقدّم ڤادو التصميم والهندسة وإدارة المشاريع في أنحاء المملكة.",
    longDescription:
      "ڤادو (الرؤيا للاستشارات المعمارية والهندسية) شركة استشارات معمارية وهندسية متعددة التخصصات في الخبر بالمملكة العربية السعودية. تأسست عام 1994، وتقدّم التصميم المعماري والتصميم الهندسي وإدارة المشاريع والإشراف على التنفيذ لمشاريع عمرانية وبيئية وثقافية وتجارية وضيافية وسكنية في أنحاء المملكة.",
    keywords: [
      "ڤادو",
      "الرؤيا للاستشارات المعمارية والهندسية",
      "شركة عمارة في السعودية",
      "استشارات هندسية الخبر",
      "مكتب استشارات معمارية الخبر",
      "التخطيط العمراني السعودية",
      "التصميم الحضري",
      "عمارة المواقع والمناظر الطبيعية",
      "إدارة المشاريع",
      "الإشراف على التنفيذ",
    ],
    ogImageAlt:
      "المخطط العام لواجهة الحمراء البحرية من تصميم ڤادو على الخليج العربي",
  },

  brand: {
    shortName: "ڤادو",
    legalName: "الرؤيا للاستشارات المعمارية والهندسية",
    street: "برج الفردان، مكتب 401",
    city: "الخبر",
    region: "المنطقة الشرقية",
    country: "المملكة العربية السعودية",
  },

  nav: {
    about: "عن ڤادو",
    projects: "المشاريع",
    services: "خدماتنا",
    team: "الفريق",
    contact: "تواصل معنا",
    logoAlt: "استشارات ڤادو",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
  },

  langSwitcher: {
    label: "تغيير اللغة",
    switchTo: "التبديل إلى الإنجليزية",
  },

  a11y: {
    skipToContent: "تخطَّ إلى المحتوى",
  },

  services: [
    {
      id: "architectural-design",
      name: "التصميم المعماري",
      description:
        "حلول معمارية مبتكرة توازن بين الجمال والوظيفة والسياق، فتحوّل الرؤية إلى عمارة.",
    },
    {
      id: "engineering-design",
      name: "التصميم الهندسي",
      description:
        "هندسة إنشائية وكهروميكانيكية متكاملة تضمن السلامة والكفاءة والاستدامة في كل مشروع.",
    },
    {
      id: "project-management",
      name: "إدارة المشاريع",
      description:
        "إدارة شاملة للمشروع من الفكرة حتى التسليم، توائم بين الجودة والجدول الزمني والميزانية.",
    },
    {
      id: "site-supervision",
      name: "الإشراف على التنفيذ",
      description:
        "إشراف ميداني متخصص يحقّق الدقة والاتساق والتميّز في التنفيذ.",
    },
  ],

  principles: [
    {
      id: "01",
      title: "الابتكار",
      description:
        "نحوّل الرؤية إلى عمارة، ونسعى إلى تصميم خلّاق واستشرافي يستجيب للسياق والغاية.",
    },
    {
      id: "02",
      title: "الاستدامة",
      description:
        "نصمّم بمسؤولية، فنصوغ بيئات وظيفية بُنيت لتخدم المجتمعات وتدوم لأجيال.",
    },
    {
      id: "03",
      title: "الإتقان",
      description:
        "نلتزم بالصرامة الهندسية والتنفيذ المنضبط، من الفكرة الأولى حتى آخر تفصيل في الموقع.",
    },
  ],

  team: [
    { name: "م. خالد الملا", role: "الرئيس" },
    { name: "م. معتز الملا", role: "نائب الرئيس وكبير المعماريين" },
  ],

  home: {
    srHeading:
      "ڤادو: استشاريو العمارة والهندسة في الخبر، المملكة العربية السعودية",

    hero: {
      tagline: "تأسست عام 1994 · الخبر",
      slideAlt: "{title}، مشروع {category} من تصميم ڤادو",
    },

    about: {
      kicker: "عن ڤادو",
      headlineLines: ["حيث تتحوّل", "الرؤية إلى", "عمارة."],
      body: "ڤادو (الرؤيا للاستشارات المعمارية والهندسية) شركة استشارية متعددة التخصصات في العمارة والهندسة وتطوير المشاريع. وبخبرة تمتد عقودًا، تقدّم ڤادو حلولًا مبتكرة وعملية ومستدامة مصمّمة لتلبية الاحتياجات المتغيّرة للمجتمعات والعملاء في أنحاء المملكة العربية السعودية.",
      imageAlt: "فيلا الفناء من تصميم ڤادو، رواق مقوّس في ضوء المساء الدافئ",
    },

    portfolio: {
      kicker: "أعمالنا",
      viewAll: "عرض جميع المشاريع",
    },

    quote: {
      kicker: "بيان رؤية ڤادو",
      statement:
        "أن نصوغ فضاءات ذات معنى عبر تصميم مدروس وتميّز هندسي، فنخلق بيئات تُلهم المجتمعات وتخدمها وتدوم لأجلها.",
    },

    team: {
      kicker: "القيادة",
      headline: "تعرّف على فريقنا",
      memberAlt: "{name}، {role} في ڤادو",
    },

    principles: {
      kicker: "ما يوجّهنا",
    },

    contact: {
      kicker: "تواصل معنا",
      headlineLines: ["هل أنت مستعد لتحويل", "رؤيتك إلى واقع؟"],
      intro:
        "تواصل معنا لمناقشة مشروعك ولتعرف كيف يمكن لڤادو أن تحوّل أفكارك إلى واقع.",
      infoHeading: "معلومات التواصل",
      emailLabel: "البريد الإلكتروني",
      phoneLabel: "الهاتف",
      addressLabel: "المقر الرئيسي",
      addressLines: ["برج الفردان – مكتب 401", "الخبر، المملكة العربية السعودية"],
      otherEnquiries:
        "النموذج المجاور مخصّص لاستفسارات المشاريع. إن كنت هنا لغرض آخر:",
      careersLabel: "التوظيف",
      careersLink: "أرسل سيرتك الذاتية",
      suppliersLabel: "الموردون",
      suppliersLink: "سجّل كمورّد",
      established: "تأسست عام 1994 • الخبر، المملكة العربية السعودية",
    },

    cta: {
      headline: "لنبنِ المستقبل.",
      button: "ابدأ مشروعك",
    },
  },

  forms: {
    fullName: "الاسم الكامل",
    fullNamePlaceholder: "اسمك الكامل",
    email: "البريد الإلكتروني",
    emailPlaceholder: "your@email.com",
    phone: "رقم الهاتف",
    phonePlaceholder: "+966 XXX XXX XXX",
    message: "الرسالة",
    messagePlaceholder: "أخبرنا عن مشروعك...",
    send: "إرسال الرسالة",
    sending: "جارٍ الإرسال...",
    sent: "تم إرسال الرسالة!",
    sentShort: "تم الإرسال!",
    successNote:
      "شكرًا لك، رسالتك في طريقها إلينا. سنتواصل معك خلال 24 إلى 48 ساعة.",
    responseNote: "نردّ عادةً خلال 24 إلى 48 ساعة.",
    genericError: "حدث خطأ ما. يُرجى المحاولة مرة أخرى.",
    networkError: "تعذّر الوصول إلى خدمة البريد. يُرجى المحاولة مرة أخرى.",
    networkErrorWithEmail:
      "تعذّر الوصول إلى خدمة البريد. يُرجى المحاولة مرة أخرى، أو راسلنا مباشرة على",
    orEmailUs: "أو راسلنا مباشرة على",
    requiredMark: " *",
  },

  gallery: {
    openImage: "افتح الصورة {n} من {title} بملء الشاشة",
    imageAlt: "{title} من تصميم ڤادو، {category}، صورة {n}",
    viewerLabel: "عارض صور {title}",
    close: "إغلاق عارض الصور",
    previous: "الصورة السابقة",
    next: "الصورة التالية",
  },

  pages: {
    about: {
      metaTitle: "عن شركتنا للاستشارات المعمارية والهندسية في الخبر",
      metaDescription:
        "ڤادو شركة استشارات معمارية وهندسية متعددة التخصصات في الخبر بالمملكة العربية السعودية، تأسست عام 1994 باسم الرؤيا للاستشارات المعمارية والهندسية.",
      kicker: "عن ڤادو",
      heading: "شركة استشارات معمارية وهندسية في الخبر، المملكة العربية السعودية.",
      intro:
        "ڤادو (الرؤيا للاستشارات المعمارية والهندسية) شركة استشارية متعددة التخصصات في العمارة والهندسة وتطوير المشاريع. تأسست عام {year} ومقرّها {city}، وتقدّم حلولًا مبتكرة وعملية ومستدامة مصمّمة لتلبية الاحتياجات المتغيّرة للمجتمعات والعملاء في أنحاء المملكة العربية السعودية.",
      bandImageAlt:
        "المخطط العام لواجهة الحمراء البحرية من تصميم ڤادو على الخليج العربي",
      whatWeDoKicker: "ما نقدّمه",
      whatWeDoHeading: "من الفكرة الأولى إلى آخر تفصيل",
      whatWeDoBody:
        "تمتدّ أعمالنا لتشمل المشاريع العمرانية والبيئية والثقافية والتجارية والضيافية والسكنية في أنحاء المملكة، ونقدّمها عبر أربعة تخصصات متكاملة.",
      principlesKicker: "ما يوجّهنا",
      leadershipKicker: "القيادة",
      leadershipHeading: "تعرّف على فريقنا",
      ctaHeading: "لديك مشروع في ذهنك؟",
      ctaBody: "أخبرنا عن رؤيتك وسنساعدك على صياغتها عمارةً.",
      ctaLink: "تواصل معنا",
    },

    services: {
      metaTitle: "خدمات العمارة والهندسة في المملكة العربية السعودية",
      metaDescription:
        "تقدّم ڤادو التصميم المعماري والتصميم الهندسي وإدارة المشاريع والإشراف على التنفيذ في أنحاء المملكة العربية السعودية، من استوديونا في الخبر.",
      kicker: "خدماتنا",
      heading: "خدمات العمارة والهندسة في المملكة العربية السعودية",
      intro:
        "ڤادو ({legalName}) شركة استشارية متعددة التخصصات تأسست عام {year} ومقرّها {city}، {country}. تمتدّ أعمالنا عبر أربعة تخصصات مترابطة تقود المشروع من الفكرة حتى التسليم. تعرّف على كل تخصص أدناه.",
      relatedProject: "شاهد المشروع المرتبط: {project}",
      ctaHeading: "لديك مشروع في ذهنك؟",
      ctaBody:
        "أخبرنا عن موقعك وبرنامجك وجدولك الزمني، وسنساعدك على رسم المسار الصحيح، من التصميم الأول حتى التنفيذ.",
      ctaButton: "ابدأ الحوار",
      mediaAlt: {
        "architectural-design":
          "مطل، مشروع متعدد الاستخدامات على الواجهة البحرية من تصميم ڤادو في الخبر",
        "engineering-design": "ظُلل، بوليفارد تجاري من تصميم ڤادو في الخبر",
        "project-management":
          "واجهة الحمراء البحرية، مخطط عام من تصميم ڤادو في الدمام",
        "site-supervision":
          "لقطة ميدانية من مطل، مشروع على الواجهة البحرية من تصميم ڤادو في الخبر",
      },
    },

    projects: {
      metaTitle: "مشاريع معمارية في المملكة العربية السعودية",
      metaDescription:
        "استكشف مشاريع ڤادو المعمارية في المملكة العربية السعودية: مخططات عامة، ومشاريع واجهات بحرية، وبوليفارات تجارية، وفلل خاصة في المنطقة الشرقية.",
      kicker: "أعمال مختارة",
      heading: "مشاريع معمارية في المملكة العربية السعودية",
      intro:
        "مجموعة مختارة من أعمال ڤادو المعمارية والهندسية في المنطقة الشرقية، تشمل المخططات العامة للواجهات البحرية، والوجهات متعددة الاستخدامات، والبوليفارات التجارية، والمساكن الخاصة. يعكس كل مشروع توازنًا مدروسًا بين المكان والوظيفة والتصميم الباقي.",
      cardAlt: "{title}، مشروع {category} من تصميم ڤادو في {location}",
      ctaBody: "لديك مشروع في ذهنك؟ يسعدنا أن نناقش كيف يمكن لڤادو أن تحقّقه.",
      ctaLink: "ابدأ الحوار",
    },

    project: {
      notFoundTitle: "المشروع غير موجود",
      back: "العودة إلى المشاريع",
      heroAlt: "{title}، {type} من تصميم ڤادو في {location}",
      detailsLabel: "تفاصيل المشروع",
      client: "العميل",
      location: "الموقع",
      type: "النوع",
      previous: "السابق",
      next: "التالي",
      breadcrumbHome: "الرئيسية",
      breadcrumbProjects: "المشاريع",
    },

    careers: {
      metaTitle: "التوظيف — أرسل سيرتك الذاتية",
      metaDescription:
        "انضم إلى ڤادو، شركة استشارات معمارية وهندسية في الخبر بالمملكة العربية السعودية. أرسل سيرتك الذاتية وأعمالك للنظر فيها للوظائف الحالية والمستقبلية.",
      kicker: "التوظيف",
      heading: "انضم إلى فريق ڤادو",
      intro:
        "يسعدنا دائمًا أن نلتقي بالمعماريين والمهندسين ومحترفي إدارة المشاريع ممن يهتمون بجودة الصنعة. شاركنا سيرتك الذاتية وأعمالك أدناه وسنأخذها بعين الاعتبار للوظائف الحالية والقادمة.",
      howItWorksHeading: "كيف تسير الأمور",
      howItWorksBody:
        "أضف رابطًا لسيرتك الذاتية أو أعمالك (رابط من Google Drive أو Dropbox أو LinkedIn مناسب تمامًا). أخبرنا بنوع الوظيفة التي تبحث عنها، وسنتواصل معك إن كان هناك تناسب.",
      preferEmail: "تفضّل البريد الإلكتروني؟ راسلنا على",
      roleLabel: "الوظيفة المهتم بها",
      rolePlaceholder: "مثال: معماري، مهندس إنشائي، نمذجة BIM",
      cvLabel: "رابط سيرتك الذاتية أو أعمالك",
      cvPlaceholder: "رابط Google Drive أو Dropbox أو LinkedIn",
      noteLabel: "ملاحظة قصيرة",
      notePlaceholder: "أي شيء تودّ أن نعرفه (اختياري)",
      submitLabel: "إرسال الطلب",
      successText:
        "شكرًا لك، طلبك في طريقه إلينا. سنتواصل معك إن كان هناك تناسب.",
      emailSubject: "New CV submission (AR) — VADO Careers",
    },

    suppliers: {
      metaTitle: "الموردون — سجّل شركتك",
      metaDescription:
        "الموردون والبائعون: سجّلوا شركتكم لدى ڤادو، شركة استشارات معمارية وهندسية في الخبر بالمملكة العربية السعودية، للنظر فيها لمشاريعنا.",
      kicker: "الموردون",
      heading: "كن مورّدًا لدى ڤادو",
      intro:
        "نعمل مع موردين وبائعين موثوقين في المواد والمنتجات والخدمات المتخصصة. سجّل شركتك أدناه وسيضيفها فريقنا إلى قائمتنا للمشاريع ذات الصلة.",
      howItWorksHeading: "كيف تسير الأمور",
      howItWorksBody:
        "شاركنا بيانات شركتك وما الذي تورّده. نحتفظ بها لدينا ونتواصل معك عند وجود مشروع يناسب ما تعرضه.",
      preferEmail: "تفضّل البريد الإلكتروني؟ راسلنا على",
      companyLabel: "اسم الشركة",
      companyPlaceholder: "اسم شركتك",
      contactPersonLabel: "الشخص المسؤول",
      contactPersonPlaceholder: "الاسم الكامل",
      supplierEmailPlaceholder: "company@email.com",
      categoryLabel: "ما الذي تورّده",
      categoryPlaceholder: "المنتجات أو الخدمات التي تقدّمها",
      websiteLabel: "الموقع الإلكتروني",
      websitePlaceholder: "https://",
      aboutLabel: "عن شركتك",
      aboutPlaceholder: "أخبرنا عن شركتك (اختياري)",
      submitLabel: "سجّل كمورّد",
      successText:
        "شكرًا لك، بياناتك في طريقها إلينا. سنراجعها ونتواصل معك عند وجود تناسب.",
      emailSubject: "New supplier enquiry (AR) — VADO",
    },
  },

  enquirySubject: "New enquiry from the VADO website (Arabic)",

  faq: [
    {
      question: "ما هي ڤادو؟",
      answer:
        "ڤادو (الرؤيا للاستشارات المعمارية والهندسية) شركة استشارات معمارية وهندسية متعددة التخصصات مقرّها الخبر بالمملكة العربية السعودية. تأسست عام 1994، وتقدّم خدمات العمارة والهندسة وتطوير المشاريع في أنحاء المملكة.",
    },
    {
      question: "أين يقع مقر ڤادو؟",
      answer:
        "يقع المقر الرئيسي لڤادو في برج الفردان، مكتب 401، بمدينة الخبر في المملكة العربية السعودية، وتخدم الشركة عملاءها في جميع أنحاء المملكة.",
    },
    {
      question: "ما الخدمات التي تقدّمها ڤادو؟",
      answer:
        "تقدّم ڤادو التصميم المعماري والتصميم الهندسي وإدارة المشاريع والإشراف على التنفيذ، وتغطي المشروع من الفكرة الأولى حتى التنفيذ في الموقع.",
    },
    {
      question: "متى تأسست ڤادو؟",
      answer:
        "تأسست ڤادو عام 1994، ولديها خبرة تمتد عقودًا في تنفيذ مشاريع عمرانية وبيئية وثقافية وتجارية وضيافية وسكنية في المملكة العربية السعودية.",
    },
    {
      question: "ما أنواع المشاريع التي تعمل عليها ڤادو؟",
      answer:
        "تشمل أعمال ڤادو المخططات العامة للواجهات البحرية والمشاريع متعددة الاستخدامات والوجهات التجارية والفلل السكنية الخاصة، ومن بينها واجهة الحمراء البحرية ومطل وظُلل وفيلا الفناء.",
    },
    {
      question: "كيف يمكنني التواصل مع ڤادو؟",
      answer:
        "يمكنك التواصل مع ڤادو عبر البريد الإلكتروني info@vado.sa أو هاتفيًا على الرقم ‎+966 542 900 447.",
    },
  ],

  footer: {
    blurb:
      "الرؤيا للاستشارات المعمارية والهندسية. نحوّل الأفكار إلى واقع مبني عبر تصميم مدروس وتميّز هندسي منذ عام 1994.",
    contactHeading: "تواصل معنا",
    quickLinksHeading: "روابط سريعة",
    addressLines: ["برج الفردان – مكتب 401", "الخبر، المملكة العربية السعودية"],
    copyright: "© {year} الرؤيا للاستشارات المعمارية والهندسية. جميع الحقوق محفوظة.",
    linkedin: "لينكدإن",
    instagram: "إنستغرام",
    twitter: "تويتر",
  },

  hidden: {
    servicesLinks: [
      "استكشف مشاريعنا",
      "تعرّف على رؤيتنا",
      "ابدأ مشروعك اليوم",
    ],
    featureCards: [
      {
        title: "التصميم المعماري",
        description:
          "حلول معمارية شاملة توازن بين الشكل والوظيفة والهوية، وتحوّل المفاهيم إلى فضاءات مصقولة قابلة للتنفيذ.",
      },
      {
        title: "التميّز الهندسي",
        description:
          "خدمات هندسية متكاملة تشمل التخصصات الإنشائية والميكانيكية والكهربائية والصحية لضمان أداء آمن ومستدام.",
      },
    ],
    blog: {
      kicker: "آخر الأخبار",
      heading: "من المدوّنة",
      viewAll: "عرض جميع المقالات",
      posts: [
        {
          title: "فنّ العمارة البسيطة",
          category: "التصميم",
          date: "15 سبتمبر 2023",
        },
        {
          title: "مواد البناء المستدامة",
          category: "الاستدامة",
          date: "10 سبتمبر 2023",
        },
        {
          title: "التخطيط العمراني للمستقبل",
          category: "العمران",
          date: "5 سبتمبر 2023",
        },
        {
          title: "اتجاهات التصميم الداخلي 2024",
          category: "التصميم الداخلي",
          date: "28 أغسطس 2023",
        },
      ],
    },
  },
};

export default ar;
