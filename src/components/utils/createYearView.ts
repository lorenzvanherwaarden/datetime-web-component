import MonthYearEvent from '../events/MonthYearEvent'
import createSemanticButton from './createSemanticButton'

function createYearInput(year: number) {
  const input = document.createElement('input')
  input.type = 'number'
  input.className = 'input input--year'
  input.min = '0'
  input.value = year.toString()

  return input
}

function createYearView(year: number) {
  const container = document.createElement('div')
  container.className = 'container container--year'
  const yearInput = createYearInput(year)
  yearInput.addEventListener('input', (event) => event.stopPropagation())
  const okButton = createSemanticButton({ label: '✓', isIcon: true })
  okButton.addEventListener('click', () => {
    const newYear = yearInput.value
    yearInput.dispatchEvent(new MonthYearEvent({ year: parseInt(newYear, 10) }))
  })
  container.appendChild(yearInput)
  container.appendChild(okButton)

  return container
}

export default createYearView
