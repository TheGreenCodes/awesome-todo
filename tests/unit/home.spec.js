import { shallowMount } from '@vue/test-utils'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import Vue from 'vue'
import flushPromises from 'flush-promises'

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

  afterEach(() => mock.restore())

  it('Displays welcome message', () => {
    const wrapper = shallowMount(Home)
    const welcomeMessage = 'Welcome to TheGreenCodes awesome to-do list'
    expect(wrapper.text()).toMatch(welcomeMessage)
  })
  it('Displays a message when there are no todo items', () => {
    const wrapper = shallowMount(Home, {
      data() {
        return {
          todoItems: [],
        }
      },
    })

    const titleFound = wrapper.find('h4')
    const emptyTodoListMessage = 'You have no existing todo!'
    expect(titleFound.text()).toMatch(emptyTodoListMessage)
  })
  it('Does not display message when there are todo items', () => {
    const wrapper = shallowMount(Home, {
      data() {
        return {
          todoItems: [
            { id: '1', title: 'new item', content: 'make awesome content' },
          ],
        }
      },
    })
    expect(wrapper.find('h4').exists()).toBe(false)
    // Run the tests, and take a look at the spectacular failure. Let's implement this.
  })

  it('Gets all todo items', async () => {
    mock
      .onGet(
        'https://my-json-server.typicode.com/TheGreenCodes/awesome-todo-database/todos',
      )
      .reply(200, {
        data: [
          { id: '1', title: 'new item', content: 'make awesome content' },
          { id: '2', title: 'new item2', content: 'make more awesome content' },
        ],
      })

    const wrapper = shallowMount(Home, {
      data() {
        return {
          todoItems: [],
        }
      },
    })

    await wrapper.vm.getToDoItems()
    // * wait for the promises to be resolved
    await flushPromises()
    //* check length after promise is resolved
    console.log(wrapper.vm.todoItems)
    // expect(wrapper.vm.todoItems.length).toBe(1);

    // wrapper.vm.$nextTick(() => {
    //   expect(wrapper.vm.todoItems.length).toBe(1);
    // });

    // Wait until the DOM updates.

    // Finally, we make sure we've rendered the content from the API.
    // const todos = wrapper.findAll('[data-test="todos"]');
    // expect(todos).toHaveLength(2);
    // const listItems = wrapper.findAll('li')
    // expect(listItems).toHaveLength(2)
  })
})
