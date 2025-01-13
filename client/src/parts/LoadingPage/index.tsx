import { Spin } from 'jige-ui'

export default function LoadingPage() {
  return (
    <Spin spinning={true}>
      <div class="h-xl w-xl" />
    </Spin>
  )
}
