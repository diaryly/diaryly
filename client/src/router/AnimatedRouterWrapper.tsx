import { useBeforeLeave, useIsRouting } from '@solidjs/router'
import { createSignal, type JSX, Suspense } from 'solid-js'

import { watch } from 'solid-uses'
import LoadingPage from '~/parts/LoadingPage'
import './aniamted-router.scss'

export function AnimatedRouterWrapper(props: {
  children: JSX.Element
}) {
  let ref!: HTMLDivElement

  const [status, setStatus] = createSignal('opened')

  const isRouting = useIsRouting()

  useBeforeLeave((e) => {
    setStatus('closing')
    if (!e.defaultPrevented) {
      e.preventDefault()
    }

    ref.onanimationend = () => {
      e.retry(true)
      ref.onanimationend = null
    }
  })

  watch(isRouting, (r, prevR) => {
    if (!r && prevR) {
      setStatus('opening')
    }
  })

  return (
    <div
      ref={ref}
      class="animated-router-wrapper"
      data-status={status()}
      onAnimationEnd={() => {
        setStatus(status().replace('ing', 'ed'))
      }}
    >
      <Suspense fallback={<LoadingPage />}>
        {props.children}
      </Suspense>
    </div>
  )
}
