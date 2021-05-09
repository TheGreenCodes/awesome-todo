import { shallowMount, flushPromises } from '@vue/test-utils'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import Vue from 'vue'

import Home from '@/views/Home.vue'

const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')

// Set the mock adapter on the default instance
const mock = new MockAdapter(axios)

describe('Home.vue', () => {
  beforeEach(() => {
    Vue.use(BootstrapVue)
    Vue.use(BootstrapVueIcons)
    mock.reset()
  })

  afterAll(() => mock.restore())

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
    expect(wrapper.find('h4').exists()).toBe(false)
    // Run the tests, and take a look at the spectacular failure. Let's implement this.
  })

  it('Gets all todo items', async () => {
    mock
      .onGet('https://my-json-server.typicode.com/TheGreenCodes/awesome-todo-database/todos')
      .reply(200, {
        data: [
          { id: '1', title: 'new item', content: 'make awesome content' },
          { id: '2', title: 'new item2', content: 'make more awesome content' }
        ]
      })

    // axios.get('https://my-json-server.typicode.com/TheGreenCodes/awesome-todo-database/todos').then(response => {
    //   console.log(response.data)
    // })

    const wrapper = shallowMount(Home)
    await wrapper.vm.getToDoItems()

    // Wait until the DOM updates.
    // await flushPromises()

    // Finally, we make sure we've rendered the content from the API.
    const todos = wrapper.findAll('[data-test="todos"]')
    expect(todos).toHaveLength(2)
    // const listItems = wrapper.findAll('li')
    // expect(listItems).toHaveLength(2)
  })
})
