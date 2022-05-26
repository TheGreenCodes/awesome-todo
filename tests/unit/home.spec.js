import { shallowMount, mount } from "@vue/test-utils";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import Vue from "vue";
import nock from "nock";
import axios from "axios";
import flushPromises from "flush-promises";

import Home from "@/views/Home.vue";

describe("Home", () => {
  const build = () => {
    const wrapper = mount(Home, {});
    return { wrapper };
  };
  beforeEach(() => {
    Vue.use(BootstrapVue);
    Vue.use(BootstrapVueIcons);
  });

  it("Displays application title", () => {
    const { wrapper } = build();
    const welcomeMessage = "Welcome to TheGreenCodes awesome to-do list";
    expect(wrapper.text()).toMatch(welcomeMessage);
  });
  it("Displays a message when there are no todo items", () => {
    const { wrapper } = build({});

    wrapper.setData({
      todoItems: []
    });

    const titleFound = wrapper.find("h4");
    const emptyTodoListMessage = "You have no existing todo!";
    expect(titleFound.text()).toMatch(emptyTodoListMessage);
  });

  it("Gets all todo items regardless of status", async () => {
    const { wrapper } = build();

    const expectedItems = {
      // ToDo: our items contain articles to read
      data: [
        {
          id: "1",
          title: "TheGreenCodes: Unit testing in Vue",
          content: "A guide to better predictable code.",
          complete: true
        },
        {
          id: "2",
          title: "TheGreenCodes: Tests must fail",
          content: "Building blocks to test driven development",
          complete: false
        },
        {
          id: "3",
          title: "TheGreenCodes: Tests must also pass",
          content: "This share",
          complete: false
        }
      ]
    };
    // on axios call, use expectedItems object
    jest.spyOn(axios, "get").mockResolvedValue(expectedItems);

    await wrapper.vm.getToDoItems();
    // make sure API request promises are complete before looking for articles to read
    await flushPromises();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("todos/");

    expect(wrapper.vm.todoItems).toEqual(expectedItems.data);

    // Finally, we make sure we've rendered the content from the API.
    const todos = wrapper.findAll('[data-test="todo"]');
    expect(todos).toHaveLength(3);

    // expect(todos[0].text()).toContain("TheGreenCodes: Unit testing in Vue");
    // we have articles now
    expect(wrapper.html().includes("You have no existing todo!")).toBe(false);
    expect(wrapper.html().includes("TheGreenCodes: Unit testing in Vue")).toBe(
      true
    );

    expect(
      wrapper.html().includes("Building blocks to test driven development")
    ).toBe(true);
  });
});
