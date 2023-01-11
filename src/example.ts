import './components'
import type DatetimeWebComponent from './components/DatetimeWebComponent'
import type DatetimeEvent from './components/events/DatetimeEvent'

// Get DatetimeWebComponent
const datetimeWebComponent = document.getElementsByTagName(
  'datetime-web-component'
)[0] as DatetimeWebComponent
const input = document.getElementById('input') as HTMLInputElement
input.value = datetimeWebComponent.value || ''

datetimeWebComponent.addEventListener('input', (event: DatetimeEvent) => {
  datetimeWebComponent.value = event.value
  input.value = event.value
  console.log(event.value)
})

datetimeWebComponent.isDayBlocked = (date: Date) => {
  return date.getDay() === 2 || date.getDay() === 5
}
