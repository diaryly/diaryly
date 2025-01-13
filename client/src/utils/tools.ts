import { useNavigate, useParams, useSearchParams } from '@solidjs/router'
import { useDialog } from 'jige-ui'

export function useTools(): {
  $d: ReturnType<typeof useDialog>
  $p: ReturnType<typeof useParams>
  $q: ReturnType<typeof useSearchParams>[0]
  $n: ReturnType<typeof useNavigate>
} {
  const $d = useDialog()
  const $p = useParams()
  const $q = useSearchParams()[0]
  const $n = useNavigate()
  return { $d, $p, $q, $n }
}
