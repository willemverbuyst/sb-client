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
  'zo',
  'ma',
  'di',
  'wo',
  'do',
  'vr',
  'za',
]

export const getToday = ():string => {
  const day = daysLocal[+new Date().getDay()]
  const month = monthsLocal[+new Date().getMonth()]

  return `${day} ${new Date().getDate()} ${month}`
}

export const getTimeNow = ():string => new Date().toLocaleString().slice(11, 19);

export const timeStamptFormattedToLocalDate = (timeStamp: number):string => {
  const date = new Date(timeStamp * 1000);
  const day = daysLocal[+date.getDay()];
  const month = monthsLocalShort[+date.getMonth()];
  const year = date.getFullYear().toLocaleString().slice(3, 5);

  return `${day} ${new Date().getDate()} ${month} '${year}`;
}