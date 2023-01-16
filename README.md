[![main](https://github.com/lorenzvanherwaarden/datetime-web-component/actions/workflows/main.yml/badge.svg)](https://github.com/lorenzvanherwaarden/datetime-web-component/actions/workflows/main.yml)
[![tests](https://github.com/lorenzvanherwaarden/datetime-web-component/actions/workflows/playwright.yml/badge.svg)](https://github.com/lorenzvanherwaarden/datetime-web-component/actions/workflows/playwright.yml)
![latest release](https://badgen.net/github/release/lorenzvanherwaarden/datetime-web-component)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)

# Datetime web component

Lightweight and easily styleable datetime picker web component.

<p>
<img alt="Example of datetime-web-component" src="/public/default-style-light.png?raw=true" width="301">
<img alt="Example of datetime-web-component" src="/public/default-style-dark.png?raw=true" width="301">
</p>
Default UI in light & dark mode.

## Features

- Native web component which can be used anywhere; framework agnostic
- Style easily and extensively by setting CSS custom properties
- Lightweight; depends on only 1 dependency [floating-ui/dom](https://www.npmjs.com/package/@floating-ui/dom) to position dropdown
- Very performant
- Options to show/hide time and show/hide seconds
- Supports dark mode
- Subtle default styling

## Installation

```bash
npm install --save datetime-web-component
# yarn add datetime-web-component
```

## Usage

### 1. Import

```js
import 'datetime-web-component'
```

### 2. Style (optional)

Optionally style the datetime picker by defining CSS custom properties on the `datetime-web-component` tag. The list of all available custom properties to style is [available below](#styling):

```css
/* example styling */
datetime-web-component {
  --text-color: #353535;
  --font-family: 'Karla', sans-serif;
  --cell-width: 32px;
  --focus-color: #00aa44;
}
```

### 3. Include component and listen to changes

```html
<template>
  <datetime-web-component
    id="datetime"
    value="2022-12-07T12:12:03.000Z"
    show-seconds
  >
    <input slot="input" type="text" value="2022-12-07T12:12:03.000Z" />
  </datetime-web-component>
</template>
```

```js
const datetimeEl = document.getElementById('datetime')

// Listen to input event of the datetime-web-component for changes
datetimeEl.addEventListener('input', (event) => {
  inputEl.value = event.value
})
```

## API

### Properties

All properties, except the `isDayBlocked` (which isn't a primitive type), are exposed as property and attribute. This follows the web component attribute & properties [best practices](https://web.dev/custom-elements-best-practices/#attributes-and-properties).

| prop           | type                    | attribute      | description                                                                                                                                                                                                                                                                                                   | default       | required |
| -------------- | ----------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | -------- |
| `value`        | string \| null          | "value"        | String value of the date, like you would pass to the [Date constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date) and should conform to the ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ). If no value is given, the datetime will be set to the current date. | `undefined`   | ✕        |
| `onlyDate`     | boolean                 | "only-date"    | Whether to hide the time picker.                                                                                                                                                                                                                                                                              | `false`       | ✕        |
| `showSeconds`  | boolean                 | "show-seconds" | Whether to show seconds in the time picker. This property has no effect when `onlyDate` is true.                                                                                                                                                                                                              | `false`       | ✕        |
| `isDayBlocked` | (date: Date) => boolean | ✕              | Days can be blocked by providing a function.                                                                                                                                                                                                                                                                  | `() => false` | ✕        |

### Events

You can listen to changes by [adding an event listener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) with the type equal to `"input"` on the `<datetime-web-component />` element. The event contains a `value` property, which represents the new datetime in ISO 8601 format. This can be passed to the datetime-web-component directly as valid datetime. The event also contains a `date` property, which represents the `Date` representation of that new datetime. It is not necessary to feed the received `value` into the datetime-web-component again, as the internal value auto-updates when selecting a new datetime. It can be useful to update the input element's value with this event.

## Styling

You can style the datetime picker by overriding the CSS custom properties that are used in our css. These are all the exposed properties:

```css
datetime-web-component {
  --font-family: sans-serif;
  --font-size: 14px;
  --text-color: #222222;
  --muted-text-color: #777777;
  --disabled-text-color: #aaaaaa;
  --focus-color: #0066ff;

  /* dropdown */
  --background: #fafafa;
  --box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  --border-color: #dddddd;
  --border-width: 1px;
  --border-radius: 4px;
  --padding: 16px;

  /* date cell */
  --cell-width: 28px;
  --cell-height: 26px;
  --cell-border-radius: 6px;
  --cell-vertical-margin: 4px;
  --cell-horizontal-margin: 2px;
  --selected-cell-background: #e7e7e7;
  --selected-cell-font-weight: 700;
  --hover-cell-background: #efefef;

  /* time & year input */
  --input-font-size: 18px;
  --input-font-weight: 500;
  --input-border-radius: 4px;
  --input-hover-background: #eeeeee;
}
```

Dark mode styling can be done by using a media query

```css
@media (prefers-color-scheme: dark) {
  datetime-web-component {
    --text-color: #ffffff;
    --background: #333333;
  }
}
```

## Using datetime-web-component from CDN

You can use the datetime-web-component from a CDN via a script tag without a build step:

```html
<script src="https://unpkg.com/datetime-web-component@latest/dist/datetime-web-component.umd.js"></script>
```
