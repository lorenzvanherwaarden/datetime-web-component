import { computePosition, offset, shift } from '@floating-ui/dom'
import Months from './constants/Months'
import Weekdays from './constants/Weekdays'
import type CellEvent from './events/CellEvent'
import DatetimeEvent from './events/DatetimeEvent'
import MonthYearEvent from './events/MonthYearEvent'
import style from './style'
import clearChildren from './utils/clearChildren'
import createCell from './utils/createCell'
import createHeader from './utils/createHeader'
import createWeekdays from './utils/createWeekdays'
import getDayOfWeek from './utils/getDayOfWeek'
import getDaysInMonth from './utils/getDaysInMonths'
import getFirstDayOfMonth from './utils/getFirstDayOfMonth'
import parseUTCDate from './utils/parseUTCDate'

class DatetimeWebComponent extends HTMLElement {
  // Date representation of the value
  _date?: Date

  // Year of sliding window
  _tempYear?: number

  // Month of sliding window
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
    this.shadowRoot!.addEventListener(
      'update-month-year',
      this._handleMonthYear.bind(this)
    )

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
    if (value) {
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
      (number) => {
        const isSelected =
          number === this._day &&
          this._year === this._tempYear &&
          this._monthIndex === this._tempMonthIndex
        return createCell(number.toString(), {
          isSelected,
        })
      }
    )
  }

  get _offset(): number {
    const firstDayOfMonth = getFirstDayOfMonth(
      this._tempYear!,
      this._tempMonthIndex!
    )
    const dayOfWeek = getDayOfWeek(firstDayOfMonth)
    return dayOfWeek - 1
  }

  get _day(): number {
    return this._date!.getDate()
  }

  get _monthIndex(): number {
    return this._date!.getMonth()
  }

  get _year(): number {
    return this._date!.getFullYear()
  }

  _render() {
    clearChildren(this.shadowRoot!)
    this.shadowRoot!.appendChild(
      createHeader(this._tempYear!, this._tempMonthIndex!)
    )
    this.shadowRoot!.appendChild(createWeekdays(Weekdays))
    for (let i = 0; i < this._offset; i++) {
      this.shadowRoot!.appendChild(createCell(''))
    }
    this._monthDayCells.forEach((cell) => this.shadowRoot!.appendChild(cell))
  }

  _setupValue() {
    if (this.value === null) {
      this._date = new Date()
    } else {
      this._date = parseUTCDate(this.value)
    }

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
    this.dispatchEvent(
      new DatetimeEvent(this._date!.toISOString(), this._date!)
    )
  }

  _handleDay(event: CellEvent) {
    this._date?.setDate(event.day)
    this._emit()
  }

  _handleMonthYear(event: MonthYearEvent) {
    this._tempYear = event.year
    this._tempMonthIndex = event.monthIndex
    this._render()
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
