import { Button, Input, useDialog } from 'jige-ui'
import { createSignal, onCleanup, onMount } from 'solid-js'
import { isServer } from 'solid-js/web'
import { useIntervalFn } from 'solid-uses'
import { useAppState } from '~/states/app-state'
import useUserState from '~/states/user-state'

export function LoginPanel() {
  const [, actions] = useUserState()
  const [pass, setPass] = createSignal('')
  const dialog = useDialog()

  onMount(() => {
    useIntervalFn(() => {
      document.body.classList.toggle('dark', true)
    }, 500)
  })

  onCleanup(() => {
    if (isServer)
      return
    const [appState] = useAppState()
    document.body.classList.toggle('dark', appState.isDark)
  })

  return (
    <div class="fixed inset-0 flex items-center justify-center  z-990 bg-black dark text-fg1">
      <div class="w-460px flex gap-3">
        <div class="flex-1">
          <Input value={pass()} onChange={setPass} type="password" />
        </div>
        <div>
          <Button onClick={() => actions.login(pass()).catch(() => {
            dialog.error({
              title: 'Login failed',
              content: 'Please check your password',
            })
          })}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}
