import formatTime from './formatTime'

function setTimeInputs(el: ShadowRoot, date: Date) {
  const hoursInput = el.querySelector('#hours') as HTMLInputElement
  hoursInput.value = formatTime(date.getHours())
  const minutesInput = el.querySelector('#minutes') as HTMLInputElement
  minutesInput.value = formatTime(date.getMinutes())
  const secondsInput = el.querySelector('#seconds')
  if (secondsInput) {
    ;(secondsInput as HTMLInputElement).value = formatTime(date.getSeconds())
  }
}

export default setTimeInputs
