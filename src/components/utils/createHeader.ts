import Months from '../constants/Months'
import ArrowEvent from '../events/ArrowEvent'

function createSemanticButton(label: string, isLarge: boolean = false) {
  const button = document.createElement('button')
  button.className = 'semantic-button'
  if (isLarge) {
    button.classList.add('semantic-button--large')
  }
  button.textContent = label

  return button
}

function createArrowButton(label: string, newMonthIndex: number) {
  const button = createSemanticButton(label, true)
  button.addEventListener('click', () => {
    button.dispatchEvent(new ArrowEvent(newMonthIndex))
  })

  return button
}

function createMonthYearSelector(year: number, month: string) {
  const div = document.createElement('div')
  const monthEl = createSemanticButton(month)
  const yearEl = createSemanticButton(year.toString())
  div.appendChild(monthEl)
  div.appendChild(yearEl)

  return div
}

function createHeader(year: number, monthIndex: number) {
  const container = document.createElement('div')
  container.className = 'header'
  const leftButton = createArrowButton(
    '←',
    monthIndex === 0 ? 11 : monthIndex - 1
  )
  const rightButton = createArrowButton(
    '→',
    monthIndex === 11 ? 0 : monthIndex + 1
  )
  container.appendChild(leftButton)
  container.appendChild(createMonthYearSelector(year, Months[monthIndex]))
  container.appendChild(rightButton)

  return container
}

export default createHeader
