import { http } from "~/utils/request";

export function apiLogin(password:string) {
  return http.post('/login', { data: { password } })
}
