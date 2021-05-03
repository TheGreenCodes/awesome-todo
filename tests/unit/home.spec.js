import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Home.vue', () => {
  it('Displays welcome message', () => {
    const welcomeMessage = 'Welcome to TheGreenCodes awesome to-do list'
    const wrapper = shallowMount(Home)
    expect(wrapper.text()).toMatch(welcomeMessage)
  })
})
