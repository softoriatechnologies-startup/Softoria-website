import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  ArrowRight, 
  MessageCircle, 
  Mail
} from 'lucide-react';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';

export const FAQ_DATA = [
  {
    id: 'services',
    question: 'What services does Softoria Technologies provide?',
    featuredOnHome: true,
    renderAnswer: () => (
      <p>
        Softoria Technologies provides end-to-end software engineering and digital development services. 
        Our core capabilities include modern website development, responsive web applications, bespoke 
        business software, multi-tenant SaaS platforms, e-commerce solutions, enterprise dashboards, 
        RESTful API development and integrations, and ongoing software optimization designed to help businesses 
        simplify operations and scale with confidence.
      </p>
    )
  },
  {
    id: 'custom-dev',
    question: 'Do you develop custom websites and web applications?',
    featuredOnHome: true,
    renderAnswer: () => (
      <p>
        Yes. Every solution we build is engineered specifically around each client&apos;s unique business goals, 
        workflows, and functional requirements. Rather than deploying rigid off-the-shelf templates, our team 
        architects and develops tailored web applications and websites from the ground up, ensuring optimum 
        performance, security, intuitive user experience, and seamless cross-device responsiveness.
      </p>
    )
  },
  {
    id: 'technologies',
    question: 'Which technologies do you use?',
    featuredOnHome: true,
    renderAnswer: () => (
      <div className="space-y-3">
        <p>
          We leverage modern, industry-standard technologies selected to suit the specific performance, security, 
          and scalability demands of each project:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
            <span className="w-2 h-2 rounded-full bg-softoria-gold mt-1.5 shrink-0" />
            <div className="text-xs sm:text-sm">
              <span className="font-semibold text-softoria-black">Frontend:</span> React, JavaScript (ES6+), HTML5, Tailwind CSS
            </div>
          </div>
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
            <span className="w-2 h-2 rounded-full bg-softoria-gold mt-1.5 shrink-0" />
            <div className="text-xs sm:text-sm">
              <span className="font-semibold text-softoria-black">Backend:</span> Node.js, Express, RESTful APIs
            </div>
          </div>
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
            <span className="w-2 h-2 rounded-full bg-softoria-gold mt-1.5 shrink-0" />
            <div className="text-xs sm:text-sm">
              <span className="font-semibold text-softoria-black">Databases:</span> MongoDB, MySQL
            </div>
          </div>
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
            <span className="w-2 h-2 rounded-full bg-softoria-gold mt-1.5 shrink-0" />
            <div className="text-xs sm:text-sm">
              <span className="font-semibold text-softoria-black">DevOps & Tooling:</span> Git, CI/CD, Cloud Hosting, Postman
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'process',
    question: 'How does your development process work?',
    featuredOnHome: true,
    renderAnswer: () => (
      <div className="space-y-3">
        <p>
          Our development lifecycle follows a disciplined, transparent six-stage engineering methodology:
        </p>
        <ol className="space-y-2 pt-1 text-xs sm:text-sm">
          <li className="flex items-start gap-2.5">
            <span className="font-mono font-bold text-softoria-gold shrink-0">01.</span>
            <span><strong className="text-softoria-black font-semibold">Requirement Discussion:</strong> Understanding your operational goals, user workflows, and core feature requirements.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-mono font-bold text-softoria-gold shrink-0">02.</span>
            <span><strong className="text-softoria-black font-semibold">Planning & Architecture:</strong> Designing system architecture, database schemas, and sprint roadmaps.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-mono font-bold text-softoria-gold shrink-0">03.</span>
            <span><strong className="text-softoria-black font-semibold">UI/UX Design:</strong> Creating responsive wireframes, component styles, and user flow prototypes.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-mono font-bold text-softoria-gold shrink-0">04.</span>
            <span><strong className="text-softoria-black font-semibold">Development Sprints:</strong> Building clean, modular, and maintainable frontend and backend code.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-mono font-bold text-softoria-gold shrink-0">05.</span>
            <span><strong className="text-softoria-black font-semibold">Testing & QA:</strong> Running cross-browser validation, responsiveness checks, and security reviews.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-mono font-bold text-softoria-gold shrink-0">06.</span>
            <span><strong className="text-softoria-black font-semibold">Deployment & Handover:</strong> Launching to secure cloud hosting with continuous monitoring and documentation.</span>
          </li>
        </ol>
      </div>
    )
  },
  {
    id: 'pricing',
    question: 'How much does a website or application cost?',
    featuredOnHome: true,
    renderAnswer: () => (
      <p>
        Project pricing depends directly on the specific scope of work, technical architecture, feature complexity, 
        and integration requirements. Because each client&apos;s solution is customized rather than assembled from 
        generic templates, we do not use arbitrary fixed prices. We invite you to contact us with your project details, 
        and our team will provide a transparent, itemized quotation tailored to your exact requirements.
      </p>
    )
  },
  {
    id: 'timeline',
    question: 'How long does a project take?',
    featuredOnHome: false,
    renderAnswer: () => (
      <p>
        Project duration depends on the overall size, functional scope, architectural complexity, and feedback cycles 
        of your project. A focused business website or early-stage MVP typically requires less time than an enterprise-scale 
        software system or multi-user SaaS platform. During our initial discovery and requirement analysis, we define clear 
        sprint milestones and deliver an estimated timeline tailored to your project.
      </p>
    )
  },
  {
    id: 'maintenance',
    question: 'Do you provide website maintenance and support?',
    featuredOnHome: false,
    renderAnswer: () => (
      <p>
        Yes, we provide ongoing maintenance and post-deployment technical support to ensure your application remains 
        secure, stable, and up to date. Our support capabilities include regular software and dependency updates, security 
        patch management, bug fixes, database backups, performance monitoring, and iterative feature enhancements as your 
        business requirements evolve.
      </p>
    )
  },
  {
    id: 'start-project',
    question: 'How can I start a project with Softoria?',
    featuredOnHome: true,
    renderAnswer: () => (
      <div className="space-y-3">
        <p>
          Starting a project is straightforward. You can connect with our engineering team through our website contact form, 
          send an email, or message us directly on WhatsApp to discuss your project requirements:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-softoria-black">
              <Mail className="w-3.5 h-3.5 text-softoria-gold" />
              <span>Email Us:</span>
            </div>
            <div className="text-xs flex flex-col gap-0.5">
              <a 
                href="mailto:softoriatech@gmail.com" 
                className="text-softoria-greyDark hover:text-softoria-gold transition-colors break-all"
              >
                softoriatech@gmail.com
              </a>
              <a 
                href="mailto:softoriatechnologies@gmail.com" 
                className="text-softoria-greyDark hover:text-softoria-gold transition-colors break-all"
              >
                softoriatechnologies@gmail.com
              </a>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-softoria-black">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Direct:</span>
            </div>
            <div className="text-xs flex flex-col gap-0.5">
              <a 
                href="https://wa.me/919524049732" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-softoria-greyDark hover:text-softoria-gold transition-colors"
              >
                +91 95240 49732
              </a>
              <a 
                href="https://wa.me/917010911745" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-softoria-greyDark hover:text-softoria-gold transition-colors"
              >
                +91 70109 11745
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

export default function FaqSection({ limit, onOpenPopup, className = '' }) {
  // If limit is 6, show the 6 featured home questions; otherwise display all 8
  const displayedItems = limit === 6
    ? FAQ_DATA.filter((item) => item.featuredOnHome)
    : limit
      ? FAQ_DATA.slice(0, limit)
      : FAQ_DATA;

  // Track currently expanded item ID (open first item by default for quick visual cue)
  const [openId, setOpenId] = useState(displayedItems[0]?.id || null);

  const toggleItem = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  return (
    <section 
      id="faq" 
      className={`py-20 sm:py-28 bg-gradient-to-b from-white via-gray-50/60 to-white border-t border-gray-200/80 ${className}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 sm:mb-16">
          <Badge variant="gold">Got Questions?</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-softoria-black tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-softoria-greyLight max-w-2xl mx-auto leading-relaxed">
            Find clear answers to common questions about our software development services, engineering process, technology stack, and client engagement.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5 sm:space-y-4">
          {displayedItems.map((item, index) => {
            const isOpen = openId === item.id;
            const formattedIndex = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
            const questionId = `faq-q-${item.id}`;
            const answerId = `faq-a-${item.id}`;

            return (
              <div
                key={item.id}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? 'bg-white border-softoria-gold/60 shadow-gold-sm ring-1 ring-softoria-gold/20'
                    : 'bg-white border-gray-200/80 hover:border-gray-300 hover:shadow-xs'
                }`}
              >
                <button
                  type="button"
                  id={questionId}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggleItem(item.id)}
                  className="w-full text-left px-5 sm:px-7 py-5 sm:py-5.5 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-softoria-gold rounded-2xl cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 pr-2">
                    <span 
                      className={`font-mono text-xs sm:text-sm font-bold shrink-0 transition-colors duration-200 ${
                        isOpen ? 'text-softoria-gold' : 'text-gray-400 group-hover:text-softoria-gold'
                      }`}
                    >
                      {formattedIndex}
                    </span>
                    <span 
                      className={`text-base sm:text-lg font-bold transition-colors duration-200 leading-snug ${
                        isOpen ? 'text-softoria-black' : 'text-softoria-greyDark group-hover:text-softoria-black'
                      }`}
                    >
                      {item.question}
                    </span>
                  </div>

                  <div 
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 border ${
                      isOpen
                        ? 'bg-softoria-gold/15 border-softoria-gold text-softoria-gold rotate-180'
                        : 'bg-gray-100/70 border-gray-200 text-gray-500 group-hover:bg-gray-100 group-hover:text-softoria-black group-hover:border-gray-300 rotate-0'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                  </div>
                </button>

                {/* Animated Dropdown Content */}
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-7 pb-6 pt-1 text-softoria-greyLight text-sm sm:text-base leading-relaxed border-t border-gray-100/90">
                      {item.renderAnswer()}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Support Callout */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-gray-50 via-white to-gray-50 border border-gray-200 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-softoria-gold/15 text-softoria-gold mx-auto">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-softoria-black">
              Have a Question That Isn&apos;t Answered Here?
            </h3>
            <p className="text-sm sm:text-base text-softoria-greyLight max-w-xl mx-auto">
              Our engineering team is always available to review your project ideas, discuss technical feasibility, and answer any questions.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {onOpenPopup && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => onOpenPopup()}
                icon={ArrowRight}
                iconPosition="right"
              >
                Discuss Your Project
              </Button>
            )}
            <a
              href="https://wa.me/919524049732"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 text-sm font-semibold text-softoria-greyDark bg-white hover:bg-gray-50 hover:border-softoria-gold hover:text-softoria-black transition-colors duration-200"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
