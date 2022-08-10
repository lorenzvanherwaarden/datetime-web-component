class MonthYearEvent extends Event {
  year: number
  monthIndex: number

  constructor(year: number, monthIndex: number) {
    super('update-month-year', { bubbles: true })
    this.year = year
    this.monthIndex = monthIndex
  }
}

export default MonthYearEvent
