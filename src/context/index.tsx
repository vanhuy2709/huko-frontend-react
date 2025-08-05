import React, { PropsWithChildren } from 'react';
import { SceneProvider } from './scene';

export const ContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <SceneProvider>{children}</SceneProvider>;
};
