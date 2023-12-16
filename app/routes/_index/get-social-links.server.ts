export const getSocialLinks = () => {
  return [
    {
      id: crypto.randomUUID(),
      name: 'LinkedIn',
      to: 'https://www.linkedin.com/in/bemendoza/',
    },
    {
      id: crypto.randomUUID(),
      name: 'GitHub',
      to: 'https://github.com/b-mendoza',
    },
    {
      id: crypto.randomUUID(),
      name: 'Email',
      to: 'mailto:bmendoza.dev@gmail.com',
    },
  ];
};
