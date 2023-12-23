import { formatDate } from '~/utils/dates.server';

const joinDates = (dates: [string, string]) => {
  return dates.join(' - ');
};

export type JobExperience = {
  companyName: string;
  description: string;
  id: string;
  jobTitle: string;
  timePeriod: string;
};

export const getJobExperience = (): JobExperience[] => {
  return [
    {
      id: crypto.randomUUID(),
      companyName: 'Praxent',
      description:
        'Leading the development of BaaS (Banking as a Service) platforms in the Fintech industry, using cutting-edge tools and frameworks for backend and frontend systems',
      jobTitle: 'Senior Software Engineer',
      timePeriod: joinDates([formatDate('2022-07'), 'Present']),
    },
    {
      id: crypto.randomUUID(),
      companyName: 'Bejamas',
      description: `• Collaborated with stakeholders to define project requirements, while integrating headless CMS tools like Contentful and Storyblok\n\n• Employed and evaluated cutting-edge web standards, such as Core Web Vitals, to optimize website performance and improve business conversion rates\n\n• Supported the development of internal company standards by authoring comprehensive documentation on modern web practices and tools for fellow developers`,
      jobTitle: 'Frontend Developer',
      timePeriod: joinDates([formatDate('2022-02'), formatDate('2022-07')]),
    },
    {
      id: crypto.randomUUID(),
      companyName: 'NBC Universal',
      description:
        'Implemented headless CMS solutions utilizing WordPress and Strapi, seamlessly integrating them with Identity services for enhanced security while also defining API requirements and collaborated with tools like Webpack and Babel to deliver optimized and efficient production builds.',
      jobTitle: 'Senior Frontend Developer',
      timePeriod: joinDates([formatDate('2021-02'), formatDate('2022-11')]),
    },
    {
      id: crypto.randomUUID(),
      companyName: 'Applaudo Studios',
      description: `• Contributed to the development of multi-tenant platforms and frontends that featured white labeling and dynamic feature toggles\n\n• Optimized web components for maximum performance across various devices and browsers, ensuring a seamless user experience\n\n• Translated designs and wireframes into high-quality code, resulting in pixel-perfect user interfaces\n\n• Employed GraphQL and RESTful APIs to streamline data processing and communication with backend systems`,
      jobTitle: 'Frontend Developer',
      timePeriod: joinDates([formatDate('2019-02'), formatDate('2022-05')]),
    },
  ];
};
