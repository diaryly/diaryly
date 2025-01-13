/* @refresh reload */
import { Router } from '@solidjs/router'
import { render } from 'solid-js/web'
import { enableGlobalStore } from 'solid-uses'

import routes from 'virtual:pages'
import { AnimatedRouterWrapper, AppLayout } from './router'
import '~/style/color.scss'
import '@chinese-fonts/xiaolai/dist/Xiaolai/result.css'
import 'uno.css'
import '~/style/app.css'

const root = document.querySelector('#root')

const NewRoutes = routes.map((route: any) => {
  return {
    ...route,
    component: (props: any) => (
      <AnimatedRouterWrapper>
        <route.component {...props} />
      </AnimatedRouterWrapper>
    ),
  }
})

render(
  () => (
    <Router root={(props) => {
      return <AppLayout {...props} />
    }}
    >
      {NewRoutes}
    </Router>
  ),
  root!,
)

enableGlobalStore()
