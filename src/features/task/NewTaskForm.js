import { useState, useEffect } from "react";

import { useCreateTaskMutation } from "./taskApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from "@fortawesome/free-solid-svg-icons";


const NewTaskForm = ({  users  }) => {
  const [createNewTask, { isLoading, isSuccess, isError, error }] = useCreateTaskMutation();
  const navigate = useNavigate();
  

  //const [taskNumber, setTaskNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([users[0].id]);

  useEffect(() => {
    if (isSuccess) {
      setTitle('');
      //setTaskNumber('');
      setDescription('');
      setSelectedEmployees([]);
      navigate('/dash/task');
    }
  }, [isSuccess, navigate ,createNewTask]);

  const onTitleChanged = e => setTitle(e.target.value);
  const onDescriptionChanged = e => setDescription(e.target.value);
  /* const onUserIdChanged = e => setSelectedEmployees(e.target.value); */
  
  const onUsersChanged = e => {
    const values = Array.from(
        e.target.selectedOptions, //HTMLCollection 
        (option) => option.value
    )
    console.log("Selected Employees:", values);
    setSelectedEmployees(values)
}
  const canSave = [ title, description,selectedEmployees].every(Boolean) && !isLoading;
  
  const onSaveNoteClicked = async e => {
    e.preventDefault();
    if (canSave) {
      await createNewTask({ selectedEmployees, title, description});
     
    }
  };
  
  const options = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.username}
    </option>
  ));
  const errClass = isError ? "errmsg" : "offscreen";
  

  return (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveNoteClicked}>
        <div className="form__title-row">
          <h2>New Task</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="title">
          Title:
        </label>
        <input
          className={`form__input `}
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        <label className="form__label" htmlFor="text">
          Description:
        </label>
        <textarea
          className={`form__input form__input--text`}
          id="text"
          name="text"
          value={description}
          onChange={onDescriptionChanged}
        />

        <label className="form__label form__checkbox-container" htmlFor="username">
          ASSIGNED TO:
        </label>
        <select
          id="username"
          name="username"
          className="form__select"
          value={selectedEmployees}
          onChange={onUsersChanged}
          multiple 
        >
          {options}
        </select>
      </form>
    </>
  );
};

export default NewTaskForm;
