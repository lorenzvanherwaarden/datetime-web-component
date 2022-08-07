import { computePosition, offset, shift } from '@floating-ui/dom'
import Months from './constants/Months'
import Weekdays from './constants/Weekdays'
import type CellEvent from './events/CellEvent'
import DatetimeEvent from './events/DatetimeEvent'
import style from './style'
import clearChildren from './utils/clearChildren'
import createCell from './utils/createCell'
import createWeekdays from './utils/createWeekdays'
import getDaysInMonth from './utils/getDaysInMonths'

class DatetimeWebComponent extends HTMLElement {
  // Date representation of the value
  _date: Date | null = new Date()

  _tempYear?: number

  _tempMonthIndex?: number

  // Reference element to position dropdown to
  _refElement?: HTMLElement

  // Function to handle document click, bound to this
  _bindedHandleDocumentClick = this._handleDocumentClick.bind(this)

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot!.appendChild(style)
  }

  connectedCallback() {
    this._upgradeProperty('value')
    this.hidden = true
    this._upgradeProperty('hidden')
    document.addEventListener('click', this._bindedHandleDocumentClick)
    this.shadowRoot!.addEventListener('cell-event', this._handleDay.bind(this))
    this._setupValue()
    this._render()
  }

  set value(value: string | null) {
    if (value) {
      this.setAttribute('value', value)
    } else {
      this.removeAttribute('value')
    }

    this._setupValue()
    this._render()
  }

  get value() {
    return this.getAttribute('value')
  }

  set hidden(value: boolean) {
    const isHidden = Boolean(value)
    if (isHidden) {
      this.setAttribute('hidden', '')
    } else {
      this.removeAttribute('hidden')
    }
  }

  get hidden() {
    return this.hasAttribute('hidden')
  }

  set refElement(refElement: HTMLElement) {
    this._refElement = refElement
    this._refElement.addEventListener('click', this._handleRefClick.bind(this))
    this._position()
  }

  get _tempMonth(): string | null {
    return this._tempMonthIndex ? Months[this._tempMonthIndex] : null
  }

  get _daysInMonth(): number {
    return getDaysInMonth(this._tempYear!, this._tempMonthIndex!)
  }

  get _monthDayCells(): HTMLElement[] {
    return Array.from({ length: this._daysInMonth }, (_, idx) => idx + 1).map(
      (number) =>
        createCell(number.toString(), { isSelected: number === this._day })
    )
  }

  get _day(): number {
    return this._date!.getDate()
  }

  _render() {
    clearChildren(this.shadowRoot!)
    this.shadowRoot!.appendChild(createWeekdays(Weekdays))
    this._monthDayCells.forEach((cell) => this.shadowRoot!.appendChild(cell))
  }

  _setupValue() {
    this._date = this.value ? new Date(this.value) : null
    this._tempMonthIndex = this._date?.getMonth()
    this._tempYear = this._date?.getFullYear()
  }

  _position() {
    computePosition(this._refElement!, this, {
      placement: 'bottom-start',
      middleware: [offset(4), shift()],
    }).then(({ x, y }) =>
      Object.assign(this.style, {
        left: `${x}px`,
        top: `${y}px`,
      })
    )
  }

  _emit() {
    this.dispatchEvent(new DatetimeEvent(this._date!.toString(), this._date!))
  }

  _handleDay(event: CellEvent) {
    this._date?.setDate(event.day)
    this._emit()
  }

  _handleRefClick() {
    this.hidden = !this.hidden
  }

  _handleDocumentClick(event: MouseEvent) {
    if (!(event.target instanceof Node)) {
      return
    }
    if (event.target === this._refElement) {
      return
    }
    if (!event.target || !this.contains(event.target)) {
      this.hidden = true
    }
  }

  _upgradeProperty(prop: string) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop as keyof DatetimeWebComponent]
      delete this[prop as keyof DatetimeWebComponent]
      // @ts-ignore
      this[prop] = value // TODO: prop should only be strings of setters of this class
    }
  }
}

export default DatetimeWebComponent
