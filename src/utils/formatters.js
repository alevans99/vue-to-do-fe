import { DateTime } from 'luxon'
export const formatDate = (dateTimeIso) => {
  return DateTime.fromISO(dateTimeIso)
    .setLocale('gb')
    .toLocaleString(DateTime.DATETIME_SHORT)
}

export const formatPriorityToString = (formatInt) => {
  const priorityStrings = { 1: 'Low', 2: 'Medium', 3: 'High' }
  return priorityStrings[formatInt] || 'Medium'
}
