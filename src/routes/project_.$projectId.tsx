import { createFileRoute } from '@tanstack/react-router';
import BlogPage from '@pages/BlogPage';

export const Route = createFileRoute('/project_/$projectId')({
  component: BlogPage
});
