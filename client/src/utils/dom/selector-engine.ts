export function query<E extends Element = HTMLElement>(
  selector: string,
  element = document.documentElement,
) {
  return element.querySelectorAll<E>(selector)
}

export function findOne<E extends Element = HTMLElement>(
  selector: string,
  element = document.documentElement,
) {
  return element.querySelector<E>(selector)
}

export function children(element: Element) {
  return element.children!
}

export function parent(element: Element) {
  return element.parentElement
}
