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
  let cell: HTMLElement

  if (isBlocked) {
    cell = document.createElement('button')
    cell.classList.add('cell--blocked')
    cell.setAttribute('disabled', true)
    cell.dataset.testid = 'blocked-cell'
  } else if (isSelected) {
    cell = document.createElement('button')
    cell.classList.add('cell--selected')
    cell.dataset.testid = 'selected-cell'
  } else if (isHeader) {
    cell = document.createElement('div')
    cell.classList.add('cell--header')
    cell.dataset.testid = 'header-cell'
  } else if (isInactive) {
    cell = document.createElement('div')
    cell.classList.add('cell--inactive')
    cell.dataset.testid = 'inactive-cell'
  } else {
    cell = document.createElement('button')
    cell.classList.add('cell--default')
    cell.dataset.testid = 'default-cell'
    cell.addEventListener('click', () => {
      cell.dispatchEvent(new CellEvent({ day: parseInt(label, 10) }))
    })
  }

  cell.classList.add('cell')
  cell.textContent = label

  return cell
}

export default createCell
