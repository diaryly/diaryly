import Axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
} from 'axios'

import useUserState from '~/states/user-state'

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  // 请求超时时间
  timeout: 10000,
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  baseURL: import.meta.env.VITE_API_URL,
}

function formatToken(token: string) {
  return `Bearer ${token}`
}

class PureHttp {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  /** 保存当前`Axios`实例对象 */
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig)

  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    PureHttp.axiosInstance.interceptors.request.use(
      async (config): Promise<any> => {
        const [state] = useUserState()
        /** 请求白名单，放置一些不需要`token`的接口（通过设置请求白名单，防止`token`过期后再请求造成的死循环问题） */
        const whiteList = ['/refresh_token', '/login']
        config.headers.Authorization = formatToken(state.accessToken)
        return whiteList.some(url => config.url?.endsWith(url))
          ? config
          : new Promise((resolve) => {
            resolve(config)
          })
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = PureHttp.axiosInstance
    instance.interceptors.response.use(
      (response) => {
        return response.data
      },
      (error) => {
        const $error = error
        $error.isCancelRequest = Axios.isCancel($error)
        const msg = error.response?.data.msg

        const status = error.response?.status || 0
        // 400
        if (status === 401) {
          useUserState()[1].logout()
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject()
        }

        if (msg) {
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject({
            status,
            msg,
          })
        }
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({
          status,
          msg: $error,
        })
      },
    )
  }

  /** 通用请求工具函数 */
  public request<T = {}>(
    method: 'post' | 'get' | 'delete',
    url: string,
    param?: AxiosRequestConfig,
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
    } as AxiosRequestConfig

    // 单独处理自定义请求/响应回调
    return new Promise((resolve, reject) => {
      PureHttp.axiosInstance
        .request(config)
        .then((response) => {
          resolve(response as any)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /** 单独抽离的`post`工具函数 */
  public post<T = any>(
    url: string,
    params?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>('post', url, params)
  }

  /** 单独抽离的`get`工具函数 */
  public get<T = any>(
    url: string,
    params?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>('get', url, params)
  }

  /** 单独抽离的`delete`工具函数 */
  public delete<T = any>(
    url: string,
    params?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>('delete', url, params)
  }
}

export const http = new PureHttp()
