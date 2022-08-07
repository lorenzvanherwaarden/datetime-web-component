class DatetimeEvent extends Event {
  value: string
  date: Date

  constructor(value: string, date: Date) {
    super('input')
    this.value = value
    this.date = date
  }
}

export default DatetimeEvent
