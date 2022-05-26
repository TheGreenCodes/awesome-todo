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
    const { wrapper } = build({
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
    const wrapper = mount(Home, {
      data() {
        return {
          todoItems: [
            { id: "1", title: "new item", content: "make awesome content" }
          ]
        };
      }
    });

    expect(wrapper.html().includes("You have no existing todo!")).toBe(false);
  });

  it("Gets all todo items regardless of status", async () => {
    const { wrapper } = build();

    const expectedItems = {
      data: [
        {
          id: "1",
          title: "new item",
          content: "make awesome content",
          complete: true
        },
        {
          id: "2",
          title: "new item2",
          content: "make more awesome content",
          complete: false
        }
      ]
    };
    jest.spyOn(axios, "get").mockResolvedValue(expectedItems);

    await wrapper.vm.getToDoItems();
    await flushPromises();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("todos/");

    expect(wrapper.vm.todoItems).toEqual(expectedItems);

    // Finally, we make sure we've rendered the content from the API.
    const todos = wrapper.findAll('[data-test="todo"]');
    expect(todos).toHaveLength(2);
    expect(wrapper.html().includes("new item")).toBe(true);
  });
});
