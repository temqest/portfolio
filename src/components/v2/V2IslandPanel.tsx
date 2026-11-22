import React from 'react';

interface V2IslandPanelProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function V2IslandPanel({ children, className = '', id }: V2IslandPanelProps) {
  return (
    <section
      id={id}
      className={`v2-island-panel py-20 md:py-32 px-6 md:px-16 transition-all duration-500 shadow-2xl ${className}`}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}
