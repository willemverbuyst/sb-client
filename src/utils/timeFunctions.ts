const monthsLocal = [
  'januari',
  'februari',
  'maart',
  'april',
  'mei',
  'juni',
  'juli',
  'augustus',
  'september',
  'oktober',
  'november',
  'december',
];

const daysLocal = ['zondag', 'maaandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];

export const getTimeFromTimeStamp = (timeStamp: number): string => {
  const date = new Date(timeStamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes() === 0 ? '00' : date.getMinutes();

  return `${hours}:${minutes}`;
};

export const timeStampFormattedToLocalDate = (timeStamp: number): string => {
  const date = new Date(timeStamp * 1000);
  const day = daysLocal[+date.getDay()];
  const month = monthsLocal[+date.getMonth()];
  const year = date.getFullYear().toString();

  return `${day} ${date.getDate()} ${month} ${year}`;
};
