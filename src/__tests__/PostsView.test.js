import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { usePostsStore } from '../stores/postsStore'
import PostsView from '../views/PostsView.vue'

describe('PostsView UI States', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('shows loading state', () => {
    const store = usePostsStore()
    store.isLoading = true

    const wrapper = mount(PostsView)

    expect(wrapper.text()).toContain('Завантаження...')
  })

  it('shows error state', () => {
    const store = usePostsStore()
    store.error = 'Помилка API'

    const wrapper = mount(PostsView)

    expect(wrapper.text()).toContain('Помилка API')
  })

  it('shows items list', () => {
    const store = usePostsStore()

    store.items = [
      { id: 1, title: 'Test Post 1' },
      { id: 2, title: 'Test Post 2' }
    ]

    const wrapper = mount(PostsView)

    expect(wrapper.text()).toContain('Test Post 1')
    expect(wrapper.text()).toContain('Test Post 2')
  })

  it('shows empty state', () => {
    const store = usePostsStore()

    store.items = []
    store.error = null
    store.isLoading = false

    const wrapper = mount(PostsView)

    expect(wrapper.text()).toContain('Немає даних')
  })
})