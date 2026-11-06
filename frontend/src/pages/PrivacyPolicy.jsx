import React from 'react';
import Badge from '../components/common/Badge';
import { COMPANY_CONFIG } from '../config/companyConfig';

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-4 mb-10">
        <Badge variant="gold">Legal Documentation</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-softoria-black tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-softoria-greyLight">
          Last Updated: November 2026 · {COMPANY_CONFIG.name}
        </p>
      </div>

      <div className="prose prose-sm sm:prose max-w-none text-softoria-greyDark space-y-6 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-softoria-black">1. Information We Collect</h2>
          <p>
            When you interact with the {COMPANY_CONFIG.name} website, submit a project discovery enquiry, or contact us through our digital channels, we collect information necessary to evaluate and respond to your technical requirements. This includes your full name, business email address, phone number, company name, selected service domain, and project descriptions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-softoria-black">2. How We Use Your Information</h2>
          <p>
            Information submitted through our enquiry forms is used solely to assess project feasibility, deliver technical discovery consultations, provide quotation estimates, and communicate about requested engineering services. We do not sell, rent, or trade your contact information to third parties.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-softoria-black">3. Data Security and Confidentiality</h2>
          <p>
            We implement industry-standard cryptographic practices, secure transport protocols (HTTPS/TLS), parameterized database layers, and strict access controls to safeguard submitted data. Mutual Non-Disclosure Agreements (NDAs) are available upon request prior to discussing sensitive business logic or proprietary codebases.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-softoria-black">4. Cookies and Local Storage</h2>
          <p>
            Our website uses minimal local storage strictly for functional purposes: ensuring the project enquiry popup does not repeatedly disrupt visitors once dismissed or submitted. We do not employ third-party tracking or advertising cookies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-softoria-black">5. Contact Regarding Privacy</h2>
          <p>
            For inquiries regarding our privacy standards or to request the deletion of your submitted project inquiry, please contact our team at{' '}
            <a
              href={`mailto:${COMPANY_CONFIG.contact.email}`}
              className="font-semibold text-softoria-black hover:text-softoria-gold underline transition-colors"
            >
              {COMPANY_CONFIG.contact.email}
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}

