const css = `
:host {
  --font-family: sans-serif;
  --font-size: 14px;
  --color: #222222;
  --color-muted: #777777;
  --color-focus: #0055ff;
  --background: #fafafa;
  --background-cell-selected: #e2e2e2;
  --background-cell-hover: #eaeaea;
  --color-border: #dddddd;
  --width-cell: 28px;
  --height-cell: 26px;
  --border-width: 1px;
  --radius-border: 4px;
  --radius-border-cell: 6px;
  --box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);

  display: block;
  position: absolute;
  z-index: 100000;
  width: calc(7 * var(--width-cell) + 2 * 7 * 2px);
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--color);
  background-color: var(---background);
  border: solid var(--border-width) var(--color-border);
  border-radius: var(--radius-border);
  box-shadow: var(--box-shadow); 
  padding: 16px;
}

:host([hidden]) {
  display: none;
}

.cell {
  display: inline-block;
  width: var(--width-cell);
  height: var(--height-cell);
  line-height: var(--height-cell);
  margin: 4px 2px;
  vertical-align: middle;
  text-align: center;
  user-select: none;
  border-radius: var(--radius-border-cell);
}

.cell:not(.cell--header):not(.cell--selected) {
  cursor: pointer;
}

.cell:not(.cell--header):not(.cell--selected):hover {
  background-color: var(--background-cell-hover);
}

.cell:not(.cell--header):not(.cell--selected):active {
  color: var(--color-focus);
}

.cell--selected {
  background-color: var(--background-cell-selected);
  font-weight: 600;
}

.cell--header {
  font-weight: 600;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.semantic-button {
  font-family: inherit;
  font-size: cvar(--font-size);
  background: none;
  color: var(--color-muted);
  border: none;
  cursor: pointer;
  outline: inherit;
  padding: 4px 8px;
}

.semantic-button:hover {
  color: var(--color-focus);
}

.semantic-button--large {
  font-size: calc(var(--font-size) + 2px);
}
`

const style = document.createElement('style')
style.textContent = css

export default style
