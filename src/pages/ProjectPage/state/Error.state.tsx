import React from 'react';

// Memoized Error State Component
interface ErrorStateProps {
  message?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = React.memo(({ message }) => (
  <div className="project-page">
    <div className="project-hero">
      <h1>Projects</h1>
      <p className="project-subtitle">Something went wrong</p>
    </div>
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h3>Failed to load projects</h3>
      <p className="error-message">
        {message || 'An unexpected error occurred while fetching projects.'}
      </p>
      <button className="retry-button" onClick={() => globalThis.location.reload()}>
        Try Again
      </button>
    </div>
  </div>
));

ErrorState.displayName = 'ErrorState';
