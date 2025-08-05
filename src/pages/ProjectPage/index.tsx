import './project.css';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProjectCard from '@pages/ProjectPage/ProjectCard';
import { LoadingState, EmptyState, ErrorState } from '@pages/ProjectPage/state';
import { URL_PATH } from '@constants/urlPath';

// Handle fetching projects
const fetchProjects = async (): Promise<IProject[]> => {
  const res = await fetch(`/src/data/${URL_PATH.PROJECTS}`);
  if (!res.ok) throw new Error('Failed to fetch JSON file');
  return res.json();
};

// Handle fetching categories
const fetchCategories = async (): Promise<ICategory[]> => {
  const res = await fetch(`/src/data/${URL_PATH.CATEGORIES}`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};

const ProjectPage: React.FC = React.memo(() => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState<IProject[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);

  // Performance tracking (remove in production)
  console.log('ProjectPage render - optimized with dynamic categories');

  // Fetch projects with react-query
  const {
    data: projects,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
    error: projectsError
  } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: 'always'
  });

  // Fetch categories with react-query
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    error: categoriesError
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes (categories change less frequently)
    gcTime: 15 * 60 * 1000, // 15 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: 'always'
  });

  // Combined loading and error states
  const isLoading = isProjectsLoading || isCategoriesLoading;
  const isError = isProjectsError || isCategoriesError;
  const error = projectsError || categoriesError;

  // Memoize categories array with "All" option and fetched categories
  const categories = useMemo(() => {
    if (!categoriesData) return [];

    const allCategory = { id: 'all', label: 'All Projects' };
    const fetchedCategories = categoriesData.map(cat => ({
      id: cat.slug || cat.name,
      label: cat.label
    }));

    return [allCategory, ...fetchedCategories];
  }, [categoriesData]);

  // Memoize filter function
  const filterProjects = useCallback((projects: IProject[], filter: string) => {
    if (filter === 'all') {
      return projects;
    }
    return projects.filter(project => project.tags.includes(filter));
  }, []);

  useEffect(() => {
    if (!projects) return;

    setIsFiltering(true);

    // Delay to allow fade out animation
    const timeoutId = setTimeout(() => {
      const filtered = filterProjects(projects, activeFilter);
      setFilteredProjects(filtered);

      // Allow fade in animation
      setTimeout(() => {
        setIsFiltering(false);
      }, 50);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [activeFilter, projects, filterProjects]);

  // Memoize filter handler to prevent re-creation
  const handleFilterChange = useCallback(
    (filterId: string) => {
      if (filterId !== activeFilter) {
        setActiveFilter(filterId);
      }
    },
    [activeFilter]
  );

  // Handle loading and error states after all hooks are called
  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState message={error?.message} />;
  }

  if (!projects || projects.length === 0) {
    return <EmptyState />;
  }

  if (!categoriesData || categoriesData.length === 0) {
    return <ErrorState message="Failed to load categories" />;
  }

  return (
    <div className="project-page">
      <div className="project-hero">
        <h1>Projects</h1>
        <p className="project-subtitle">
          This blog features content, videos, and projects related to my work as a media and content
          creator. Here, I share creative products, digital content experiences, and personal
          projects in the media field.
        </p>
      </div>

      <div className="projects-grid">
        <div className="filter-section">
          <div className="filter-buttons">
            {isCategoriesLoading ? (
              <div className="categories-loading">
                <div className="filter-spinner"></div>
                <span>Loading categories...</span>
              </div>
            ) : (
              categories.map(category => (
                <button
                  key={category.id}
                  className={`filter-button ${activeFilter === category.id ? 'active' : ''}`}
                  onClick={() => handleFilterChange(category.id)}
                  disabled={isFiltering}
                >
                  {category.label}
                </button>
              ))
            )}
          </div>
          {isFiltering && (
            <div className="filter-loading">
              <div className="filter-spinner"></div>
              <span>Filtering...</span>
            </div>
          )}
        </div>

        <div className={`projects-container ${isFiltering ? 'filtering' : ''}`} key={activeFilter}>
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
});

ProjectPage.displayName = 'ProjectPage';

export default ProjectPage;
