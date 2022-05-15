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

export const getTimeFromTimeStamp = (timeStamp: number): string => {
  const date = new Date(timeStamp * 1000)
  const hours = date.getHours()
  const minutes =
    date.getMinutes() === 0
      ? '00'
      : date.getMinutes() < 10
      ? `0${date.getMinutes()}`
      : date.getMinutes()

  return `${hours}:${minutes}`
}

export const formatTimeStampToLocalDate = (timeStamp: number): string => {
  const date = new Date(timeStamp * 1000)
  const day = daysLocal[+date.getDay()]
  const month = monthsLocal[+date.getMonth()]
  const year = date.getFullYear().toString()

  return `${day} ${date.getDate()} ${month} ${year}`
}

// The betting closes 5 minutes before the match
export const hasBettingClosed = (timeStamp: number): boolean =>
  Math.floor(Date.now() / 1000) > timeStamp - 5 * 60
