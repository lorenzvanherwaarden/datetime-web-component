class CellEvent extends Event {
  day: number

  constructor(day: number) {
    super('cell-event', { bubbles: true })
    this.day = day
  }
}

export default CellEvent
