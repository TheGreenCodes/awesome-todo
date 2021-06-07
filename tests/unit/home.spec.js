import { shallowMount } from "@vue/test-utils";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import Vue from "vue";
import nock from "nock";
import flushPromises from "flush-promises";

import Home from "@/views/Home.vue";

const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");

// Set the mock adapter on the default instance
const mock = new MockAdapter(axios);

describe("Home", () => {
  const build = () => {
    const wrapper = shallowMount(Home, {});
    return { wrapper };
  };
  beforeEach(() => {
    Vue.use(BootstrapVue);
    Vue.use(BootstrapVueIcons);
    mock.reset();
  });

  afterEach(() => mock.restore());

  it("Displays welcome message", () => {
    const { wrapper } = build();
    const welcomeMessage = "Welcome to TheGreenCodes awesome to-do list";
    expect(wrapper.text()).toMatch(welcomeMessage);
  });
  it("Displays a message when there are no todo items", () => {
    const wrapper = shallowMount(Home, {
      data() {
        return {
          todoItems: []
        };
      }
    });

    const titleFound = wrapper.find("h4");
    const emptyTodoListMessage = "You have no existing todo!";
    expect(titleFound.text()).toMatch(emptyTodoListMessage);
  });
  it("Does not display message when there are todo items", () => {
    const wrapper = shallowMount(Home, {
      data() {
        return {
          todoItems: [
            { id: "1", title: "new item", content: "make awesome content" }
          ]
        };
      }
    });
    expect(wrapper.find("h4").exists()).toBe(false);
    // Run the tests, and take a look at the spectacular failure. Let's implement this.
  });

  it("Gets all todo items", async () => {
    const wrapper = shallowMount(Home);
    // arrange

    const expectedItems = {
      data: [
        {
          id: "1",
          title: "new item",
          content: "make awesome content"
        },
        {
          id: "2",
          title: "new item2",
          content: "make more awesome content"
        }
      ]
    };

    const request = nock(
      "https://my-json-server.typicode.com/TheGreenCodes/awesome-todo-database/"
    )
      .get(`todos/`)
      .reply(200, expectedItems);

    // act
    await wrapper.vm.getToDoItems();
    await flushPromises();
    console.log(request);

    // assert
    // expect(wrapper.vm.todoItems).toEqual(expectedItems);
    // expect(request.isDone()).toBe(true);

    // Finally, we make sure we've rendered the content from the API.
    const todos = wrapper.findAll('[data-test="todos"]');
    expect(todos).toHaveLength(2);
    // const listItems = wrapper.findAll('li')
    // expect(listItems).toHaveLength(2)
  });
});
