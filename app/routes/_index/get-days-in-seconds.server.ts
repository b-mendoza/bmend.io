import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';

dayjs.extend(durationPlugin);

export const getDaysInSeconds = (days: number) => {
  return dayjs.duration(days, 'days').asSeconds();
};
