const css = `
:host {
  --datetime-font-family: sans-serif;
  --datetime-font-size: 14px;
  --datetime-color-text: #222222;
  --datetime-color-background: #fafafa;
  --datetime-color-border: #dddddd;
  --datetime-border-width: 1px;
  --datetime-radius-border: 4px;
  --datetime-box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);

  display: block;
  position: absolute;
  z-index: 100000;
  font-family: var(--datetime-font-family);
  font-size: var(--datetime-font-size);
  color: var(--datetime-color-text);
  background-color: var(--datetime-color-background);
  border: solid var(--datetime-border-width) var(--datetime-color-border);
  border-radius: var(--datetime-radius-border);
  box-shadow: var(--datetime-box-shadow); 
  padding: 16px;
}

:host([hidden]) {
  display: none;
}
`

const style = document.createElement('style')
style.textContent = css

export default style
