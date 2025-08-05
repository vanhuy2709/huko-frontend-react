import ProjectPage from '@pages/ProjectPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/project')({
  component: ProjectPage
});
