type CellEventOptions = {
  day?: number
  month?: number
}

class CellEvent extends Event {
  day?: number
  month?: number

  constructor({ day, month }: CellEventOptions) {
    super('cell-event', { bubbles: true })
    this.day = day
    this.month = month
  }
}

export default CellEvent
