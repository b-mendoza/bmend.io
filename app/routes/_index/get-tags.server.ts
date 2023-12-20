import type { IconName } from '~/components/icon';

export type Tag = {
  id: string;
  text: string;
  icon?: IconName;
};

export const getTags = () => {
  // This might be replaced by a database/CMS call in the future
  return [
    {
      id: crypto.randomUUID(),
      text: 'Git',
      icon: 'git',
    },
    {
      id: crypto.randomUUID(),
      text: 'HTML',
      icon: 'html5',
    },
    {
      id: crypto.randomUUID(),
      text: 'CSS',
      icon: 'css3',
    },
    {
      id: crypto.randomUUID(),
      text: 'JavaScript',
      icon: 'javascript',
    },
    {
      id: crypto.randomUUID(),
      text: 'TypeScript',
      icon: 'typescript',
    },
    {
      id: crypto.randomUUID(),
      text: 'React',
      icon: 'react',
    },
    {
      id: crypto.randomUUID(),
      text: 'Redux',
      icon: 'redux',
    },
    {
      id: crypto.randomUUID(),
      text: 'Remix',
      icon: 'remix',
    },
    {
      id: crypto.randomUUID(),
      text: 'Next.js',
      icon: 'nextdotjs',
    },
    {
      id: crypto.randomUUID(),
      text: 'GraphQL',
      icon: 'graphql',
    },
    {
      id: crypto.randomUUID(),
      text: 'Node.js',
      icon: 'nodedotjs',
    },
    {
      id: crypto.randomUUID(),
      text: 'PostgreSQL',
      icon: 'postgresql',
    },
    {
      id: crypto.randomUUID(),
      text: 'Tailwind CSS',
      icon: 'tailwindcss',
    },
  ] satisfies Tag[];
};
