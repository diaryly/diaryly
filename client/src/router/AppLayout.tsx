import type { ParentProps } from 'solid-js'
import { JigeDialogProvider, JigeProvider, Scrollbar } from 'jige-ui'
import { onMount, Show } from 'solid-js'
import { watch } from 'solid-uses'
import { Header } from '~/parts/Header'
import { LoginPanel } from '~/parts/LoginPanel'
import { useAppState } from '~/states/app-state'
import { headContext } from '~/states/head-context'
import useUserState from '~/states/user-state'

export function AppLayout(props: ParentProps) {
  const [appState] = useAppState()
  const [userState] = useUserState()
  const HeadContext = headContext.initial()

  onMount(() => {
    watch(() => appState.isDark, (d) => {
      document.body.classList.toggle('dark', d)
    })
  })

  return (
    <JigeProvider
      hue={appState.hue}
      zIndexConfig={{
        tooltip: 1000,
      }}
    >
      <JigeDialogProvider>
        <HeadContext.Provider>
          <div class="h-screen w-screen">
            <div class="flex justify-center items-end w-full h-85px relative  z-3">
              <Header />
            </div>
            <div class="h-[calc(100%-85px)] w-full flex justify-center relative">
              <div class="up-banner absolute top-0 h-35px w-full backdrop-blur-3px z-2" />
              <div class="bottom-banner absolute bottom-0 h-45px w-full backdrop-blur-3px z-2" />
              <Scrollbar class="w-450px" verticalPos={{ 'top': '30px', 'bottom': '45px', 'z-index': 4 }}>
                {props.children}
              </Scrollbar>
            </div>
          </div>
          <Show when={!userState.isLogin}>
            <LoginPanel />
          </Show>
        </HeadContext.Provider>
      </JigeDialogProvider>
    </JigeProvider>

  )
}
