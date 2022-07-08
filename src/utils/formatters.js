import { DateTime } from 'luxon'
export const formatDate = (dateTimeIso) => {
  const formattedDate = DateTime.fromISO(dateTimeIso)
    .setLocale('gb')
    .toLocaleString(DateTime.DATETIME_SHORT)

  return formattedDate !== 'Invalid DateTime' ? formattedDate : null
}

export const formatPriorityToString = (formatInt) => {
  const priorityStrings = { 1: 'Low', 2: 'Medium', 3: 'High' }
  return priorityStrings[formatInt] || 'Medium'
}
