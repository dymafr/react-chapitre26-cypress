import { createSelector } from "reselect";

export const filterSelector = (state, filter) => filter;
export const todosSelector = (state) => state.todos;

export const todosListSelector = createSelector([todosSelector], (todos) =>
  todos ? todos.data : null
);

export const filteredTodoDataSelector = createSelector(
  [filterSelector, todosListSelector],
  (filter, todos) => {
    if (todos && filter) {
      switch (filter) {
        case "done": {
          return todos.filter((t) => t.done);
        }
        case "active": {
          return todos.filter((t) => !t.done);
        }
        default: {
          return todos;
        }
      }
    }
  }
);
