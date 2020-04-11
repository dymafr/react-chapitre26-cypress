import * as actions from "./actions";

// {
//   todos: {
//     data: [{
// name: '',
// done: false,
// editMode: false
// }],
//     loading: false,
//     error: null
//   },
// }

export const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_TODO_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: [...state.data, action.todo],
      };
    }
    case actions.EDIT_TODO_SUCCESS: {
      const { index, todo } = action.payload;
      return {
        ...state,
        loading: false,
        data: state.data.map((t, i) => (i === index ? todo : t)),
      };
    }

    case actions.DELETE_TODO_SUCCESS: {
      const { index } = action;
      return {
        ...state,
        loading: false,
        data: state.data.filter((t, i) => i !== index),
      };
    }
    case actions.DELETE_TODO_ERROR:
    case actions.FETCH_TODO_ERROR:
    case actions.EDIT_TODO_ERROR:
    case actions.ADD_TODO_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case actions.TOGGLE_EDIT_MODE: {
      const { index } = action;
      return {
        ...state,
        data: [
          ...state.data.map((t, i) =>
            i === index ? { ...t, editMode: !t.editMode } : t
          ),
        ],
      };
    }
    case actions.REQUEST_TODO: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.FETCH_TODO_SUCCESS: {
      if (action.todos) {
        return {
          ...state,
          data: [
            ...state.data,
            ...action.todos.map((t) => ({ ...t, editMode: false })),
          ],
          loading: false,
          error: null,
        };
      } else {
        return {
          ...state,
          loading: false,
        };
      }
    }
    default: {
      return state;
    }
  }
};
