class DatetimeEvent extends Event {
  value: string
  date: Date

  constructor(value: string, date: Date) {
    super('value')
    this.value = value
    this.date = date
  }
}

export default DatetimeEvent
