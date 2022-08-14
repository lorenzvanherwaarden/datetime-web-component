function createSemanticButton(label: string, isIcon = false) {
  const button = document.createElement('button')
  button.className = 'semantic-button'
  if (isIcon) {
    button.classList.add('semantic-button--icon')
  }
  button.textContent = label

  return button
}

export default createSemanticButton
