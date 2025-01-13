import { createResource } from 'solid-js'

/**
 * tiny wrapper around createResource to make it won't trigger suspense
 */
export function createFetch<T>(fetcher: () => Promise<T>) {
  const [data, { refetch, mutate }] = createResource(fetcher, {
    initialValue: undefined,
  })

  const realData = () => data.latest


  Object.defineProperty(realData, 'loading', {
    get() {
      return data.loading
    },
  })


  Object.defineProperty(realData, 'error', {
    get() {
      return data.error
    },
  })

  return [realData as {
    (): T | undefined
    loading: boolean
    error: any
  }, { refetch, mutate }] as const
}
