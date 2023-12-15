import crypto from 'crypto';

export const getExperience = () => {
  return [
    {
      id: crypto.randomUUID(),
      companyName: 'InnovateTech Solutions',
      description:
        'Lead the UX design team in developing innovative user experiences for tech-driven products. Collaborate closely with cross-functional teams to implement user-centered design principles and drive product success.',
      jobTitle: 'Senior UX Architect',
      timePeriod: '2019 - now',
    },
    {
      id: crypto.randomUUID(),
      companyName: 'NexTech Innovations',
      description:
        'Played a key role in designing intuitive user interfaces and enhancing user experiences for cutting-edge technology solutions. Conducted user research and usability testing to inform design decisions.',
      jobTitle: 'UX Designer',
      timePeriod: '2016 - 2019',
    },
    {
      id: crypto.randomUUID(),
      companyName: 'Digital Vision Corporation',
      description:
        'Gained foundational design experience by supporting the design team in various projects. Assisted in creating wireframes, prototypes, and visual assets, contributing to the development of user-centered designs.',
      jobTitle: 'Design Intern',
      timePeriod: '2015 - 2016',
    },
  ];
};
