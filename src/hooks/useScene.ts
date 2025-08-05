import { createContext, useContext } from 'react';
import { SceneContextType } from '@context/scene';

export const SceneContext = createContext<SceneContextType | undefined>(undefined);

export const useScene = (): SceneContextType => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error('useScene must be used within a SceneProvider');
  }
  return context;
};
