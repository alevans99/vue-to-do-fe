import { DateTime } from 'luxon'
export const formatDate = (dateTimeIso) => {
  return DateTime.fromISO(dateTimeIso)
    .setLocale('gb')
    .toLocaleString(DateTime.DATETIME_SHORT)
}

export const formatPriorityToString = (formatInt) => {
  const priorityStrings = { 1: 'High', 2: 'Medium', 3: 'Low' }
  return priorityStrings[formatInt] || 'Medium'
}
