export const formatDate = (date: Date) => {
  const month = () => {
    switch (date.getMonth()) {
      case 0:
        return 'stycznia'
      case 1:
        return 'lutego'
      case 2:
        return 'marca'
      case 3:
        return 'kwietnia'
      case 4:
        return 'maja'
      case 5:
        return 'czerwca'
      case 6:
        return 'lipca'
      case 7:
        return 'sierpnia'
      case 8:
        return 'września'
      case 9:
        return 'października'
      case 10:
        return 'listopada'
      case 11:
        return 'grudnia'
      default:
        throw new Error('niepoprawny miesiąc')
    }
  }

  return `${date.getDate()} ${month()} ${date.getFullYear()}`
}
