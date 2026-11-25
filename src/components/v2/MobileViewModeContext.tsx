'use client';

import React, { createContext, useContext, useState } from 'react';

export type MobileViewMode = 'compact' | 'story';

interface MobileViewModeContextValue {
  mode: MobileViewMode;
  setMode: (mode: MobileViewMode) => void;
  toggleMode: () => void;
}

const MobileViewModeContext = createContext<MobileViewModeContextValue>({
  mode: 'compact',
  setMode: () => {},
  toggleMode: () => {},
});

export function MobileViewModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<MobileViewMode>('compact');
  const toggleMode = () => setMode((prev) => (prev === 'compact' ? 'story' : 'compact'));

  return (
    <MobileViewModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </MobileViewModeContext.Provider>
  );
}

export function useMobileViewMode() {
  return useContext(MobileViewModeContext);
}
