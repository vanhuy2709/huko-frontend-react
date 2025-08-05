import { SceneContext } from '@hooks/useScene';
import React, { useState, ReactNode } from 'react';

export interface SceneContextType {
  currentScene: TScene;
  setCurrentScene: (scene: TScene) => void;
}

export const SceneProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScene, setCurrentScene] = useState<TScene>('start');

  return (
    <SceneContext.Provider value={{ currentScene, setCurrentScene }}>
      {children}
    </SceneContext.Provider>
  );
};
