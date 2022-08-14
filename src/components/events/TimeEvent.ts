import { TimeEventOptions } from '../types'

class TimeEvent extends Event {
  hours: number
  minutes: number
  seconds: number

  constructor({ hours, minutes, seconds }: TimeEventOptions) {
    super('update-time', { bubbles: true })
    this.hours = hours
    this.minutes = minutes
    this.seconds = seconds
  }
}

export default TimeEvent
