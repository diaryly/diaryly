import { useLocation } from '@solidjs/router'
import { createMemo, Match, Switch } from 'solid-js'
import { OnPageDiary } from './OnPageDiary'
import { OnPageMain } from './OnPageMain'
import { OnPageWrite } from './OnPageWrite'

export function Header() {
  const location = useLocation()
  const pageType = createMemo(() => {
    const p = location.pathname
    if (p.startsWith('/write-diary'))
      return 'write-page'
    if (p.startsWith('/diary'))
      return 'diary-page'
    return 'main-page'
  })

  return (
    <div class="p-2 rounded-xl bg-t-bg2 w-450px shadow-8 flex items-center justify-between mx-2">
      <Switch fallback={<OnPageMain />}>
        <Match when={pageType() === 'write-page'}>
          <OnPageWrite />
        </Match>
        <Match when={pageType() === 'diary-page'}>
          <OnPageDiary />
        </Match>
      </Switch>
    </div>
  )
}
