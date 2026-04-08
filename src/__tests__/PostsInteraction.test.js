import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import PostsView from '../views/PostsView.vue'
import { usePostsStore } from '../stores/postsStore'

describe('PostsView Interaction Tests', () => {
  it('calls fetchItems on search input', async () => {
    setActivePinia(createPinia())

    const store = usePostsStore()
    store.fetchItems = vi.fn()

    const wrapper = mount(PostsView)

    await wrapper.find('input').setValue('Vue')

    expect(store.fetchItems).toHaveBeenCalled()
  })

  it('calls fetchItems on next page', async () => {
    setActivePinia(createPinia())

    const store = usePostsStore()
    store.fetchItems = vi.fn()

    const wrapper = mount(PostsView)

    await wrapper.findAll('button')[1].trigger('click')

    expect(store.fetchItems).toHaveBeenCalled()
    expect(store.page).toBe(2)
  })

  it('calls fetchItems on prev page', async () => {
    setActivePinia(createPinia())

    const store = usePostsStore()
    store.page = 2
    store.fetchItems = vi.fn()

    const wrapper = mount(PostsView)

    await wrapper.findAll('button')[0].trigger('click')

    expect(store.fetchItems).toHaveBeenCalled()
    expect(store.page).toBe(1)
  })
})