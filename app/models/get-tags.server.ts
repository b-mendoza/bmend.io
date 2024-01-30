/* import type { IconName } from '~/components/icon'; */

export type Tag = {
  text: string;
  /* icon?: IconName; */
};

export const getTags = () => {
  /* This might be replaced by a database/CMS call in the future */
  return [
    {
      text: 'JavaScript',
      /* icon: 'javascript', */
    },
    {
      text: 'TypeScript',
      /* icon: 'typescript', */
    },
    {
      text: 'React',
      /* icon: 'react', */
    },
    {
      text: 'Remix',
      /* icon: 'remix', */
    },
    {
      text: 'Next.js',
      /* icon: 'nextdotjs', */
    },
    {
      text: 'Tailwind CSS',
      /* icon: 'tailwindcss', */
    },
    {
      text: 'Node.js',
      /* icon: 'nodedotjs', */
    },
  ] satisfies Tag[];
};
