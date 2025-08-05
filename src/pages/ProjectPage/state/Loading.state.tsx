import React from 'react';

// Memoized Loading State Component
export const LoadingState: React.FC = React.memo(() => (
  <div className="project-page">
    <div className="project-hero">
      <h1>Projects</h1>
      <p className="project-subtitle">Loading projects...</p>
    </div>
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Fetching latest projects...</p>
    </div>
  </div>
));

LoadingState.displayName = 'LoadingState';
