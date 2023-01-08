import Months from '../constants/Months'
import MonthYearEvent from '../events/MonthYearEvent'
import createSemanticButton from './createSemanticButton'

type CreateArrowButtonOptions = {
  label: string
  newYear: number
  newMonthIndex: number
  dataTestid: string
}

function createArrowButton({
  label,
  newYear,
  newMonthIndex,
  dataTestid,
}: CreateArrowButtonOptions) {
  const button = createSemanticButton({ label, isIcon: true, dataTestid })
  button.addEventListener('click', () => {
    button.dispatchEvent(
      new MonthYearEvent({ year: newYear, monthIndex: newMonthIndex })
    )
  })

  return button
}

function createMonthYearSelector(year: number, month: string) {
  const div = document.createElement('div')
  const monthButton = createSemanticButton({
    label: month,
    dataTestid: 'month',
  })
  monthButton.addEventListener('click', () => {
    monthButton.dispatchEvent(new Event('month-click', { bubbles: true }))
  })
  const yearButton = createSemanticButton({
    label: year.toString(),
    dataTestid: 'year',
  })
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
  const leftButton = createArrowButton({
    label: '←',
    newYear: isFirstMonth ? year - 1 : year,
    newMonthIndex: isFirstMonth ? 11 : monthIndex - 1,
    dataTestid: 'previous-month',
  })
  const rightButton = createArrowButton({
    label: '→',
    newYear: isLastMonth ? year + 1 : year,
    newMonthIndex: isLastMonth ? 0 : monthIndex + 1,
    dataTestid: 'next-month',
  })
  container.appendChild(leftButton)
  container.appendChild(createMonthYearSelector(year, Months[monthIndex]))
  container.appendChild(rightButton)

  return container
}

export default createHeader
