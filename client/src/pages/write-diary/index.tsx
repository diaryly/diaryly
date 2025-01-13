import { esday } from 'esday'
import { isArray } from 'radash'
import { watch } from 'solid-uses'
import { getDiary } from '~/api/dairy'
import { MdEditor } from '~/components/MdEditor'
import { useHeadContext } from '~/states/head-context'
import { createFetch } from '~/utils/createFetch'
import { useTools } from '~/utils/tools'

export default function WriteDiary() {
  const { $q, $n } = useTools()
  const [state, actions] = useHeadContext()
  actions.setCurrDate(esday().format('YYYY-MM-DD'))

  const [data, { refetch }] = createFetch(async () => {
    const d = $q.date
    if (!d || isArray(d)) {
      return {
        content: '',
      }
    }
    const res = await getDiary(d)
    return res
  })

  watch(data, (d) => {
    actions.setCurrContent(d?.content || '')
  })

  watch(() => $q.date, (d) => {
    if (!d || isArray(d))
      return
    refetch()
    actions.setCurrDate(d)
  })

  watch(() => state.currDate, (d) => {
    $n(`/write-diary?date=${d}`)
  })

  return (
    <div class="mt-40px mb-40px">
      <MdEditor loading={data.loading} setContent={actions.setCurrContent} content={state.currContent} />
    </div>
  )
}
