function getDaysInMonth(year: number, monthIndex: number) {
  const lastDayDate = new Date(0)
  lastDayDate.setFullYear(year, monthIndex + 1, 0)
  lastDayDate.setHours(0, 0, 0)
  return lastDayDate.getDate()
}

export default getDaysInMonth
