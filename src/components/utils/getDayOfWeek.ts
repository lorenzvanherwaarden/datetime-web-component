function getDayOfWeek(date: Date) {
  const day = date.getDay()

  return day === 0 ? 7 : day
}

export default getDayOfWeek
