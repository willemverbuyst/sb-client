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
  'december'
  ]

const monthsLocalShort = [
  'jan',
  'feb',
  'mrt',
  'apr',
  'mei',
  'jun',
  'jul',
  'aug',
  'sep',
  'okt',
  'nov',
  'dec'
  ]

const daysLocal = [
  'zondag',
  'maaandag',
  'dinsdag',
  'woensdag',
  'donderdag',
  'vrijdag',
  'zaterdag',
]

const daysLocalShort = [
  'zo',
  'ma',
  'di',
  'wo',
  'do',
  'vr',
  'za',
]

export const getToday = ():string => {
  const day = daysLocalShort[+new Date().getDay()]
  const month = monthsLocalShort[+new Date().getMonth()]

  return `${day} ${new Date().getDate()} ${month}`
}

export const getTimeNow = ():string => new Date().toLocaleString().slice(11, 19);

export const timeStampFormattedToLocalDate = (timeStamp: number):string => {
  const date = new Date(timeStamp * 1000);
  const day = daysLocal[+date.getDay()];
  const month = monthsLocal[+date.getMonth()];
  const year = date.getFullYear().toString()

  return `${day} ${date.getDate()} ${month} ${year}`;
}

export const getTimeFromTimeStamp = (timeStamp: number):string => {
  const date = new Date(timeStamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes() === 0 ? '00' : date.getMinutes();

  return `${hours}:${minutes}`;
}