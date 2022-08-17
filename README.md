[![main](https://github.com/lorenzvanherwaarden/datetime-web-component/actions/workflows/main.yml/badge.svg)](https://github.com/lorenzvanherwaarden/datetime-web-component/actions/workflows/main.yml)
![latest release](https://badgen.net/github/release/lorenzvanherwaarden/datetime-web-component)
![minzip size](https://badgen.net/bundlephobia/minzip/datetime-web-component)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)

# Datetime web component

Highly and easily styleable datetime picker web component.

## Features

- Native web component which can be used anywhere and is framework agnostic
- Style easily and extenstively by setting CSS custom properties
- Lightweight. Depends on only 1 dependency [floating-ui/dom](https://www.npmjs.com/package/@floating-ui/dom) to position dropdown
- Very performant
- Options to show/hide time and show/hide seconds
- Supports dark mode

## Installation

```
npm install --save datetime-web-component
# yarn add datetime-web-component
```

## Usage

### 1. Import

```
import 'datetime-web-component'
```

### 2. Style (optional)

Optionally style the datetime picker by defining CSS custom properties on the `datetime-web-component` tag:

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
<datetime-web-component value="2022-12-07T12:12:03.000Z" showseconds />
```
