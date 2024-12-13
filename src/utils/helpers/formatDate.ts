import { currentYear } from './getYear.ts'

export const formatDate = (date: Date, version?: 'full' | 'short' | 'today') => {
  const dayNames = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota']

  const month = () => {
    switch (date.getMonth()) {
      case 0:
        return version && version === 'short' ? 'sty' : 'stycznia'
      case 1:
        return version && version === 'short' ? 'lut' : 'lutego'
      case 2:
        return version && version === 'short' ? 'mar' : 'marca'
      case 3:
        return version && version === 'short' ? 'kwi' : 'kwietnia'
      case 4:
        return version && version === 'short' ? 'maj' : 'maja'
      case 5:
        return version && version === 'short' ? 'cze' : 'czerwca'
      case 6:
        return version && version === 'short' ? 'lip' : 'lipca'
      case 7:
        return version && version === 'short' ? 'sie' : 'sierpnia'
      case 8:
        return version && version === 'short' ? 'wrz' : 'września'
      case 9:
        return version && version === 'short' ? 'paź' : 'października'
      case 10:
        return version && version === 'short' ? 'lis' : 'listopada'
      case 11:
        return version && version === 'short' ? 'gru' : 'grudnia'
      default:
        throw new Error('niepoprawny miesiąc')
    }
  }

  const isRecent = () => {
    const today = new Date()

    if (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    ) {
      return 'dziś'
    }

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    if (
      date.getFullYear() === yesterday.getFullYear() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getDate() === yesterday.getDate() - 1
    ) {
      return 'wczoraj'
    }

    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)

    if (date.getTime() > weekAgo.getTime()) {
      return dayNames[weekAgo.getDay()]
    }

    return false
  }

  switch (version) {
    case 'full':
      return `${date.getDate()} ${month()} ${date.getFullYear()}, ${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`
    case 'short':
      return isRecent()
        ? isRecent()
        : `${date.getDate()} ${month()}${currentYear() === date.getFullYear() ? '' : ` '${date.getFullYear().toString().slice(-2)}`}`
    default:
      return `${date.getDate()} ${month()} ${date.getFullYear()}}`
  }
}
