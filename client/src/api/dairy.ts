import { http } from '~/utils/request'

export interface ResDairy {
  date: string
  content: string
  created_at: string
  updated_at: string
}

export interface ResDairies {
  data: ResDairy[]
  total: number
}
export function getDairies(params: {
  pn?: number
  ps?: number
  truncate?: number
}) {
  return http.get<ResDairies>('/diary', { params: {
    pn: params.pn,
    ps: params.ps,
    truncate: params.truncate || 45,
  } })
}

export function getDiary(date: string) {
  return http.get<ResDairy>(`/diary/${date}`)
}

export function apiGetDiaryDates(start: string, end: string, unit: 'day' | 'month' | 'year') {
  return http.get<{ dates: string[] }>(`/dates`, { params: { start, end, unit } })
}

export function apiGetAdjacentDiaryDates(currentDate: string) {
  return http.get<{ prev: string, next: string }>(`/dates/${currentDate}`)
}

export function apiSaveDiary(data: { date: string, content: string }) {
  return http.post(`/diary`, { data })
}

export function apiDiaryExist(date: string) {
  return http.get<{ exist: boolean }>(`/diary/exist/${date}`)
}

export function apiDeleteDiary(date: string) {
  return http.delete(`/diary/${date}`)
}
