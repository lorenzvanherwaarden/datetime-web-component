type SemanticButtonOptions = {
  label: string
  isIcon?: boolean
  dataTestid?: string
}

function createSemanticButton({
  label,
  isIcon = false,
  dataTestid = '',
}: SemanticButtonOptions) {
  const button = document.createElement('button')
  button.dataset.testid = dataTestid
  button.className = 'semantic-button'
  if (isIcon) {
    button.classList.add('semantic-button--icon')
  }
  button.textContent = label

  return button
}

export default createSemanticButton
