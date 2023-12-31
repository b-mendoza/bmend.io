import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';

dayjs.extend(durationPlugin);

export const getDaysInSeconds = (days: number) => {
  return dayjs.duration(days, 'days').asSeconds();
};

/**
 * Formats a given date string to the format 'MMM YYYY'.
 *
 * @param {string} date - The original date string that needs to be formatted.
 * @returns {string} - Returns the formatted date string according to the specified format.
 *
 * Example Input/Output:
 * formatDate('2023-04-01') will return 'Apr 2023'
 */
export const formatDate = (date: string) => {
  return dayjs(date).format('MMM YYYY');
};
