import { computePosition, offset, shift } from '@floating-ui/dom'
import Months from './constants/Months'
import Weekdays from './constants/Weekdays'
import type CellEvent from './events/CellEvent'
import DatetimeEvent from './events/DatetimeEvent'
import MonthYearEvent from './events/MonthYearEvent'
import TimeEvent from './events/TimeEvent'
import style from './style'
import clearChildren from './utils/clearChildren'
import createCell from './utils/createCell'
import createHeader from './utils/createHeader'
import createMonthCells from './utils/createMonthCells'
import createTimeInput from './utils/createTimeInput'
import createWeekdays from './utils/createWeekdays'
import createYearView from './utils/createYearView'
import getDayOfWeek from './utils/getDayOfWeek'
import getDaysInMonth from './utils/getDaysInMonths'
import getFirstDayOfMonth from './utils/getFirstDayOfMonth'
import parseUTCDate from './utils/parseUTCDate'
import setTimeInputs from './utils/setTimeInputs'

type isDayBlockedFn = (value?: Date) => boolean

class DatetimeWebComponent extends HTMLElement {
  // Date representation of the value
  _date?: Date

  // Year of sliding window
  _tempYear?: number

  // Month of sliding window
  _tempMonthIndex?: number

  // Function to block specific days
  _isDayBlocked: isDayBlockedFn = () => false

  // Container for the dropdown
  _dropdown: HTMLElement

  // Slot for the input
  _slot: HTMLSlotElement

  _documentClickListener = this._handleDocumentClick.bind(this)

  // LIFECYCLE METHODS

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot?.appendChild(style)
    this._slot = document.createElement('slot')
    this.shadowRoot?.appendChild(this._slot)
    this._dropdown = document.createElement('div')
    this._dropdown.className = 'dropdown'
    this._dropdown.dataset.testid = 'dropdown'
    this.shadowRoot?.appendChild(this._dropdown)
  }

  connectedCallback() {
    this.isHidden = true
    this._upgradeProperty('value')
    this._upgradeProperty('onlyDate')
    this._upgradeProperty('showSeconds')
    this._upgradeProperty('isDayBlocked')

    document.addEventListener('click', this._documentClickListener)
    this.shadowRoot?.addEventListener(
      'cell-event',
      this._handleCellEvent.bind(this)
    )
    this.shadowRoot?.addEventListener(
      'update-month-year',
      this._handleMonthYear.bind(this)
    )
    this.shadowRoot?.addEventListener(
      'update-time',
      this._handleTime.bind(this)
    )
    this.shadowRoot?.addEventListener(
      'month-click',
      this._renderMonthView.bind(this)
    )
    this.shadowRoot?.addEventListener(
      'year-click',
      this._renderYearView.bind(this)
    )

    this._setupInputInteraction()
    this._setupValue()
    this._render()
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._documentClickListener)
  }

  // PUBLIC GETTERS & SETTERS

  set value(value: string | null) {
    if (value === this.getAttribute('value')) {
      return
    }
    this._setValue(value)
    this._setupValue()
    this._render()
  }

  get value() {
    return this.getAttribute('value')
  }

  set isHidden(value: boolean) {
    this._setBooleanAttribute('is-hidden', value)
  }

  get isHidden() {
    return this.hasAttribute('is-hidden')
  }

  set onlyDate(value: boolean) {
    this._setBooleanAttribute('only-date', value)
    this._render()
  }

  get onlyDate() {
    return this.hasAttribute('only-date')
  }

  set showSeconds(value: boolean) {
    this._setBooleanAttribute('show-seconds', value)
    this._render()
  }

  get showSeconds() {
    return this.hasAttribute('show-seconds')
  }

  set isDayBlocked(isDayBlocked: (date: Date) => boolean) {
    this._isDayBlocked = isDayBlocked
    if (this.isConnected) {
      this._render()
    }
  }

  // PRIVATE GETTERS & SETTERS

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
        const isBlocked = this._isDayBlocked(
          new Date(
            this._tempYear ?? this._year,
            this._tempMonthIndex ?? this._monthIndex,
            number
          )
        )
        return createCell(number.toString(), {
          isSelected,
          isBlocked,
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

  // EVENT HANDLERS

  _handleCellEvent(event: CellEvent) {
    if (event.day !== undefined) {
      this._date!.setDate(event.day)
    }
    if (event.month !== undefined) {
      this._tempMonthIndex = event.month
    }
    this._date!.setMonth(this._tempMonthIndex!)
    this._date!.setFullYear(this._tempYear!)
    this._setValue(this._date!.toISOString())
    this._render()
    this._emit()
  }

  _handleMonthYear(event: MonthYearEvent) {
    if (event.year !== undefined) {
      this._tempYear = event.year
    }
    if (event.monthIndex !== undefined) {
      this._tempMonthIndex = event.monthIndex
    }
    this._render()
  }

  _handleTime({ hours, minutes, seconds }: TimeEvent) {
    this._date!.setHours(hours)
    this._date!.setMinutes(minutes)
    this._date!.setSeconds(seconds)
    this._setValue(this._date!.toISOString())
    if (hours === 24) {
      this._render()
    } else {
      setTimeInputs(this.shadowRoot!, this._date!)
    }
    this._emit()
  }

  _handleInputClick() {
    this.isHidden = !this.isHidden
  }

  _handleInputFocus() {
    this.isHidden = false
  }

  _handleDocumentClick(event: MouseEvent) {
    if (!(event.target instanceof Node)) {
      return
    }
    if ((event.target as Element) === this._slot) {
      return
    }
    if (!event.target || !this.contains(event.target)) {
      this.isHidden = true
    }
  }

  // INTERNAL METHODS

  _render() {
    clearChildren(this._dropdown)
    this._dropdown.appendChild(
      createHeader(this._tempYear!, this._tempMonthIndex!)
    )
    this._dropdown.appendChild(createWeekdays(Weekdays))
    for (let i = 0; i < this._offset; i++) {
      this._dropdown.appendChild(createCell('', { isInactive: true }))
    }
    this._monthDayCells.forEach((cell) => this._dropdown.appendChild(cell))
    if (!this.onlyDate) {
      this._dropdown.appendChild(
        createTimeInput(this._date!, { showSeconds: this.showSeconds })
      )
    }
  }

  _renderMonthView() {
    clearChildren(this._dropdown)
    Months.map((month, index) =>
      createMonthCells({
        label: month,
        monthIndex: index,
        isSelected: index === this._tempMonthIndex,
      })
    ).forEach((cell) => this._dropdown.appendChild(cell))
  }

  _renderYearView() {
    clearChildren(this._dropdown)
    this._dropdown.appendChild(createYearView(this._tempYear!))
  }

  _setupValue() {
    this._parseDate()
    this._tempMonthIndex = this._date!.getMonth()
    this._tempYear = this._date!.getFullYear()
  }

  _setupInputInteraction() {
    const [input] = this._slot.assignedElements()
    input.addEventListener('focus', this._handleInputFocus.bind(this))

    computePosition(input, this, {
      placement: 'bottom-start',
      middleware: [offset(4), shift()],
    }).then(({ x, y }) =>
      Object.assign(this._dropdown.style, {
        left: `${x}px`,
        top: `${y}px`,
      })
    )
  }

  _emit() {
    if (this._isDayBlocked(this._date!)) {
      return
    }
    this.dispatchEvent(
      new DatetimeEvent(this._date!.toISOString(), this._date!)
    )
  }

  _setValue(value: string | null) {
    if (value) {
      this.setAttribute('value', value)
    } else {
      this.removeAttribute('value')
    }
  }

  _parseDate() {
    if (this.value === null) {
      this._date = new Date()
    } else {
      this._date = parseUTCDate(this.value)
    }
  }

  _setBooleanAttribute(attribute: string, value: boolean) {
    if (value) {
      this.setAttribute(attribute, '')
    } else {
      this.removeAttribute(attribute)
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
