import CellEvent from '../events/CellEvent'

type MonthCellOptions = {
  label: string
  monthIndex: number
  isSelected: boolean
}

function createMonthCells({ label, monthIndex, isSelected }: MonthCellOptions) {
  const cell = document.createElement('button')
  cell.dataset.testid = 'month-cell'
  cell.classList.add('cell')
  if (isSelected) {
    cell.classList.add('cell--selected')
  }
  cell.classList.add('cell--month')
  cell.classList.add('cell--default')
  cell.textContent = label
  cell.addEventListener('click', () => {
    cell.dispatchEvent(new CellEvent({ month: monthIndex }))
  })

  return cell
}

export default createMonthCells
