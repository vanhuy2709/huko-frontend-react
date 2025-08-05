import WorkPage from '@pages/WorkPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/work')({
  component: WorkPage
});
