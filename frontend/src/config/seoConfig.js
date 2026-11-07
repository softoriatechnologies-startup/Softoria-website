/**
 * Softoria Technologies - Stage 2 Route-Specific SEO Metadata Configuration
 * Production Domain: https://cheerful-chimera-830f66.netlify.app
 */

export const SEO_BASE_URL = 'https://cheerful-chimera-830f66.netlify.app';

export const ROUTE_SEO_METADATA = {
  '/': {
    title: 'Softoria Technologies | Custom Software & Digital Solutions',
    description: 'Softoria Technologies is a software development company creating customized digital solutions, scalable web apps, and enterprise platforms to help businesses grow.',
    ogTitle: 'Softoria Technologies | Technology That Moves You Forward',
    ogDescription: 'Building customized digital solutions that help businesses simplify operations, solve real-world challenges, and achieve sustainable growth.',
    twitterTitle: 'Softoria Technologies | Technology That Moves You Forward',
    twitterDescription: 'Custom software development, web applications, SaaS, and enterprise digital solutions.'
  },
  '/about': {
    title: 'About Us | Softoria Technologies — Software Engineering Company',
    description: 'Learn about Softoria Technologies, our mission, vision, and engineering philosophy. We build dependable, customized digital solutions tailored for sustainable business growth.',
    ogTitle: 'About Softoria Technologies | Engineering Digital Solutions',
    ogDescription: 'Discover our mission, vision, and core engineering principles focused on solving operational bottlenecks with resilient software.',
    twitterTitle: 'About Us | Softoria Technologies',
    twitterDescription: 'Software development company focused on building customized digital solutions that simplify business operations.'
  },
  '/services': {
    title: 'Software Development Services | Softoria Technologies',
    description: 'Explore software engineering services by Softoria Technologies: custom software, web applications, SaaS platforms, ERP/CRM systems, and API integrations.',
    ogTitle: 'Software Engineering Services | Softoria Technologies',
    ogDescription: 'Bespoke enterprise software, high-performance web applications, scalable SaaS systems, ERP/CRM platforms, and secure API integrations.',
    twitterTitle: 'Software Engineering Services | Softoria Technologies',
    twitterDescription: 'Custom software development, web applications, SaaS, ERP/CRM, and API development services by Softoria Technologies.'
  },
  '/technologies': {
    title: 'Technologies & Architectural Stack | Softoria Technologies',
    description: 'Discover the battle-tested technology stack used by Softoria Technologies: React, Node.js, Express, MongoDB, MySQL, and cloud infrastructure engineered for scale.',
    ogTitle: 'Modern Technology Stack & Standards | Softoria Technologies',
    ogDescription: 'Our engineering stack: React, Node.js, Express, MongoDB, MySQL, and REST APIs engineered for performance, security, and long-term maintainability.',
    twitterTitle: 'Modern Technology Stack | Softoria Technologies',
    twitterDescription: 'Battle-tested frameworks, defensive security, and scalable database architectures engineered by Softoria Technologies.'
  },
  '/contact': {
    title: 'Contact Softoria Technologies | Start Your Software Project',
    description: 'Get in touch with Softoria Technologies. Discuss your software development requirements, request a technical discovery consultation, or connect via phone and WhatsApp.',
    ogTitle: 'Contact Softoria Technologies | Direct Software Inquiries',
    ogDescription: 'Connect with our solutions team for custom software architecture, web development consultations, or project discovery briefs.',
    twitterTitle: 'Contact Softoria Technologies',
    twitterDescription: 'Start your software discovery consultation with Softoria Technologies. Direct inquiries, phone support, and WhatsApp chats.'
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Softoria Technologies',
    description: 'Read the Privacy Policy of Softoria Technologies. Learn how we handle client enquiries, protect confidential project data, and safeguard proprietary business information.',
    ogTitle: 'Privacy Policy | Softoria Technologies',
    ogDescription: 'Official privacy policy detailing our data handling practices, mutual NDA confidentiality standards, and visitor protection.',
    twitterTitle: 'Privacy Policy | Softoria Technologies',
    twitterDescription: 'Official privacy policy and confidentiality standards of Softoria Technologies.'
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions | Softoria Technologies',
    description: 'Review the Terms and Conditions for using the Softoria Technologies website and engaging our custom software development services and digital solutions.',
    ogTitle: 'Terms & Conditions | Softoria Technologies',
    ogDescription: 'Official terms of service, intellectual property guidelines, and service agreement standards for Softoria Technologies.',
    twitterTitle: 'Terms & Conditions | Softoria Technologies',
    twitterDescription: 'Official terms of service and intellectual property guidelines for Softoria Technologies.'
  }
};

/**
 * Normalizes the current pathname:
 * - Removes query parameters and hash fragments
 * - Trims trailing slashes (except root '/')
 */
export const normalizePathname = (pathname) => {
  if (!pathname || pathname === '/') return '/';
  const cleanPath = pathname.split('?')[0].split('#')[0].trim();
  return cleanPath.length > 1 && cleanPath.endsWith('/')
    ? cleanPath.replace(/\/+$/, '')
    : cleanPath;
};

