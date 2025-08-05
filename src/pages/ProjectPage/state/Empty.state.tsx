import React from 'react';

// Memoized Empty State Component
export const EmptyState: React.FC = React.memo(() => (
  <div className="project-page">
    <div className="project-hero">
      <h1>Projects</h1>
      <p className="project-subtitle">No projects available</p>
    </div>
    <div className="empty-state">
      <div className="empty-icon">📁</div>
      <h3>No projects found</h3>
      <p>There are currently no projects to display.</p>
    </div>
  </div>
));

EmptyState.displayName = 'EmptyState';
