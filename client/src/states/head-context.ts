import type { JSX } from 'solid-js'
import { esday } from 'esday'
import { createComponentState } from 'solid-uses'

const headContext = createComponentState({
  state: () => ({
    Element: undefined as JSX.Element | undefined,
    currPage: 1,
    currDate: esday().format('YYYY-MM-DD'),
    currContent: '',
    loading: false,
  }),
})

export const useHeadContext = headContext.useContext
export { headContext }
