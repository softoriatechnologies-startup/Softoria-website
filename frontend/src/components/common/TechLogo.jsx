import React from 'react';
import {
  Workflow,
  ShieldCheck,
  KeyRound,
  Blocks,
  BrainCircuit,
  Activity,
  Code2
} from 'lucide-react';

/**
 * TechLogo Component
 * Renders authentic brand SVG logos for recognized technologies,
 * and clean, consistent neutral Lucide icons for architectural concepts.
 */
export default function TechLogo({ logoKey, name, className = 'w-9 h-9' }) {
  const normalizedKey = (logoKey || name || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  switch (normalizedKey) {
    // ----------------------------------------------------
    // Frontend Engineering
    // ----------------------------------------------------
    case 'react':
    case 'reactjs':
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} aria-label="React.js logo">
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );

    case 'javascript':
    case 'javascriptes6':
    case 'js':
      return (
        <svg viewBox="0 0 630 630" className={className} aria-label="JavaScript logo">
          <rect width="630" height="630" fill="#F7DF1E" rx="80" />
          <path d="m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.4-38.1-25.4-17.34 0-28.33 11-28.33 25.4 0 17.7 11 24.9 36.4 35.9l14.8 6.3c50.3 21.6 78.7 43.6 78.7 93.5 0 53.3-41.9 84.2-97.7 84.2-53.7 0-87.97-28.8-105.77-62.2zm-186.2 3.8c7.6 13.5 14.4 24.9 28.3 24.9 14.4 0 23.7-5.9 23.7-28.7v-201.5h57.5v202.7c0 53.7-31.7 77.8-77.4 77.8-40.2 0-63.9-20.7-74.4-46.1z" />
        </svg>
      );

    case 'html5':
    case 'html':
      return (
        <svg viewBox="0 0 512 512" className={className} aria-label="HTML5 logo">
          <path fill="#E34F26" d="M71 460L30 0h452l-41 460-185 52z" />
          <path fill="#EF652A" d="M256 472l149-41 35-391H256v432z" />
          <path fill="#EBEBEB" d="M109 95h147v64H115zm10 114h137v64H181l6 64h69v64l-95-26z" />
          <path fill="#FFFFFF" d="M256 95h147l-6 64H256zm0 114h137l-13 149-124 35v-64l69-19 7-81H256z" />
        </svg>
      );

    case 'css3':
    case 'css':
      return (
        <svg viewBox="0 0 512 512" className={className} aria-label="CSS3 logo">
          <path fill="#1572B6" d="M71 460L30 0h452l-41 460-185 52z" />
          <path fill="#33A9DC" d="M256 472l149-41 35-391H256v432z" />
          <path fill="#EBEBEB" d="M109 95h147v64H115zm10 114h137v64h-71l6 64h65v64l-95-26z" />
          <path fill="#FFFFFF" d="M256 95h147l-6 64H256zm0 114h137l-13 149-124 35v-64l69-19 7-81H256z" />
        </svg>
      );

    case 'tailwind':
    case 'tailwindcss':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Tailwind CSS logo">
          <path
            fill="#06B6D4"
            d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"
          />
        </svg>
      );

    case 'mui':
    case 'materialui':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Material UI logo">
          <path fill="#007FFF" d="M0 2.475v10.39l3-1.733V5.94l3 1.733 4.5-2.6-4.5-2.6zm24 0l-6 3.466 4.5 2.6-4.5 2.6v5.198l6-3.466zM7.5 8.54l-3 1.733 4.5 2.6 4.5-2.6-3-1.733-1.5.867zm9 0l-1.5.867-1.5-.867-3 1.733 4.5 2.6 4.5-2.6zm-6 6.932l-3 1.733v5.197l3-1.732v-3.465l3-1.733zm3 0l-3 1.733 3 1.733v3.465l3 1.732v-5.197z" />
        </svg>
      );

    case 'vite':
      return (
        <svg viewBox="0 0 32 32" className={className} aria-label="Vite logo">
          <path fill="#BD34FE" d="M29.5 5.5L16.7 28.9c-.3.5-.9.5-1.2 0L2.5 5.5c-.3-.6.1-1.3.8-1.3h25.4c.7 0 1.1.7.8 1.3z" />
          <path fill="#41D1FF" d="M22.7 3.5L16 16.5l-6.7-13c-.3-.5.1-1.2.7-1.2h12c.6 0 1 .7.7 1.2z" />
          <path fill="#FFD62E" d="M17.8 4.2l-8.6 13.5c-.3.5.1 1.1.7 1.1h5.3l-2.4 8c-.2.7.7 1.1 1.1.5l10.3-13.8c.4-.5 0-1.2-.6-1.2h-5.2l2.3-7.5c.2-.6-.5-1.1-.9-.6z" />
        </svg>
      );

    // ----------------------------------------------------
    // Backend & Server Architecture
    // ----------------------------------------------------
    case 'nodejs':
    case 'node':
      return (
        <svg viewBox="0 0 256 289" className={className} aria-label="Node.js logo">
          <path fill="#5FA04E" d="M128 0L249 70v149l-121 70L7 219V70L128 0z" />
          <path fill="#FFFFFF" d="M138 221c-22 0-35-11-35-29v-82c0-5 3-8 8-8s8 3 8 8v82c0 8 5 13 19 13 13 0 18-5 18-13v-82c0-5 3-8 8-8s8 3 8 8v82c0 18-13 29-34 29zm-55-75c-15 0-25-8-25-22 0-15 10-23 25-23 16 0 26 8 26 23 0 14-10 22-26 22zm0-15c6 0 9-3 9-7 0-5-3-8-9-8s-9 3-9 8c0 4 3 7 9 7z" />
        </svg>
      );

    case 'express':
    case 'expressjs':
      return (
        <div className={`${className} flex items-center justify-center font-black text-softoria-black tracking-tighter text-xl bg-gray-100 rounded-lg border border-gray-200 select-none`} aria-label="Express.js logo">
          ex
        </div>
      );

    case 'python':
      return (
        <svg viewBox="0 0 110 110" className={className} aria-label="Python logo">
          <path fill="#3776AB" d="M54.3 0c-27.4 0-25.7 11.9-25.7 11.9l.03 12.3h26.2v3.7H17.7S0 25.9 0 53.6s15.5 26.8 15.5 26.8h9.3V67.3s-.5-15.5 15.2-15.5h26.1s14.6.2 14.6-14.2V14.2S82.4 0 54.3 0zm-14.3 8.3a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6z" />
          <path fill="#FFD43B" d="M55.7 110c27.4 0 25.7-11.9 25.7-11.9l-.03-12.3H55.2V82.1h37.1s17.7 2 17.7-25.7S94.5 29.6 94.5 29.6h-9.3v13.1s.5 15.5-15.2 15.5H43.9s-14.6-.2-14.6 14.2v23.4S27.6 110 55.7 110zm14.3-8.3a3.8 3.8 0 1 1 0-7.6 3.8 3.8 0 0 1 0 7.6z" />
        </svg>
      );

    case 'fastapi':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="FastAPI logo">
          <path fill="#009688" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" />
          <path fill="#FFFFFF" d="M13.2 4.8l-5.6 7.6h4.8l-2 6.8 6.8-8.8h-4.8l2-5.6z" />
        </svg>
      );

    case 'rabbitmq':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="RabbitMQ logo">
          <path fill="#FF6600" d="M21.7 14.2c-.6-.7-1.4-1.2-2.3-1.4.3-.9.3-1.8 0-2.6-.4-1.1-1.3-1.9-2.3-2.3-.5-.2-1-.3-1.6-.3-.3 0-.6.1-.8.2-.4-.8-1-1.5-1.7-2-.8-.6-1.8-.9-2.8-.9-.7 0-1.4.2-2.1.5-.7.4-1.2.9-1.6 1.6-.2.4-.4.8-.5 1.3-.8.2-1.5.6-2.1 1.2-.7.7-1.1 1.6-1.2 2.6v.4c-.6.4-1.1.9-1.5 1.5-.5.8-.8 1.8-.7 2.7.1 1 .5 1.9 1.2 2.6.7.7 1.6 1.1 2.6 1.1h13.2c.9 0 1.7-.4 2.3-1 .6-.6 1-1.5 1-2.4 0-.8-.3-1.6-.8-2.3z" />
        </svg>
      );

    // ----------------------------------------------------
    // Database & Data Storage
    // ----------------------------------------------------
    case 'mongodb':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="MongoDB logo">
          <path fill="#47A248" d="M12.1 0C11.9 0 11.7.1 11.5.3 10.6 1.2 7.8 4.2 6.5 7.4 4.8 11.5 5.5 15.6 7.8 19c1.4 2.1 3.5 3.7 4.2 4.7.1.1.2.2.3.3.1-.1.2-.2.3-.3.7-1 2.8-2.6 4.2-4.7 2.3-3.4 3-7.5 1.3-11.6-1.3-3.2-4.1-6.2-5-7.1-.2-.2-.4-.3-.7-.3z" />
          <path fill="#3FA037" d="M12.1 0v24c.1-.1.2-.2.3-.3.7-1 2.8-2.6 4.2-4.7 2.3-3.4 3-7.5 1.3-11.6-1.3-3.2-4.1-6.2-5-7.1-.2-.2-.4-.3-.7-.3-.1 0-.1 0 0 0z" />
        </svg>
      );

    case 'mongodbatlas':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="MongoDB Atlas logo">
          <rect width="24" height="24" rx="6" fill="#001E2B" />
          <path fill="#00ED64" d="M12 3c-.1 0-.3.1-.4.2-.8.8-3.1 3.4-4.2 6-1.4 3.4-.8 6.9 1.1 9.7 1.1 1.7 2.8 3.1 3.4 3.9.1.1.2.2.2.2s.2-.1.2-.2c.6-.8 2.3-2.1 3.4-3.9 1.9-2.8 2.5-6.2 1.1-9.7-1.1-2.6-3.4-5.2-4.2-6-.2-.1-.4-.2-.5-.2z" />
        </svg>
      );

    case 'mysql':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="MySQL logo">
          <path fill="#4479A1" d="M12.3 3.6C7.2 3.6 3 7.8 3 12.9c0 4.2 2.8 7.7 6.6 8.8-.2-.7-.3-1.6-.3-2.6 0-3.3 2.1-6.1 5.1-7.2.4-.1.8-.2 1.2-.3-.5-1.5-1.7-2.7-3.3-3.1 1.8-.3 3.5.2 4.7 1.4 1.1 1.1 1.6 2.7 1.4 4.3 1.9.9 3.2 2.8 3.2 5.1 0 .6-.1 1.2-.3 1.8 1.9-1.8 3.1-4.3 3.1-7.2 0-5.1-4.2-9.3-9.4-9.3z" />
          <path fill="#F29111" d="M16 14.5c-.4 0-.8.1-1.2.3-3 1.1-5.1 3.9-5.1 7.2 0 1 .1 1.9.3 2.6 1.4.4 2.8.6 4.3.6 5.1 0 9.3-4.2 9.3-9.3 0-.4 0-.7-.1-1.1-1.1 1.8-3.1 3-5.3 3-.7 0-1.4-.1-2.2-.3v-3z" />
        </svg>
      );

    case 'redis':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Redis logo">
          <path fill="#DC382D" d="M12 0L2 5.8v12.4L12 24l10-5.8V5.8L12 0zm-1 3.6l7.4 4.3-3.2 1.9-7.4-4.3 3.2-1.9zm-6.6 3.8L11 11.3v4.6L4.4 12V7.4zm8.6 12.8v-4.9l7-3.7v4.6l-7 4zm7-6.2l-7 3.7v-4.6l7-3.7v4.6z" />
        </svg>
      );

    // ----------------------------------------------------
    // Cloud, DevOps & Infrastructure
    // ----------------------------------------------------
    case 'docker':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Docker logo">
          <path fill="#2496ED" d="M22.5 10.5c-.3-.2-1-.4-1.7-.3-.2-.5-.6-1-1.1-1.3l-.6-.3-.3.5c-.4.7-.4 1.4-.2 2.1-.6.3-1.5.5-2.6.5H2c-.6 0-1 .4-1 1 0 3.7 2.4 7.2 6.8 7.2 5.5 0 8.7-3.2 10.3-6.6.7.1 2.2.1 3.2-1 .4-.4.8-1.1 1.2-1.8v-.1c0-.1 0-.1 0-.2zM3.4 9.4h2v2h-2zm2.6 0h2v2H6zm0-2.6h2v2H6zm2.6 2.6h2v2h-2zm0-2.6h2v2h-2zm2.6 2.6h2v2h-2zm0-2.6h2v2h-2zm2.6 2.6h2v2h-2zm0-2.6h2v2h-2z" />
        </svg>
      );

    case 'git':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Git logo">
          <path fill="#F05032" d="M23.6 10.7l-9.3-9.3c-.6-.6-1.5-.6-2.1 0L9.9 3.7 12.3 6c.6-.2 1.3 0 1.8.4.5.5.7 1.2.5 1.8l2.4 2.4c.6-.2 1.3 0 1.8.5.7.7.7 1.8 0 2.5-.7.7-1.8.7-2.5 0-.5-.5-.7-1.3-.4-1.9L13.7 9c-.2.1-.4.1-.6.1-.2 0-.4 0-.6-.1L9.7 11.8v5.8c.2.2.4.4.5.7.4.7.2 1.6-.4 2.2-.7.7-1.8.7-2.5 0-.7-.7-.7-1.8 0-2.5.5-.5 1.2-.7 1.8-.5V11.2c-.6-.2-1.3-.8-1.5-1.5L.4 12.1c-.6.6-.6 1.5 0 2.1l9.3 9.3c.6.6 1.5.6 2.1 0l11.8-11.8c.6-.6.6-1.5 0-2.1v1.1z" />
        </svg>
      );

    case 'github':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="GitHub logo">
          <path fill="#181717" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );

    // ----------------------------------------------------
    // AI, Data & Machine Learning
    // ----------------------------------------------------
    case 'scikitlearn':
    case 'scikit':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Scikit-learn logo">
          <path fill="#F7931E" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 4c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6z" />
          <path fill="#3499CD" d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" />
        </svg>
      );

    case 'pandas':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Pandas logo">
          <rect x="3" y="4" width="4" height="16" rx="2" fill="#150458" />
          <rect x="10" y="8" width="4" height="12" rx="2" fill="#E70488" />
          <rect x="17" y="2" width="4" height="18" rx="2" fill="#00A3E0" />
        </svg>
      );

    // ----------------------------------------------------
    // Conceptual / Protocol Entries (Lucide Icons with Clean Framing)
    // ----------------------------------------------------
    case 'restapi':
    case 'restapis':
    case 'api':
      return (
        <div className={`${className} flex items-center justify-center text-blue-600 bg-blue-50/80 rounded-xl`}>
          <Workflow className="w-6 h-6" />
        </div>
      );

    case 'jwt':
    case 'jwtauthentication':
      return (
        <div className={`${className} flex items-center justify-center text-purple-600 bg-purple-50/80 rounded-xl`}>
          <ShieldCheck className="w-6 h-6" />
        </div>
      );

    case 'oauth':
    case 'oauth2':
    case 'oauth20':
      return (
        <div className={`${className} flex items-center justify-center text-amber-600 bg-amber-50/80 rounded-xl`}>
          <KeyRound className="w-6 h-6" />
        </div>
      );

    case 'thirdpartyapi':
    case 'thirdpartyapiintegration':
      return (
        <div className={`${className} flex items-center justify-center text-softoria-goldDark bg-amber-50/80 rounded-xl`}>
          <Blocks className="w-6 h-6" />
        </div>
      );

    case 'machinelearning':
    case 'ml':
      return (
        <div className={`${className} flex items-center justify-center text-indigo-600 bg-indigo-50/80 rounded-xl`}>
          <BrainCircuit className="w-6 h-6" />
        </div>
      );

    case 'anomalydetection':
    case 'anomaly':
      return (
        <div className={`${className} flex items-center justify-center text-rose-600 bg-rose-50/80 rounded-xl`}>
          <Activity className="w-6 h-6" />
        </div>
      );

    // Fallback: Graceful lettermark badge
    default:
      return (
        <div className={`${className} flex items-center justify-center bg-gray-100 text-softoria-greyDark font-bold text-xs rounded-xl border border-gray-200 select-none uppercase`}>
          {name ? name.slice(0, 2) : <Code2 className="w-5 h-5 text-softoria-gold" />}
        </div>
      );
  }
}

