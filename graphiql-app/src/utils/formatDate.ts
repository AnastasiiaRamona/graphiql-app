import { format } from 'date-fns';

function formatDate(dateTime: string): string {
  const date = new Date(dateTime);
  return format(date, 'dd.MM.yyyy HH:mm');
}

export default formatDate;
