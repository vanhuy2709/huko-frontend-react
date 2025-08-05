export const URL_PATH = {
  USER: 'user.json',
  CATEGORIES: 'categories.json',
  PROJECTS: 'projects.json',
  PROJECT_DETAILS: (id: number) => `projects/${id}.json`,
  CONTACT_FORM: 'contact.json',
  BLOG_POSTS: 'blog-posts.json',
  BLOG_CATEGORIES: 'blog-categories.json'
};
