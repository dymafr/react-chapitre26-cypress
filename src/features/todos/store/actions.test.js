import {
  EDIT_TODO_SUCCESS,
  editTodoSuccessAction,
  EDIT_TODO_ERROR,
  editTodoErrorAction,
  ADD_TODO_SUCCESS,
  tryAddTodoAction,
  ADD_TODO_ERROR,
} from "./actions";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { saveTodos } from "../../../config/api.firebase";

jest.mock("../../../config/api.firebase", () => ({
  saveTodos: jest.fn(),
}));

describe("test sync action", () => {
  test("should create editTodoSuccessAction action", () => {
    const index = 0;
    const todo = {
      name: "test",
      done: false,
    };
    const action = {
      type: EDIT_TODO_SUCCESS,
      payload: {
        todo,
        index,
      },
    };
    expect(editTodoSuccessAction(todo, index)).toEqual(action);
  });

  test("should create editTodoErrorAction action", () => {
    const error = new Error("error");
    const action = {
      type: EDIT_TODO_ERROR,
      error,
    };
    expect(editTodoErrorAction(error)).toEqual(action);
  });
});

describe("test async actions", () => {
  const initialState = { todos: { data: [] } };
  const mockStore = configureMockStore([thunk]);

  test("should dispatch addTodoSuccessAction action", async () => {
    const store = mockStore(initialState);
    const todo = {
      name: "test",
      done: false,
    };
    const action = {
      type: ADD_TODO_SUCCESS,
      todo,
    };

    await store.dispatch(tryAddTodoAction(todo));
    expect(saveTodos).toHaveBeenCalled();
    expect(store.getActions()[0]).toEqual(action);
  });

  test("should dispatch addTodoErrorAction action", async () => {
    const store = mockStore(initialState);
    const todo = {
      name: "test",
      done: false,
    };
    const error = new Error("error");
    const action = {
      type: ADD_TODO_ERROR,
      error,
    };

    saveTodos.mockRejectedValueOnce(error);

    try {
      await store.dispatch(tryAddTodoAction(todo));
    } catch (e) {
      expect(saveTodos).toHaveBeenCalled();
      expect(saveTodos).toThrowError(error);
      expect(store.getActions()[0]).toEqual(action);
    }
  });
});
