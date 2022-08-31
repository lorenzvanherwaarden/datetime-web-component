[![main](https://github.com/lorenzvanherwaarden/datetime-web-component/actions/workflows/main.yml/badge.svg)](https://github.com/lorenzvanherwaarden/datetime-web-component/actions/workflows/main.yml)
![latest release](https://badgen.net/github/release/lorenzvanherwaarden/datetime-web-component)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)

# Datetime web component

Lightweight and easily styleable datetime picker web component.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/public/default-style-dark.png?raw=true">
  <source media="(prefers-color-scheme: light)" srcset="/public/default-style-light.png?raw=true">
  <img alt="Shows default style" src="/public/default-style-light.png?raw=true" width="301">
</picture>

> Toggle dark mode on your system to see the ui in dark/light

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

### 3. Include component in html/template

```html
<datetime-web-component value="2022-12-07T12:12:03.000Z" show-seconds />
```

## API

Following web component attribute & properties [best practices](https://web.dev/custom-elements-best-practices/#attributes-and-properties), the properties can be passed as actual properties or attributes.

| prop  | type | attribute | description | default | required |
| ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
| `value`  | string \| null  | "value" | String value of the date, like you would pass to the [Date constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date) and should conform to the ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ). If no value is given, the datetime will be set to the current date.   | `undefined` | ✕ |
| `refElement`  | HTMLElement  | ✕ | HTMLElement where the datetime popover attaches to and is placed relative to. Most often, this would be your input element containing the date time value. | `undefined` | ✓ |
| `hidden`  | boolean  | "hidden" | Whether the datetime popover is visible or not. This is `true` by default. When clicking on the `refElement`, this will become `false` (such that the popover is visible). By again clicking on the `refElement` or outside the popover, it will become `true` again. | `true` | ✕ |
| `onlyDate`  | boolean  | "only-date" | Whether to hide the time picker. | `false` | ✕ |
| `showSeconds`  | boolean  | "show-seconds" | Whether to show seconds in the time picker. This property has no effect when `onlyDate` is true. | `false` | ✕ |
 
## Styling

You can style the datetime picker by overriding the CSS custom properties that are used in our css. These are all the exposed properties:

```css
datetime-web-component {
  --font-family: sans-serif;
  --font-size: 14px;
  --text-color: #222222;
  --muted-text-color: #777777;
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
