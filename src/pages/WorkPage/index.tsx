import './work.css';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useQuery } from '@tanstack/react-query';
import WorkCanvas from './work.canvas';
import { Link } from '@tanstack/react-router';
import { URL_PATH } from '@constants/urlPath';

// Handle fetching projects
const fetchProjects = async (): Promise<IProject[]> => {
  const res = await fetch(`/data/${URL_PATH.PROJECTS}`);
  if (!res.ok) throw new Error('Failed to fetch JSON file');
  return res.json();
};

const WorkPage: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);

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

  // Console log projects data
  useEffect(() => {
    if (projects) {
      console.log('Projects data from WorkPage:', projects);
      console.log('Projects count:', projects.length);
    }
    if (isProjectsError) {
      console.error('Error fetching projects:', projectsError);
    }
    if (isProjectsLoading) {
      console.log('Loading projects...');
    }
  }, [projects, isProjectsError, projectsError, isProjectsLoading]);

  // Animation for the text element
  // This will animate the text to float, glow, and scale on hover
  useEffect(() => {
    if (textRef.current) {
      const text = textRef.current;

      // Initial state
      gsap.set(text, {
        y: 20,
        opacity: 0
      });

      // Entrance animation
      gsap.to(text, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        delay: 0.5
      });

      // Floating animation
      gsap.to(text, {
        y: -10,
        duration: 2,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1.5
      });

      // Subtle glow animation
      gsap.to(text, {
        textShadow: '0 0 15px rgba(255,255,255,0.3)',
        duration: 4,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        delay: 2
      });

      // Hover animations
      const handleMouseEnter = () => {
        gsap.to(text, {
          scale: 1.05,
          duration: 0.4,
          ease: 'power2.out'
        });
      };

      const handleMouseLeave = () => {
        gsap.to(text, {
          scale: 1,
          duration: 0.4,
          ease: 'power2.out'
        });
      };

      text.addEventListener('mouseenter', handleMouseEnter);
      text.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        text.removeEventListener('mouseenter', handleMouseEnter);
        text.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <>
      <WorkCanvas projects={projects} />
      <div ref={textRef} className="work__button">
        <Link to="/project">view more</Link>
      </div>
    </>
  );
};

export default WorkPage;
