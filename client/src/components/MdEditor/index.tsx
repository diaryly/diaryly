import { Button, Scrollbar, Spin } from 'jige-ui'

import { EditorContext, EditorMain, EditorProvider, emptyAction, redoAction, undoAction } from 'solid-editor-core'
import { basicDarkTheme, basicLightTheme } from 'solid-editor-core/themes'

import { useAppState } from '~/states/app-state'
import './md-editor.scss'

function ScrollMian() {
  const [state] = EditorContext.useContext()
  const [appState] = useAppState()
  return (
    <div class="w-full px-2">
      <div class="flex flex-col w-full rounded-md shadow-8 bg-t-bg1">
        <div class="flex gap-1 items-center text-lg p-1 b-b b-t-border">
          <Button variant="text" onClick={() => { undoAction(state.cm!) }} icon={<div class="i-ri-arrow-go-back-line" />} />
          <Button variant="text" onClick={() => { redoAction(state.cm!) }} icon={<div class="i-ri-arrow-go-forward-line" />} />
          <Button variant="text" onClick={() => { emptyAction(state.cm!) }} icon={<div class="i-ri-eraser-line" />} />
        </div>
        <Scrollbar height="400px" class="cursor-text" onClick={() => { state.cm?.focus() }}>
          <EditorMain theme={appState.isDark ? basicDarkTheme : basicLightTheme} />
        </Scrollbar>
      </div>
    </div>
  )
}

export function MdEditor(props: {
  content: string
  setContent: (content: string) => void
  loading?: boolean
}) {
  return (
    <Spin spinning={props.loading}>
      <EditorProvider class="no-scroll flex flex-col w-full " content={props.content} setContent={props.setContent}>
        <ScrollMian />
      </EditorProvider>
    </Spin>
  )
}
