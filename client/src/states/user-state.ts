import { defineGlobalStore } from 'solid-uses'
import { apiLogin } from '~/api'

const userState = defineGlobalStore('user-state', {
  state: () => ({
    accessToken: '',
  }),

  getters: {
    isLogin() {
      return !!this.state.accessToken
    },
  },
  methods: {
    async login(password: string) {
      const res = await apiLogin(password)
      this.actions.setAccessToken(res.access_token)
      location.reload()
    },

    async logout() {
      this.actions.setAccessToken('')
    },
  },
  persist: 'sessionStorage',
})

export default function useUserState() {
  return userState
}
