import React from 'react';

// Memoized Project Card Component
interface ProjectCardProps {
  project: IProject;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ project, index }) => (
  <div
    className="project-card"
    style={{
      animationDelay: `${index * 100 + 300}ms`
    }}
  >
    <div className={`project-status ${project.isPublished ? 'status-published' : 'status-draft'}`}>
      {project.isPublished ? 'Published' : 'Draft'}
    </div>

    <div className="project-thumbnail">
      <img
        src={project.thumbnailUrl}
        alt={project.title}
        className="thumbnail-image"
        loading="lazy"
        decoding="async"
      />
    </div>

    <div className="project-content">
      <div className="project-number">
        {String(index + 1).padStart(2, '0')} / {new Date(project.createdAt).getFullYear()}
      </div>

      <h3 className="project-title">{project.title}</h3>

      <p className="project-description">{project.description}</p>

      <div className="project-tech">
        {project.tags.map(tag => (
          <span key={tag} className="tech-tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
));

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
