const css = `
:host {
  --datetime-font-family: sans-serif;
  --datetime-font-size: 14px;
  --datetime-color: #222222;
  --datetime-color-focus: #0055ff;
  --datetime-background: #fafafa;
  --datetime-background-cell-selected: #e2e2e2;
  --datetime-background-cell-hover: #eaeaea;
  --datetime-color-border: #dddddd;
  --datetime-width-cell: 28px;
  --datetime-height-cell: 26px;
  --datetime-border-width: 1px;
  --datetime-radius-border: 4px;
  --datetime-radius-border-cell: 6px;
  --datetime-box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);

  display: block;
  position: absolute;
  z-index: 100000;
  width: calc(7 * var(--datetime-width-cell) + 2 * 7 * 2px);
  font-family: var(--datetime-font-family);
  font-size: var(--datetime-font-size);
  color: var(--datetime-color);
  background-color: var(--datetime--background);
  border: solid var(--datetime-border-width) var(--datetime-color-border);
  border-radius: var(--datetime-radius-border);
  box-shadow: var(--datetime-box-shadow); 
  padding: 16px;
}

:host([hidden]) {
  display: none;
}

.cell {
  display: inline-block;
  width: var(--datetime-width-cell);
  height: var(--datetime-height-cell);
  line-height: var(--datetime-height-cell);
  margin: 4px 2px;
  vertical-align: middle;
  text-align: center;
  user-select: none;
  border-radius: var(--datetime-radius-border-cell);
}

.cell:not(.cell--header):not(.cell--selected) {
  cursor: pointer;
}

.cell:not(.cell--header):not(.cell--selected):hover {
  background-color: var(--datetime-background-cell-hover);
}

.cell:not(.cell--header):not(.cell--selected):active {
  color: var(--datetime-color-focus);
}

.cell--selected {
  background-color: var(--datetime-background-cell-selected);
  font-weight: 600;
}

.cell--header {
  font-weight: 600;
}
`

const style = document.createElement('style')
style.textContent = css

export default style
