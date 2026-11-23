'use client';

import React from 'react';
import StackIcon from 'tech-stack-icons';

export interface TechIconProps {
  className?: string;
  size?: number;
}

// 1. TypeScript
export function TypeScriptIcon({ size = 32, className = '' }: TechIconProps) {
  return <StackIcon name="typescript" className={className} style={{ width: size, height: size }} />;
}

// 2. JavaScript
export function JavaScriptIcon({ size = 32, className = '' }: TechIconProps) {
  return <StackIcon name="js" className={className} style={{ width: size, height: size }} />;
}

// 3. Python (Two-tone official colors)
export function PythonIcon({ size = 32, className = '' }: TechIconProps) {
  return <StackIcon name="python" className={className} style={{ width: size, height: size }} />;
}

// 4. PostgreSQL (Official Slonik elephant)
export function PostgresIcon({ size = 32, className = '' }: TechIconProps) {
  return <StackIcon name="postgresql" className={className} style={{ width: size, height: size }} />;
}

// 5. SQLite (Official feather & cylinder)
export function SqliteIcon({ size = 32, className = '' }: TechIconProps) {
  return <StackIcon name="sqlite" className={className} style={{ width: size, height: size }} />;
}

// 6. Next.js
export function NextjsIcon({ size = 32, className = '' }: TechIconProps) {
  return <StackIcon name="nextjs" className={className} style={{ width: size, height: size }} />;
}

// 7. React
export function ReactIcon({ size = 32, className = '' }: TechIconProps) {
  return <StackIcon name="react" className={className} style={{ width: size, height: size }} />;
}

// 8. Tailwind CSS
export function TailwindIcon({ size = 32, className = '' }: TechIconProps) {
  return <StackIcon name="tailwindcss" className={className} style={{ width: size, height: size }} />;
}

// 9. WebSockets / Socket.io
export function WebSocketIcon({ size = 32, className = '' }: TechIconProps) {
  return <StackIcon name="socketio" className={className} style={{ width: size, height: size }} />;
}

// 10. Node.js
export function NodeIcon({ size = 32, className = '' }: TechIconProps) {
  return <StackIcon name="nodejs" className={className} style={{ width: size, height: size }} />;
}

// 11. Supabase
export function SupabaseIcon({ size = 32, className = '' }: TechIconProps) {
  return <StackIcon name="supabase" className={className} style={{ width: size, height: size }} />;
}

// 12. Docker
export function DockerIcon({ size = 32, className = '' }: TechIconProps) {
  return <StackIcon name="docker" className={className} style={{ width: size, height: size }} />;
}

// 13. Git
export function GitIcon({ size = 32, className = '' }: TechIconProps) {
  return <StackIcon name="git" className={className} style={{ width: size, height: size }} />;
}

// 14. Postman
export function PostmanIcon({ size = 32, className = '' }: TechIconProps) {
  return <StackIcon name="postman" className={className} style={{ width: size, height: size }} />;
}

// 15. Linux / Bash
export function LinuxIcon({ size = 32, className = '' }: TechIconProps) {
  return <StackIcon name="bash" className={className} style={{ width: size, height: size }} />;
}

// 16. Claude (Anthropic Claude official multi-color/terracotta)
export function ClaudeIcon({ size = 32, className = '' }: TechIconProps) {
  return <StackIcon name="claude" className={className} style={{ width: size, height: size }} />;
}

// 17. Codex (OpenAI Codex official green vortex)
export function CodexIcon({ size = 32, className = '' }: TechIconProps) {
  return <StackIcon name="openai" className={className} style={{ width: size, height: size }} />;
}

// 18. Antigravity (Google DeepMind official iridescent emblem)
export function AntigravityIcon({ size = 32, className = '' }: TechIconProps) {
  return <StackIcon name="antigravity" className={className} style={{ width: size, height: size }} />;
}

// 19. n8n (Workflow & Pipeline Automation)
export function N8nIcon({ size = 32, className = '' }: TechIconProps) {
  return <StackIcon name="n8n" className={className} style={{ width: size, height: size }} />;
}

// 20. Playwright (End-to-End Browser Testing)
export function PlaywrightIcon({ size = 32, className = '' }: TechIconProps) {
  return <StackIcon name="playwright" className={className} style={{ width: size, height: size }} />;
}

// 21. Jest (Unit Testing & Assertions)
export function JestIcon({ size = 32, className = '' }: TechIconProps) {
  return <StackIcon name="jest" className={className} style={{ width: size, height: size }} />;
}

// 22. Cypress (E2E & Component QA Testing)
export function CypressIcon({ size = 32, className = '' }: TechIconProps) {
  return <StackIcon name="cypress" className={className} style={{ width: size, height: size }} />;
}
