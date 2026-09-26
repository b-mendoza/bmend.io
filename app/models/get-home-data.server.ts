import { getJobExperience } from '~/models/get-job-experience.server';
import { getSocialLinks } from '~/models/get-social-links.server';
import { getTags } from '~/models/get-tags.server';

export const getHomeData = () => {
  return {
    jobExperience: getJobExperience(),
    socialLinks: getSocialLinks(),
    tags: getTags(),
  };
};
