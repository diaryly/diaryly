import { Tooltip } from 'jige-ui'
import { Dynamic } from 'solid-js/web'

export function NavItem(props: {
  icon: string
  tooltip: string
  href?: string
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
}) {
  return (
    <Tooltip content={props.tooltip} disabled={props.disabled}>
      <Dynamic
        component={props.href ? 'a' : 'button'}
        class="p-2 flex items-center justify-center text-20px hover:bg-t-bg4 transition rounded-md text-fg3"
        classList={{
          'op-50 pointer-events-none': props.disabled,
          'animate-spin': props.loading,
        }}
        href={props.href}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        <div class={props.icon} />
      </Dynamic>
    </Tooltip>
  )
}
