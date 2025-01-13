import { apiDeleteDiary, apiDiaryExist, apiSaveDiary } from '~/api/dairy'
import { useHeadContext } from '~/states/head-context'
import { useTools } from '~/utils/tools'
import { DiaryDatePicker } from './shared/DiaryDatePicker'
import { NavItem } from './shared/NavItem'

export function OnPageWrite() {
  const [state, actions] = useHeadContext()
  const { $d } = useTools()

  const saveDiary = async () => {
    try {
      await apiSaveDiary({
        date: state.currDate,
        content: state.currContent,
      })
      $d.success({
        title: '成功',
        content: '保存成功',
      })
    }
    catch {
      $d.error({
        title: '错误',
        content: '保存失败',
      })
    }
  }

  const handleSave = async () => {
    if (state.loading)
      return
    actions.setLoading(true)
    const exist = await apiDiaryExist(state.currDate)
    if (exist.exist) {
      if (!state.currContent.trim()) {
        $d.warning({
          title: '错误',
          content: '你清空了这篇日记，你是要删除吗',
          onPositiveClick: async () => {
            await apiDeleteDiary(state.currDate).then(() => {
              $d.success({
                title: '成功',
                content: '删除成功',
              })
            }).catch(() => {
              $d.error({
                title: '错误',
                content: '删除失败',
              })
            })
            actions.setLoading(false)
          },
          onNegativeClick: () => {
            actions.setLoading(false)
          },
        })
      }
      else {
        $d.warning({
          title: '警告',
          content: '日记已存在，是否覆盖？',
          onPositiveClick: async () => {
            await saveDiary()
            actions.setLoading(false)
          },
          onNegativeClick: () => {
            actions.setLoading(false)
          },
        })
      }
    }
    else {
      await saveDiary()
      actions.setLoading(false)
    }
  }

  return (
    <>
      <div>
        <NavItem icon="i-ri-home-4-line" tooltip="主页" href="/" />
      </div>
      <div>
        <DiaryDatePicker />
      </div>
      <div>
        <NavItem
          icon={state.loading ? 'i-ri-loader-5-fill' : 'i-ri-check-line'}
          tooltip="保存"
          disabled={state.loading}
          loading={state.loading}
          onClick={() => {
            handleSave()
          }}
        />
      </div>
    </>
  )
}
