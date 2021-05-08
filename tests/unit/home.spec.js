import { shallowMount } from '@vue/test-utils'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import Vue from 'vue'
import Home from '@/views/Home.vue'

describe('Home.vue', () => {
  beforeEach(() => {
    Vue.use(BootstrapVue)
    Vue.use(BootstrapVueIcons)
  })
  it('Displays welcome message', () => {
    const wrapper = shallowMount(Home)
    const welcomeMessage = 'Welcome to TheGreenCodes awesome to-do list'
    expect(wrapper.text()).toMatch(welcomeMessage)
  })
  it('Displays a message when there are no todo items', () => {
    const wrapper = shallowMount(Home, {
      data () {
        return {
          todoItems: null
        }
      }
    })

    const titleFound = wrapper.find('h4')
    const emptyTodoListMessage = 'You have no existing todo!'
    expect(titleFound.text()).toMatch(emptyTodoListMessage)
  })
  it('Does not display message when there are todo items', () => {
    const wrapper = shallowMount(Home, {
      data () {
        return {
          todoItems: [{ id: '1', title: 'new item', content: 'make awesome content' }]
        }
      }
    })
    // const emptyTodoTitleFound = wrapper.find('h4')
    const emptyTodoListMessage = 'You have no existing todo!'
    expect(emptyTodoListMessage).toBe(false)
  })
})
