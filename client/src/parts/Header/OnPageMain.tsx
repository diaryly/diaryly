import { useSearchParams } from '@solidjs/router'
import { createMemo } from 'solid-js'
import { NavItem, Settings } from './shared'

export function OnPageMain() {
  const [searchParams] = useSearchParams()
  const page = createMemo(() => Number.parseInt(searchParams.page as string) || 1)
  return (
    <>
      <div>
        <NavItem icon="i-ri-arrow-left-s-line" tooltip="上一页" href={`?page=${page() - 1}`} disabled={(page() - 1) < 1} />
      </div>
      <div class="flex gap-2">
        <NavItem icon="i-ri-pencil-line" tooltip="写日记" href="/write-diary" />
        <Settings />
      </div>
      <div>
        <NavItem icon="i-ri-arrow-right-s-line" tooltip="下一页" href={`?page=${page() + 1}`} />
      </div>
    </>
  )
}
