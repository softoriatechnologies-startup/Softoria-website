/**
 * Softoria Technologies - Central Company & Brand Configuration
 * Update this single file to manage company details, social links, services, and portfolio projects.
 */

export const COMPANY_CONFIG = {
  name: 'Softoria Technologies',
  legalName: 'Softoria Technologies',
  tagline: 'Build. Innovate. Grow.',
  statement: 'Technology That Moves You Forward.',
  headline: 'Technology That Moves Your Business Forward.',
  subheadline: 'At Softoria Technologies, we transform ideas into reliable digital solutions. From custom software to modern web applications, we help businesses simplify operations and grow with confidence.',
  
  description: 'Softoria Technologies is a software development company focused on creating customized digital solutions that help businesses simplify operations, solve real-world challenges, and achieve sustainable growth.',
  
  // Official Brand Logos
  logos: {
    emblem: '/assets/logos/softoria-emblem.jpg',
    banner: '/assets/logos/softoria-banner.jpg',
    alt: 'Softoria Technologies Logo'
  },

  // Official Company Contact Information
  contact: {
    email: 'softoriatechnologies@gmail.com',
    displayEmail: 'softoriatechnologies@gmail.com',
    phone1: '9524049732',
    phone1Tel: '+919524049732',
    phone2: '70109 11745',
    phone2Tel: '+917010911745',
    displayPhone: '9524049732 / 70109 11745',
    // Retained for backward compatibility
    primaryPhone: '9524049732',
    primaryPhoneTel: '+919524049732',
    secondaryPhone: '70109 11745',
    secondaryPhoneTel: '+917010911745',
    phone: '9524049732',
    whatsapp: 'https://wa.me/919524049732',
    whatsapp1: '+91 95240 49732',
    whatsapp1Url: 'https://wa.me/919524049732',
    whatsapp2: '+91 70109 11745',
    whatsapp2Url: 'https://wa.me/917010911745',
    location: 'Madurai, Tamil Nadu, India',
    officeAvailability: '24 Hours / 7 Days',
    workingHours: '24 Hours / 7 Days',
    websiteUrl: 'https://softoria.com'
  },

  // Social Media Links (Leave empty to cleanly hide icons until official URLs are set)
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/softoria-technologies-9a4452448/',
    instagram: 'https://www.instagram.com/softoriatech/',
    facebook: '', // Set when provided: e.g. 'https://www.facebook.com/softoriatech'
    github: '', // Set when provided: e.g. 'https://github.com/softoria-technologies'
    youtube: '', // Set when provided: e.g. 'https://www.youtube.com/@softoriatech'
    whatsapp: 'https://wa.me/919524049732'
  },

  // Core Services List
  services: [
    {
      id: 'custom-software',
      title: 'Custom Software Development',
      slug: 'custom-software-development',
      iconName: 'Code2',
      shortDescription: 'Tailored software architectures built around your exact business workflows, operational needs, and expansion plans.',
      fullDescription: 'We design and engineer bespoke software applications that solve domain-specific bottlenecks, replace cumbersome manual processes, and provide enterprise-grade reliability.',
      features: ['Bespoke business logic', 'Workflow automation', 'Legacy system modernization', 'Scalable database architecture']
    },
    {
      id: 'website-development',
      title: 'Website Development',
      slug: 'website-development',
      iconName: 'Globe',
      shortDescription: 'High-converting, responsive, and performance-optimized corporate websites that elevate your digital brand authority.',
      fullDescription: 'Our corporate web solutions combine modern visual aesthetics, rapid load speeds, SEO excellence, and intuitive navigation across all desktop, tablet, and mobile devices.',
      features: ['Responsive multi-device layouts', 'SEO & Core Web Vitals optimization', 'Interactive lead capture engines', 'Content management integration']
    },
    {
      id: 'web-applications',
      title: 'Web Application Development',
      slug: 'web-application-development',
      iconName: 'LayoutGrid',
      shortDescription: 'Modern single-page and progressive web applications engineered with secure APIs and responsive interfaces.',
      fullDescription: 'We craft robust web applications utilizing modern component frameworks, reactive state management, and resilient backend services that ensure seamless user interactions.',
      features: ['Single-Page Applications (SPAs)', 'Progressive Web Apps (PWAs)', 'Real-time state synchronization', 'Enterprise role-based security']
    },
    {
      id: 'ecommerce-solutions',
      title: 'eCommerce Solutions',
      slug: 'ecommerce-solutions',
      iconName: 'ShoppingBag',
      shortDescription: 'Scalable digital storefronts featuring friction-free checkouts, product catalogs, and secure payment integrations.',
      fullDescription: 'From custom shopping platforms to multi-vendor marketplaces, we deliver secure, fast, and conversion-optimized digital retail experiences.',
      features: ['Product & inventory tracking', 'Multi-gateway payment processing', 'Order lifecycle management', 'Customer analytics & cart recovery']
    },
    {
      id: 'saas-development',
      title: 'SaaS Application Development',
      slug: 'saas-application-development',
      iconName: 'Layers',
      shortDescription: 'End-to-end multi-tenant Software-as-a-Service platforms built for subscription management and elastic scale.',
      fullDescription: 'We build complete SaaS products featuring tenant isolation, recurring subscription billing, user role governance, and real-time operational monitoring.',
      features: ['Multi-tenant data isolation', 'Automated subscription billing', 'Tiered role & permissions', 'RESTful API developer ecosystem']
    },
    {
      id: 'erp-crm-solutions',
      title: 'ERP and CRM Solutions',
      slug: 'erp-crm-solutions',
      iconName: 'Briefcase',
      shortDescription: 'Integrated operational management systems for enterprise resources, customer pipelines, and staff collaboration.',
      fullDescription: 'Centralize your sales pipelines, workforce coordination, supply chain tracking, and customer records into one unified, accessible management dashboard.',
      features: ['Customer relationship tracking', 'Resource & inventory coordination', 'Automated sales pipelines', 'Cross-departmental reporting']
    },
    {
      id: 'api-development',
      title: 'API Development & Integration',
      slug: 'api-development-integration',
      iconName: 'Network',
      shortDescription: 'Secure, high-throughput REST APIs and third-party integrations connecting disparate software services.',
      fullDescription: 'We build well-documented, versioned RESTful APIs and integrate third-party payment gateways, messaging services, cloud storage, and enterprise databases.',
      features: ['RESTful API architecture', 'Third-party webhook routing', 'Data encryption & rate limiting', 'Comprehensive API documentation']
    },
    {
      id: 'business-dashboards',
      title: 'Business Dashboards & Automation',
      slug: 'business-dashboards-automation',
      iconName: 'BarChart3',
      shortDescription: 'Executive decision-making cockpits with real-time analytics, automated data pipelines, and KPI tracking.',
      fullDescription: 'Transform raw company data into actionable visual insights with customized administrative panels, automated report generation, and metric tracking.',
      features: ['Real-time KPI visualization', 'Role-based admin access', 'Automated data exports', 'Event-triggered alert systems']
    },
    {
      id: 'software-maintenance',
      title: 'Software Maintenance & Support',
      slug: 'software-maintenance-support',
      iconName: 'ShieldCheck',
      shortDescription: 'Proactive system monitoring, security patch management, performance tuning, and technical SLA support.',
      fullDescription: 'Ensure long-term system stability, high availability, database health, security hardening, and rapid incident resolution for your mission-critical applications.',
      features: ['Proactive uptime monitoring', 'Security patching & audits', 'Performance & query tuning', 'Dedicated technical support SLAs']
    }
  ],

  // Real Portfolio Projects
  projects: [
    {
      id: 'construction-management',
      title: 'Construction Management Application',
      category: 'Full-Stack Enterprise Web Application',
      description: 'A full-stack construction management application designed to organize clients, employees, tasks, materials and project-related information.',
      longDescription: 'Engineered to replace fragmented spreadsheets and paperwork with an integrated digital control room. Supervisors and project managers track job site progression, workforce assignments, vendor billing, and raw material logistics in real-time.',
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'REST APIs'],
      highlights: [
        'Centralized client & contractor directory',
        'Real-time task scheduling & workforce allocation',
        'Inventory & materials requisition tracking',
        'Project milestone timeline & budget reporting'
      ],
      viewUrl: '', // Configurable placeholder - modal used if empty
      githubUrl: '', // Configurable placeholder - modal used if empty
      badge: 'Enterprise Platform'
    },
    {
      id: 'upi-fraud-detection',
      title: 'UPI Fraud Detection System',
      category: 'FinTech & Machine Learning Solution',
      description: 'A fraud detection platform that uses machine learning and modern backend technologies to identify suspicious UPI transactions and support fraud monitoring.',
      longDescription: 'Constructed to safeguard digital payment ecosystems by analyzing incoming UPI transaction payloads against anomaly-scoring models. Flags abnormal velocity, suspicious IP origins, and fraudulent recipient accounts in milliseconds.',
      technologies: ['Machine Learning', 'Python', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
      highlights: [
        'Real-time transaction risk scoring engine',
        'Suspicious transaction velocity flags',
        'Interactive compliance & fraud review dashboard',
        'Automated alerting & payment hold triggers'
      ],
      viewUrl: '', // Configurable placeholder - modal used if empty
      githubUrl: '', // Configurable placeholder - modal used if empty
      badge: 'FinTech & Security'
    },
    {
      id: 'mini-food-ordering',
      title: 'Mini Food Ordering Application',
      category: 'eCommerce & Consumer Storefront',
      description: 'A food ordering application with menu browsing, search, cart management, checkout and order processing.',
      longDescription: 'A streamlined, responsive digital storefront designed for rapid ordering and culinary business operations. Features intuitive categorization, fast live searching, friction-free cart state management, and real-time order status tracking.',
      technologies: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
      highlights: [
        'Dynamic menu categorization & instant search',
        'Persistent cart state & order customization',
        'Frictionless checkout experience',
        'Order lifecycle & kitchen dispatch management'
      ],
      viewUrl: '', // Configurable placeholder - modal used if empty
      githubUrl: '', // Configurable placeholder - modal used if empty
      badge: 'eCommerce Solution'
    }
  ],

  // Why Choose Softoria - 6 Genuine Business Pillars
  whyChooseUs: [
    {
      title: 'Customized Solutions',
      description: 'We do not sell one-size-fits-all templates. Every software system is tailored specifically around your unique business workflows and operational objectives.',
      iconName: 'Wrench'
    },
    {
      title: 'Business-Focused Development',
      description: 'We prioritize measurable business outcomes — operational efficiency, revenue growth, and customer satisfaction — over technical complexity for its own sake.',
      iconName: 'Target'
    },
    {
      title: 'User-Friendly Experiences',
      description: 'We build intuitive, clean interfaces that your team and your customers can adopt effortlessly without steep learning curves or friction.',
      iconName: 'Sparkles'
    },
    {
      title: 'Scalable Architecture',
      description: 'From modular backend APIs to resilient database schemas, our applications are engineered to grow smoothly alongside your business volume.',
      iconName: 'TrendingUp'
    },
    {
      title: 'Quality-Focused Engineering',
      description: 'Strict testing, validated inputs, secure authentication, and defensive code patterns ensure your platform remains dependable and secure.',
      iconName: 'CheckCircle2'
    },
    {
      title: 'Reliable Technical Support',
      description: 'We maintain ongoing technical partnerships, providing prompt support, version upgrades, and performance tuning long after launch.',
      iconName: 'Headphones'
    }
  ],

  // Development Lifecycle - 7 Stages
  processStages: [
    {
      number: '01',
      title: 'Requirement Discovery',
      description: 'We delve into your business goals, target users, and workflow challenges to establish clear project boundaries.'
    },
    {
      number: '02',
      title: 'Planning & Analysis',
      description: 'We define the technical stack, architectural data models, system integrations, and milestone timelines.'
    },
    {
      number: '03',
      title: 'UI/UX Design',
      description: 'We design intuitive wireframes and responsive prototypes focused on usability, clarity, and brand consistency.'
    },
    {
      number: '04',
      title: 'Agile Development',
      description: 'Our engineers write clean, maintainable, modular frontend and backend code with continuous code reviews.'
    },
    {
      number: '05',
      title: 'Testing & QA',
      description: 'Rigorous functional, security, responsiveness, and performance testing across multiple screen viewports.'
    },
    {
      number: '06',
      title: 'Deployment',
      description: 'Smooth production deployment to secure cloud infrastructure with CI/CD and domain SSL provisioning.'
    },
    {
      number: '07',
      title: 'Maintenance & Support',
      description: 'Ongoing health monitoring, regular security updates, backup management, and feature enhancements.'
    }
  ],

  // Technologies Stack Grouping
  technologies: [
    {
      category: 'Frontend Engineering',
      items: [
        { name: 'React.js', role: 'Component UI Library', logoKey: 'react' },
        { name: 'JavaScript (ES6+)', role: 'Modern Client Logic', logoKey: 'javascript' },
        { name: 'HTML5', role: 'Semantic Web Structure', logoKey: 'html5' },
        { name: 'CSS3', role: 'Responsive Styling & Media', logoKey: 'css3' },
        { name: 'Tailwind CSS', role: 'Utility-First CSS Framework', logoKey: 'tailwind' },
        { name: 'Material UI', role: 'Component Design System', logoKey: 'mui' },
        { name: 'Vite', role: 'Frontend Build Tooling', logoKey: 'vite' }
      ]
    },
    {
      category: 'Backend & Server Architecture',
      items: [
        { name: 'Node.js', role: 'Event-Driven Runtime', logoKey: 'nodejs' },
        { name: 'Express.js', role: 'RESTful Backend Framework', logoKey: 'express' },
        { name: 'Python', role: 'Server & Processing Logic', logoKey: 'python' },
        { name: 'FastAPI', role: 'High-Performance API Framework', logoKey: 'fastapi' },
        { name: 'RabbitMQ', role: 'Message Broker & Task Queues', logoKey: 'rabbitmq' }
      ]
    },
    {
      category: 'Database & Data Storage',
      items: [
        { name: 'MongoDB', role: 'Document-Oriented Database', logoKey: 'mongodb' },
        { name: 'MongoDB Atlas', role: 'Cloud Database Cluster', logoKey: 'mongodbatlas' },
        { name: 'MySQL', role: 'Relational Database Management', logoKey: 'mysql' },
        { name: 'Redis', role: 'In-Memory Caching & Session Store', logoKey: 'redis' }
      ]
    },
    {
      category: 'Cloud, DevOps & Infrastructure',
      items: [
        { name: 'Docker', role: 'Containerization & Environments', logoKey: 'docker' },
        { name: 'Git', role: 'Distributed Version Control', logoKey: 'git' },
        { name: 'GitHub', role: 'Source Repository & Code Review', logoKey: 'github' }
      ]
    },
    {
      category: 'APIs & System Integrations',
      items: [
        { name: 'REST APIs', role: 'Stateless Service Architecture', logoKey: 'restapi' },
        { name: 'JWT Authentication', role: 'Secure Token-Based Auth', logoKey: 'jwt' },
        { name: 'OAuth 2.0', role: 'Standard Authorization Protocol', logoKey: 'oauth' },
        { name: 'Third-Party API Integration', role: 'External Service Connectors', logoKey: 'thirdpartyapi' }
      ]
    },
    {
      category: 'AI, Data & Machine Learning',
      items: [
        { name: 'Scikit-learn', role: 'Machine Learning & Modeling', logoKey: 'scikitlearn' },
        { name: 'Pandas', role: 'Data Manipulation & Analysis', logoKey: 'pandas' },
        { name: 'Machine Learning', role: 'Predictive & Classifier Models', logoKey: 'machinelearning' },
        { name: 'Anomaly Detection', role: 'Pattern & Transaction Monitoring', logoKey: 'anomalydetection' }
      ]
    }
  ]
};

