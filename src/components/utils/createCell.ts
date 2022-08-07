import CellEvent from '../events/CellEvent'

type Options = {
  isSelected?: boolean
  isHeader?: boolean
}

function createCell(
  label: string,
  { isSelected = false, isHeader = false }: Options = {}
) {
  const cell = document.createElement('div')
  cell.classList.add('cell')
  cell.textContent = label

  if (isSelected) {
    cell.classList.add('cell--selected')
  } else if (isHeader) {
    cell.classList.add('cell--header')
  } else {
    cell.addEventListener('click', () => {
      cell.dispatchEvent(new CellEvent(parseInt(label, 10)))
    })
  }

  return cell
}

export default createCell
