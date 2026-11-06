import React from 'react';
import { Layers, CheckCircle2, ExternalLink, Github, Code, ArrowRight } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function ProjectModal({ project, isOpen, onClose, onEnquireAboutProject }) {
  if (!project) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project.title}
      subtitle={project.category}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Project Header Tag */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="gold">{project.badge || 'Featured Work'}</Badge>
          <span className="text-xs text-softoria-greyLight">Enterprise Case Study</span>
        </div>

        {/* Long Description */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-softoria-black mb-2">
            Project Overview
          </h4>
          <p className="text-sm leading-relaxed text-softoria-greyDark">
            {project.longDescription || project.description}
          </p>
        </div>

        {/* Key Architectural Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-softoria-black mb-3">
              Engineered Capabilities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-softoria-greyDark bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                  <CheckCircle2 className="w-4 h-4 text-softoria-gold shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technology Stack Tags */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-softoria-black mb-2.5 flex items-center gap-2">
            <Code className="w-4 h-4 text-softoria-gold" />
            <span>Technology Stack</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-softoria-dark text-white rounded-md text-xs font-medium tracking-wide border border-softoria-greyMedium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links & Placeholder Notice */}
        <div className="pt-4 border-t border-gray-100 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            {project.viewUrl ? (
              <a
                href={project.viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-softoria-gold text-softoria-black text-xs font-semibold rounded-md hover:bg-softoria-goldLight"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Visit Live Application</span>
              </a>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gray-100 text-gray-500 text-xs font-medium rounded-md border border-gray-200">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo: Available Upon Client Consultation</span>
              </div>
            )}

            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-softoria-black text-white text-xs font-semibold rounded-md hover:bg-softoria-greyDark"
              >
                <Github className="w-4 h-4" />
                <span>View Repository</span>
              </a>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gray-100 text-gray-500 text-xs font-medium rounded-md border border-gray-200">
                <Github className="w-3.5 h-3.5" />
                <span>Source Code: Private Repository</span>
              </div>
            )}
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onClose();
                if (onEnquireAboutProject) onEnquireAboutProject(project.title);
              }}
              icon={ArrowRight}
            >
              Discuss Similar Project
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

