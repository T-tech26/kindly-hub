import { format, formatDistanceToNowStrict, differenceInHours, parseISO } from 'date-fns';


export const getSmartDateDisplay = (dateString: string) => {
  const date = parseISO(dateString);
  const now = new Date();

  const hoursDiff = differenceInHours(now, date);

  if (hoursDiff < 24) {
    // Show "2 hours ago", "5 hours ago"
    return formatDistanceToNowStrict(date, { addSuffix: true });
  } else if (hoursDiff < 72) {
    // Show "2 days ago"
    return formatDistanceToNowStrict(date, { addSuffix: true });
  } else {
    // If it's older than 3 days, show only the date
    return format(date, 'yyyy-MM-dd');
  }
}


// /* eslint-disable @typescript-eslint/no-explicit-any */
export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));
// /* eslint-enable @typescript-eslint/no-explicit-any */