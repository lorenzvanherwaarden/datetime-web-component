class ArrowEvent extends Event {
  monthIndex: number

  constructor(monthIndex: number) {
    super('update-month')
    this.monthIndex = monthIndex
  }
}

export default ArrowEvent
