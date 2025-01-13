import { esday } from 'esday'
import { Skeleton } from 'jige-ui'
import { createMemo } from 'solid-js'
import './diary-card.scss'

export function DiaryCardSk() {
  return (
    <div class="flex h-146px w-348px rounded-xl overflow-hidden bg-t-bg1 b b-t-border diary-card-sk">
      <div class="h-full w-38% flex flex-col items-center justify-center">
        <Skeleton.Node width="4em" height="1em" />
        <Skeleton.Node width="2em" height=".9em" class="mt-1" />
      </div>
      <div class="h-full w-62% flex flex-col p-2 bg-t-bg3 pt-8">
        <Skeleton.Text rows={3} />
      </div>
    </div>
  )
}

export function DiaryCard(props: {
  date: string
  mood?: string
  summary: string
  image?: string
}) {
  const realDateInst = createMemo(() => {
    return esday(props.date)
  })

  const dayOfWeek = createMemo(() => {
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

    return days[realDateInst().day()]
  })

  return (
    <a
      class="diary-card flex h-146px w-348px rounded-xl overflow-hidden bg-t-bg1 b b-t-border"
      href={`/diary/${props.date}`}
      title={props.date}
    >
      <div class="h-full w-38% flex flex-col items-center justify-center">
        <div>{realDateInst().format('MM/DD')}</div>
        <div class="text-xs op-60">
          {dayOfWeek()}
        </div>
      </div>
      <div class="h-full w-62% flex p-2 bg-t-bg3">
        {`${props.summary}...`}
      </div>
    </a>
  )
}
