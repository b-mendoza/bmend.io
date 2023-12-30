export type Social = {
  name: string;
  to: string;
};

export const getSocialLinks = (): Social[] => {
  return [
    {
      name: 'LinkedIn',
      to: 'https://www.linkedin.com/in/bemendoza/',
    },
    {
      name: 'GitHub',
      to: 'https://github.com/b-mendoza',
    },
    {
      name: 'Email',
      to: 'mailto:bmendoza.dev@gmail.com',
    },
  ];
};
