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

export const getTime = ():string => new Date().toLocaleString().slice(11, 19);