import './components'
import type DatetimeWebComponent from './components/DatetimeWebComponent'
import type DatetimeEvent from './components/events/DatetimeEvent'

// Get DatetimeWebComponent
const datetimeWebComponent = document.getElementsByTagName(
  'datetime-web-component'
)[0] as DatetimeWebComponent
const input = document.getElementById('input') as HTMLInputElement
input.value = datetimeWebComponent.value || ''

// Set refElement
datetimeWebComponent.refElement = input

datetimeWebComponent.addEventListener('input', (event: DatetimeEvent) => {
  datetimeWebComponent.value = event.value
  input.value = event.value
})

// datetimeWebComponent.value = '2021-01-05 12:43:23'
