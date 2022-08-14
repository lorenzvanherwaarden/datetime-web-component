import CellEvent from '../events/CellEvent'

type Options = {
  isSelected?: boolean
  isHeader?: boolean
  isInactive?: boolean
}

function createCell(
  label: string,
  { isSelected = false, isHeader = false, isInactive = false }: Options = {}
) {
  const cell = document.createElement('div')
  cell.classList.add('cell')
  cell.textContent = label

  if (isSelected) {
    cell.classList.add('cell--selected')
  } else if (isHeader) {
    cell.classList.add('cell--header')
  } else if (isInactive) {
    cell.classList.add('cell--inactive')
  } else {
    cell.addEventListener('click', () => {
      cell.dispatchEvent(new CellEvent(parseInt(label, 10)))
    })
    cell.tabIndex = 0
  }

  return cell
}

export default createCell
