import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../src/App.vue'

describe('App.vue', () => {
  it('renders heading', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Vue + Tailwind + Docker')
  })
})
