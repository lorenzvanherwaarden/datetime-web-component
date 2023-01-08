import CellEvent from '../events/CellEvent'

type Options = {
  isSelected?: boolean
  isBlocked?: boolean
  isHeader?: boolean
  isInactive?: boolean
}

function createCell(
  label: string,
  {
    isSelected = false,
    isBlocked = false,
    isHeader = false,
    isInactive = false,
  }: Options = {}
) {
  const cell = document.createElement('div')
  cell.classList.add('cell')
  cell.textContent = label

  if (isBlocked) {
    cell.classList.add('cell--blocked')
    cell.dataset.testid = 'blocked-cell'
  } else if (isSelected) {
    cell.classList.add('cell--selected')
    cell.dataset.testid = 'selected-cell'
  } else if (isHeader) {
    cell.classList.add('cell--header')
    cell.dataset.testid = 'header-cell'
  } else if (isInactive) {
    cell.classList.add('cell--inactive')
    cell.dataset.testid = 'inactive-cell'
  } else {
    cell.classList.add('cell--default')
    cell.dataset.testid = 'default-cell'
    cell.addEventListener('click', () => {
      cell.dispatchEvent(new CellEvent({ day: parseInt(label, 10) }))
    })
    cell.tabIndex = 0
  }

  return cell
}

export default createCell
