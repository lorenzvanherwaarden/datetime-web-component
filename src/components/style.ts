const css = `
:host {
  --font-family: sans-serif;
  --font-size: 14px;
  --background: #fafafa;
  --box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  --text-color: #222222;
  --muted-text-color: #777777;
  --focus-color: #0066ff;
  --selected-cell-background: #e7e7e7;
  --hover-cell-background: #efefef;
  --cell-width: 28px;
  --cell-height: 26px;
  --dropdown-border-color: #dddddd;
  --dropdown-border-width: 1px;
  --dropdown-border-radius: 4px;
  --cell-border-radius: 6px;
  --time-font-size: 18px;
  --time-font-weight: 500;
  --time-border-radius: 4px;
  --time-hover-background: #eee;

  display: block;
  position: absolute;
  z-index: 100000;
  width: calc(7 * var(--cell-width) + 2 * 7 * 2px);
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  background-color: var(---background);
  border: solid var(--dropdown-border-width) var(--dropdown-border-color);
  border-radius: var(--dropdown-border-radius);
  box-shadow: var(--box-shadow); 
  padding: 16px;
}

:host([hidden]) {
  display: none;
}

.cell {
  display: inline-block;
  width: var(--cell-width);
  height: var(--cell-height);
  line-height: var(--cell-height);
  margin: 4px 2px;
  vertical-align: middle;
  text-align: center;
  user-select: none;
  border-radius: var(--cell-border-radius);
  outline-color: var(--focus-color);
}

.cell:not(.cell--header):not(.cell--selected):not(.cell--inactive) {
  cursor: pointer;
}

.cell:not(.cell--header):not(.cell--selected):not(.cell--inactive):hover {
  background-color: var(--hover-cell-background);
}

.cell:not(.cell--header):not(.cell--selected):not(.cell--inactive):active {
  color: var(--focus-color);
}

.cell--selected {
  background-color: var(--selected-cell-background);
  font-weight: 600;
}

.cell--header {
  font-weight: 600;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
}

.semantic-button {
  font-family: inherit;
  font-size: var(--font-size);
  background: none;
  color: var(--muted-text-color);
  border: none;
  cursor: pointer;
  padding: 4px;
  outline-color: var(--focus-color);
}

.semantic-button:hover {
  color: var(--focus-color);
}

.semantic-button--large {
  font-size: calc(var(--font-size) + 2px);
  padding: 4px 8px;
}

.time-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
}

.time-input {
  color: var(--text-color);
  font-family: var(--font-family);
  font-weight: var(--time-font-weight);
  font-size: var(--time-font-size);
  background: transparent;
  border: none;
  border-radius: var(--time-border-radius);
  outline-color: var(--focus-color);
  line-height: 1;
  padding: 2px 0px 2px 2px;
  width: auto;
  max-width: 40px;
}

.time-input:hover {
  background: var(--time-hover-background);
}

.time-separator {
  font-size: var(--time-font-size);
  font-weight: var(--time-font-weight);
  margin: 0 4px;
}
`

const style = document.createElement('style')
style.textContent = css

export default style
