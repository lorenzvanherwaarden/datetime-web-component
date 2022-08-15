import Months from '../constants/Months'
import MonthYearEvent from '../events/MonthYearEvent'
import createSemanticButton from './createSemanticButton'

function createArrowButton(
  label: string,
  newYear: number,
  newMonthIndex: number
) {
  const button = createSemanticButton(label, true)
  button.addEventListener('click', () => {
    button.dispatchEvent(
      new MonthYearEvent({ year: newYear, monthIndex: newMonthIndex })
    )
  })

  return button
}

function createMonthYearSelector(year: number, month: string) {
  const div = document.createElement('div')
  const monthButton = createSemanticButton(month)
  monthButton.addEventListener('click', () => {
    monthButton.dispatchEvent(new Event('month-click', { bubbles: true }))
  })
  const yearButton = createSemanticButton(year.toString())
  yearButton.addEventListener('click', () => {
    yearButton.dispatchEvent(new Event('year-click', { bubbles: true }))
  })
  div.appendChild(monthButton)
  div.appendChild(yearButton)

  return div
}

function createHeader(year: number, monthIndex: number) {
  const container = document.createElement('div')
  container.className = 'header'
  const isFirstMonth = monthIndex === 0
  const isLastMonth = monthIndex === 11
  const leftButton = createArrowButton(
    '←',
    isFirstMonth ? year - 1 : year,
    isFirstMonth ? 11 : monthIndex - 1
  )
  const rightButton = createArrowButton(
    '→',
    isLastMonth ? year + 1 : year,
    isLastMonth ? 0 : monthIndex + 1
  )
  console.log(isLastMonth)
  container.appendChild(leftButton)
  container.appendChild(createMonthYearSelector(year, Months[monthIndex]))
  container.appendChild(rightButton)

  return container
}

export default createHeader
