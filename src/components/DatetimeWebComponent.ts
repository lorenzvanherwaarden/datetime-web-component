import { computePosition, offset, shift } from '@floating-ui/dom'
import style from './style'

class DatetimeWebComponent extends HTMLElement {
  // Reference element to position dropdown to
  _refElement?: HTMLElement

  // Date representation of the value
  _date: Date | null = new Date()

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
    this._render()
  }

  set value(value: string | null) {
    if (value) {
      this.setAttribute('value', value)
    } else {
      this.removeAttribute('value')
    }

    this._date = this.value ? new Date(this.value) : null
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

  _render() {
    const span = document.createElement('span')
    span.textContent = this.value
    this.shadowRoot!.appendChild(span)
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
      this[prop] = value // TODO: prop should only be strings of setters of this class
    }
  }
}

export default DatetimeWebComponent
