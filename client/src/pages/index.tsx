import { useSearchParams } from '@solidjs/router'
import { list } from 'radash'

import { createMemo, For, Show } from 'solid-js'
import { watch } from 'solid-uses'
import { getDairies } from '~/api/dairy'
import { DiaryCard, DiaryCardSk } from '~/components/DiaryCard'
import { createFetch } from '~/utils/createFetch'
import './index.scss'

export default function Home() {
  const [searchParams] = useSearchParams()
  const page = createMemo(() => Number.parseInt(searchParams.page as string) || 1)

  const [data, { refetch }] = createFetch(() => getDairies({ pn: page() }))

  watch(page, () => { refetch() })

  return (
    <div class="box flex items-center justify-center flex-col">
      <Show
        when={data.loading}
        fallback={(
          <For each={data()?.data}>
            {item => (
              <div class="mb-8">
                <DiaryCard date={item.date} summary={item.content.slice(0, 200)} />
              </div>
            )}
          </For>
        )}
      >
        <For each={list(8)}>
          {() => (
            <div class="mb-8">
              <DiaryCardSk />
            </div>
          )}
        </For>
      </Show>

    </div>
  )
}
