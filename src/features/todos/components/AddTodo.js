import React, { useRef } from "react";

const AddTodo = (props) => {
  const ref = useRef();

  const submitTodo = () => {
    props.addTodo({
      name: ref.current.value,
      done: false,
    });

    ref.current.value = "";
  };

  return (
    <div className="d-flex mb-4">
      <input
        ref={ref}
        type="text"
        placeholder="Ajouter une todo"
        className="form-control mr-5"
      />
      <button onClick={submitTodo} className="btn btn-success">
        Ajouter
      </button>
    </div>
  );
};

export default AddTodo;
