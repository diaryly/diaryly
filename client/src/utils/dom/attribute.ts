export function getAttribute(element: HTMLElement, name: string) {
  return element.getAttribute(name)
}

export function setAttribute(
  element: HTMLElement,
  name: string,
  value: string,
) {
  element.setAttribute(name, value)
}

export function getDataSet(element: HTMLElement, key: string) {
  return getAttribute(element, `data-${key}`)
}

export function setDataSet(element: HTMLElement, key: string, value: string) {
  setAttribute(element, `data-${key}`, value)
}
