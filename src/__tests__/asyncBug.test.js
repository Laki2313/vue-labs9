import { describe, it, expect, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePostsStore } from '../stores/postsStore'

describe('Async Race Bug Fix', () => {
  it('ignores old responses and keeps latest data', async () => {
    setActivePinia(createPinia())

    const store = usePostsStore()

    let resolveFirst
    let resolveSecond

    global.fetch = vi.fn()
      .mockImplementationOnce(() =>
        new Promise(resolve => {
          resolveFirst = () =>
            resolve({
              json: () => Promise.resolve([{ id: 1, title: 'OLD DATA' }])
            })
        })
      )
      .mockImplementationOnce(() =>
        new Promise(resolve => {
          resolveSecond = () =>
            resolve({
              json: () => Promise.resolve([{ id: 2, title: 'NEW DATA' }])
            })
        })
      )

    store.fetchItems()
    store.fetchItems()

    resolveSecond()
    await Promise.resolve()

    resolveFirst()
    await Promise.resolve()

    expect(store.items[0].title).toBe('NEW DATA')
  })
})