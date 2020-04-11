import React from "react";
import { Formik, useField } from "formik";

const MyInput = (props) => {
  const [field] = useField(props);

  return <input className="form-control mr-2" {...field} {...props} />;
};

const TodoEditMode = (props) => {
  const { editTodo, toggleEditMode, todo } = props;

  const submit = (values) => {
    editTodo({ ...todo, ...values, editMode: false });
  };

  return (
    <Formik onSubmit={submit} initialValues={{ name: todo.name }}>
      {({ handleSubmit }) => (
        <form
          className="d-flex flex-row justify-content-start align-items-center py-2"
          onSubmit={handleSubmit}
        >
          <MyInput name="name" type="text" />
          <button type="submit" className="btn btn-sm btn-primary mr-2">
            Save
          </button>
          <button
            type="button"
            onClick={toggleEditMode}
            className="btn btn-sm btn-warning"
          >
            Cancel
          </button>
        </form>
      )}
    </Formik>
  );
};

export default TodoEditMode;
