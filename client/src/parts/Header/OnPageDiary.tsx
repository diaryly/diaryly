import { isArray } from 'radash'
import { watch } from 'solid-uses'
import { apiGetAdjacentDiaryDates } from '~/api/dairy'
import { useHeadContext } from '~/states/head-context'
import { createFetch } from '~/utils/createFetch'
import { useTools } from '~/utils/tools'
import { DiaryDatePicker, NavItem } from './shared'

export function OnPageDiary() {
  const [state, actions] = useHeadContext()
  const { $p, $n } = useTools()
  const [adjDates, { refetch }] = createFetch(async () => {
    const d = $p.date
    if (!d || isArray(d))
      return { prev: '', next: '' }
    const res = await apiGetAdjacentDiaryDates(d)
    return res
  })

  watch(() => $p.date, (d) => {
    if (!d || isArray(d))
      return
    actions.setCurrDate(d)
    refetch()
  })

  watch(() => state.currDate, (d) => {
    $n(`/diary/${d}`)
  })

  return (
    <>
      <div>
        <NavItem icon="i-ri-home-4-line" tooltip="主页" href="/" />
      </div>
      <div class="flex items-center justify-center gap-2">
        <NavItem
          icon="i-ri-arrow-left-s-line"
          tooltip="上一篇"
          href={`/diary/${adjDates()?.prev}`}
          disabled={!adjDates()?.prev || adjDates.loading}
        />
        <DiaryDatePicker shouldDisable />
        <NavItem
          icon="i-ri-arrow-right-s-line"
          tooltip="下一篇"
          href={`/diary/${adjDates()?.next}`}
          disabled={!adjDates()?.next || adjDates.loading}
        />
      </div>
      <div>
        <NavItem
          icon="i-ri-edit-box-line"
          tooltip="编辑"
          href={`/write-diary?date=${$p.date}`}
        />
      </div>
    </>
  )
}
