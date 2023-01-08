import TimeEvent from '../events/TimeEvent'
import formatTime from './formatTime'

type TimeInputOptions = {
  showSeconds?: boolean
}

function createSeparator() {
  const div = document.createElement('div')
  div.innerText = ':'
  div.className = 'time-separator'

  return div
}

function createNumberInput(value: string, max: number) {
  const input = document.createElement('input')
  input.type = 'number'
  input.min = '0'
  input.max = max.toString()
  input.className = 'input'
  input.value = value

  return input
}

function parseValueFromEvent(event: Event) {
  return parseInt((event.target! as HTMLInputElement).value, 10)
}

function createHoursInput(date: Date) {
  const input = createNumberInput(formatTime(date.getHours()), 24)
  input.id = 'hours'
  input.setAttribute('data-testid', 'hours')
  input.addEventListener('input', (event) => {
    input.dispatchEvent(
      new TimeEvent({
        hours: parseValueFromEvent(event),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
      })
    )
    event.stopPropagation()
  })

  return input
}

function createMinutesInput(date: Date) {
  const input = createNumberInput(formatTime(date.getMinutes()), 60)
  input.id = 'minutes'
  input.setAttribute('data-testid', 'minutes')
  input.addEventListener('input', (event) => {
    input.dispatchEvent(
      new TimeEvent({
        hours: date.getHours(),
        minutes: parseValueFromEvent(event),
        seconds: date.getSeconds(),
      })
    )
    event.stopPropagation()
  })
  return input
}

function createSecondsInput(date: Date) {
  const input = createNumberInput(formatTime(date.getSeconds()), 60)
  input.id = 'seconds'
  input.setAttribute('data-testid', 'seconds')
  input.addEventListener('input', (event) => {
    input.dispatchEvent(
      new TimeEvent({
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: parseValueFromEvent(event),
      })
    )
    event.stopPropagation()
  })

  return input
}

function createTimeInput(
  date: Date,
  { showSeconds = false }: TimeInputOptions
) {
  const container = document.createElement('div')
  container.setAttribute('data-testid', 'time-container')
  container.className = 'container container--time'
  container.appendChild(createHoursInput(date))
  container.appendChild(createSeparator())
  container.appendChild(createMinutesInput(date))
  if (showSeconds) {
    container.appendChild(createSeparator())
    container.appendChild(createSecondsInput(date))
  }

  return container
}

export default createTimeInput
