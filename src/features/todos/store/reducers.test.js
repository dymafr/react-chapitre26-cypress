import { todosReducer, initialState } from "./reducers";
import { ADD_TODO_SUCCESS, ADD_TODO_ERROR } from "./actions";

describe("test todos reducers", () => {
  test("should return initialState", () => {
    expect(todosReducer(undefined, {})).toEqual(initialState);
  });

  test("should add a new todo", () => {
    const todo = { name: "test", done: false };
    const action = {
      type: ADD_TODO_SUCCESS,
      todo,
    };
    expect(todosReducer(initialState, action)).toEqual({
      data: [todo],
      loading: false,
      error: null,
    });
  });

  test("should set an error", () => {
    const error = new Error("error");
    const action = {
      type: ADD_TODO_ERROR,
      error,
    };
    expect(todosReducer(initialState, action)).toEqual({
      data: [],
      loading: false,
      error,
    });
  });
});
