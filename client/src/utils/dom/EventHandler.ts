const EventHandler = {
  on<K extends keyof WindowEventMap>(
    target: Element | Document | Window,
    type: K,
    listener: (this: typeof target, ev: WindowEventMap[K]) => any,
  ) {
    target.addEventListener(
      type,
      listener as EventListenerOrEventListenerObject,
    )
  },

  one<K extends keyof WindowEventMap>(
    target: Element | Document | Window,
    type: K,
    listener: (this: typeof target, ev: WindowEventMap[K]) => any,
  ) {
    target.addEventListener(
      type,
      listener as EventListenerOrEventListenerObject,
      { once: true },
    )
  },

  off<K extends keyof WindowEventMap>(
    target: Element | Document | Window,
    type: K,
    listener: (this: typeof target, ev: WindowEventMap[K]) => any,
  ) {
    target.removeEventListener(
      type,
      listener as EventListenerOrEventListenerObject,
    )
  },
}

export default EventHandler
