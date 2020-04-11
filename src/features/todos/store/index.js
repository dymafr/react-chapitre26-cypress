import { injectReducer } from "../../../store";
import { todosReducer } from './reducers';

injectReducer('todos', todosReducer);
