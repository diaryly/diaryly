import { Skeleton } from 'jige-ui'
import { marked } from 'marked'
import { Show } from 'solid-js'
import { watch } from 'solid-uses'
import { getDiary } from '~/api/dairy'
import { createFetch } from '~/utils/createFetch'
import { useTools } from '~/utils/tools'

export default function SingleDiary() {
  const { $p, $d, $n } = useTools()

  const [data, { refetch }] = createFetch(() => getDiary($p.date))

  watch([() => $p.date, () => data.error], ([,e]) => {
    if (e) {
      $d.error({
        negativeText: '',
        onPositiveClick() {
          $n('/', { replace: true })
        },
        onNegativeClick() {
          $n('/', { replace: true })
        },
        title: '错误',
        content: '获取日记失败',
      })
    }
    else {
      refetch()
    }
  })

  return (
    <div class="p-4 bg-t-bg1 min-h-250px mt-40px mb-40px shadow-8 mx-2 rounded-md">
      <Show
        when={data.loading || data.error}
        fallback={(
          <div innerHTML={marked(data()?.content || '', {
            async: false,
          })}
          />
        )}
      >
        <Skeleton.Text rows={6} />
      </Show>
    </div>
  )
}
