import React, { useState } from 'react';
import { ExternalLink, Github, ArrowRight, Building2, ShieldAlert, UtensilsCrossed } from 'lucide-react';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import ProjectModal from '../components/portfolio/ProjectModal';
import { COMPANY_CONFIG } from '../config/companyConfig';

export default function ProjectsSection({ onStartProject }) {
  const [selectedProject, setSelectedProject] = useState(null);

  const projectIcons = {
    'construction-management': Building2,
    'upi-fraud-detection': ShieldAlert,
    'mini-food-ordering': UtensilsCrossed
  };

  return (
    <section id="work" className="py-20 sm:py-28 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <Badge variant="gold">Proven Solutions</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-softoria-black tracking-tight">
            Featured Engineering Projects
          </h2>
          <p className="text-base sm:text-lg text-softoria-greyDark leading-relaxed">
            Real software systems engineered for client workflow automation, payment security, and digital commerce.
          </p>
        </div>

        {/* 3 Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {COMPANY_CONFIG.projects.map((project) => {
            const IconComponent = projectIcons[project.id] || Building2;
            return (
              <Card
                key={project.id}
                variant="light"
                className="p-7 flex flex-col justify-between group hover:border-softoria-gold hover:shadow-gold-md transition-all duration-300"
              >
                <div>
                  {/* Visual Category Banner Header */}
                  <div className="h-44 rounded-xl bg-gradient-to-br from-softoria-black via-softoria-dark to-softoria-greyDark p-5 flex flex-col justify-between text-white mb-6 relative overflow-hidden">
                    <div className="flex items-center justify-between z-10">
                      <Badge variant="gold" size="sm">{project.badge}</Badge>
                      <div className="w-9 h-9 rounded-lg bg-softoria-gold/15 flex items-center justify-center text-softoria-gold">
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="z-10">
                      <div className="text-xs text-softoria-gold font-mono uppercase tracking-wider mb-1">
                        Case Study
                      </div>
                      <h4 className="text-base font-bold text-white line-clamp-1">
                        {project.title}
                      </h4>
                    </div>

                    {/* Background pattern */}
                    <div className="absolute inset-0 bg-radial-gradient opacity-10 pointer-events-none" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-softoria-black mb-2.5 group-hover:text-softoria-goldDark transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-softoria-greyDark leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-gray-100 text-softoria-greyDark rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded text-xs font-medium">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-softoria-black uppercase tracking-wider hover:text-softoria-gold transition-colors"
                  >
                    <span>View Project Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="p-2 text-gray-400 hover:text-softoria-black rounded-lg transition-colors"
                    aria-label={`View ${project.title} links`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>

      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        onEnquireAboutProject={(title) => {
          setSelectedProject(null);
          if (onStartProject) onStartProject(title);
        }}
      />
    </section>
  );
}

