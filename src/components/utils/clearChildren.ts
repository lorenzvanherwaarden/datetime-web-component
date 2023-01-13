/**
 * Clear all children from an HTMLElement
 * @param {HTMLElement} element
 */
function clearChildren(element: HTMLElement) {
  while (element.childNodes.length) {
    if (element.lastChild) {
      element.removeChild(element.lastChild)
    }
  }
}

export default clearChildren
