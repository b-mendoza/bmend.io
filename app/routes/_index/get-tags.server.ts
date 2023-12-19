export type Tag = {
  id: string;
  text: string;
};

export const getTags = (): Tag[] => {
  // This might be replaced by a database/CMS call in the future
  return [
    {
      id: crypto.randomUUID(),
      text: 'UI/UX Design',
    },
    {
      id: crypto.randomUUID(),
      text: 'Interaction Design',
    },
    {
      id: crypto.randomUUID(),
      text: 'Brand Identity',
    },
    {
      id: crypto.randomUUID(),
      text: 'Web Design',
    },
    {
      id: crypto.randomUUID(),
      text: 'Product Design',
    },
    {
      id: crypto.randomUUID(),
      text: 'Typography',
    },
    {
      id: crypto.randomUUID(),
      text: 'App User Interface',
    },
  ];
};
