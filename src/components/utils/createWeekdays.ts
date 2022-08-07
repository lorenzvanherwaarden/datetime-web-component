import createCell from './createCell'

function createWeekdays(weekdays: string[]) {
  const container = document.createElement('div')
  weekdays.forEach((weekDay) =>
    container.appendChild(createCell(weekDay, { isHeader: true }))
  )

  return container
}

export default createWeekdays
