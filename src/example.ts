import './components'
import type DatetimeWebComponent from './components/DatetimeWebComponent'

// Get DatetimeWebComponent
const datetimeWebComponent = document.getElementsByTagName(
  'datetime-web-component'
)[0] as DatetimeWebComponent
const input = document.getElementById('input') as HTMLElement

// Set refElement
datetimeWebComponent.refElement = input

// datetimeWebComponent.value = '2021-01-05 12:43:23'
