type MonthYearOptions = {
  year?: number
  monthIndex?: number
}

class MonthYearEvent extends Event {
  year?: number
  monthIndex?: number

  constructor({ year, monthIndex }: MonthYearOptions) {
    super('update-month-year', { bubbles: true })
    this.year = year
    this.monthIndex = monthIndex
  }
}

export default MonthYearEvent
