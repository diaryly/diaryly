import { Modal, Slider, Switcher } from 'jige-ui'
import { useAppState } from '~/states/app-state'
import { NavItem } from './NavItem'

export function Settings() {
  const [appState, appActs] = useAppState()
  return (
    <Modal>
      <Modal.Trigger>
        <NavItem icon="i-ri-settings-3-line" tooltip="设置" />
      </Modal.Trigger>
      <Modal.Content>
        <div class="p-4 w-245px">
          <h1 class="text-24px">设置</h1>
          <div class="mt-2">
            <label class="block">主题</label>
            <div class="flex items-center gap-2">
              <span>暗色模式</span>
              <Switcher onChange={v => appActs.setIsDark(v)} value={appState.isDark} />
            </div>
            <div class="flex items-center gap-2">
              <span>HUE</span>
              <Slider min={0} max={360} step={1} value={appState.hue} onChange={v => appActs.setHue(v)} />
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  )
}
