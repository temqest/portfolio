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
      className={`v2-island-panel py-14 sm:py-20 md:py-28 px-5 sm:px-6 md:px-14 transition-all duration-500 shadow-2xl ${className}`}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}
