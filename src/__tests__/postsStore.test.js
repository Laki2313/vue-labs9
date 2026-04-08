import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePostsStore } from '../stores/postsStore'

describe('Posts Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('fetchItems success', async () => {
    const store = usePostsStore()

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { id: 1, title: 'Test Post' }
          ])
      })
    )

    await store.fetchItems()

    expect(store.isLoading).toBe(false)
    expect(store.error).toBe(null)
    expect(store.items.length).toBe(1)
    expect(store.items[0].title).toBe('Test Post')
  })

  it('fetchItems error', async () => {
    const store = usePostsStore()

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false
      })
    )

    await store.fetchItems()

    expect(store.error).toBe('Помилка завантаження')
  })

  it('filteredItems getter works', () => {
    const store = usePostsStore()

    store.items = [
      { id: 1, title: 'Vue Test' },
      { id: 2, title: 'React Test' }
    ]

    store.query = 'vue'

    expect(store.filteredItems.length).toBe(1)
    expect(store.filteredItems[0].title).toBe('Vue Test')
  })
})