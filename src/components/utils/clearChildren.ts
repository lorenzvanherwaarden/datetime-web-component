/**
 * Clear all but the first child (which is the style tag) from a ShadowRoot
 * @param shadowRoot
 */
function clearChildren(shadowRoot: ShadowRoot) {
  while (shadowRoot.childNodes.length > 1) {
    if (shadowRoot.lastChild) {
      shadowRoot.removeChild(shadowRoot.lastChild)
    }
  }
}

export default clearChildren
