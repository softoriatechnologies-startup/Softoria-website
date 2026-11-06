import React from 'react';
import Badge from '../components/common/Badge';
import { COMPANY_CONFIG } from '../config/companyConfig';

export default function TermsConditions() {
  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-4 mb-10">
        <Badge variant="gold">Legal Documentation</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-softoria-black tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-sm text-softoria-greyLight">
          Last Updated: November 2026 · {COMPANY_CONFIG.name}
        </p>
      </div>

      <div className="prose prose-sm sm:prose max-w-none text-softoria-greyDark space-y-6 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-softoria-black">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the website of {COMPANY_CONFIG.name}, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please discontinue using this website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-softoria-black">2. Intellectual Property Rights</h2>
          <p>
            All content, brand emblems, trade names, graphics, layouts, and software demonstrations present on this website are the intellectual property of {COMPANY_CONFIG.name} and are protected under applicable intellectual property laws. Unauthorized duplication or distribution is prohibited.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-softoria-black">3. Scope of Software Services</h2>
          <p>
            Information, case studies, and service overviews provided on this website are for informational and discovery purposes. Formal software development engagements, deliverables, milestones, payment schedules, and warranties are governed by separate, mutually executed Master Services Agreements (MSAs) and Statements of Work (SOWs).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-softoria-black">4. Disclaimer of Warranties</h2>
          <p>
            This website and its informational content are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied, including fitness for a particular commercial purpose.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-softoria-black">5. Inquiries and Notice</h2>
          <p>
            Any formal legal or commercial inquiries should be addressed to{' '}
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

