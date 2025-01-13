import { esday } from 'esday'
import { DatePicker } from 'jige-ui'
import { createMemo, createSignal } from 'solid-js'
import { apiGetDiaryDates } from '~/api/dairy'
import { useHeadContext } from '~/states/head-context'

export function DiaryDatePicker(props: {
  shouldDisable?: boolean
}) {
  const [state, actions] = useHeadContext()
  const [hlDates, setHlDates] = createSignal<string[]>([])
  const [currDates, setCurrDates] = createSignal<string[]>([])
  const dsDates = createMemo(() => {
    return props.shouldDisable ? currDates().filter(v => !hlDates().includes(v)) : []
  })
  return (
    <DatePicker
      value={state.currDate}
      onChange={actions.setCurrDate}
      highlightYears={async ([start, end]) => {
        const res = await apiGetDiaryDates(`${start}-01-01`, `${end}-12-31`, 'year')
        return res.dates.map(v => Number.parseInt(v))
      }}

      highlightMonths={async (year) => {
        const res = await apiGetDiaryDates(`${year}-01-01`, `${year}-12-31`, 'month')
        return res.dates
      }}

      highlightDates={async (year, month, dates) => {
        setCurrDates(dates)
        const startDate = esday().year(year).month(month - 1).startOf('month').format('YYYY-MM-DD')
        const endDate = esday().year(year).month(month + 1).endOf('month').format('YYYY-MM-DD')
        const res = await apiGetDiaryDates(startDate, endDate, 'day')
        setHlDates(res.dates || [])
        return res.dates
      }}

      disabledDates={dsDates()}

    />
  )
}
