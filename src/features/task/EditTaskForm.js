import { useState, useEffect } from "react";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "./taskApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave ,faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { STATUS } from '../../config/taskstat';

const EditTaskForm = ({ task , users}) => {
  const [updateTask, { isLoading, isSuccess, isError, error }] = useUpdateTaskMutation();
  
  const [deleteTask, {
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delerror
}] = useDeleteTaskMutation()
  
  
  
  const navigate = useNavigate();

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [selectedEmployees, setSelectedEmployees] = useState(task.selectedEmployees);
  const [status, setStatus] = useState(task.status);
  const [startDatet, setStartDatet] = useState('');
  const [timeOut, setTimeOutt] = useState('');


  useEffect(() => {
    if (isSuccess||isDelSuccess) {
      navigate('/dash/task');
    }
  }, [isSuccess, navigate ,isDelSuccess]);

  const onTitleChanged = e => setTitle(e.target.value);
  const onDescriptionChanged = e => setDescription(e.target.value);

  const onUsersChanged = e => {
    const values = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedEmployees(values);
  };
  const onStatusChanged = e =>setStatus(e.target.value);
    


  const canSave = [title, description, selectedEmployees].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async e => {
    e.preventDefault();
    if (canSave) {
      await updateTask({
        id: task.id,
        selectedEmployees,
        title,
        description , 
        status,startDatet,timeOut
      });
    }
  };


  const onDeleteTaskClicked = async () => {
    await deleteTask({ id: task.id })
}

  const options = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.username}
    </option>
  ));

  const options1 = Object.values(STATUS).map(status => {
    return (
        <option
            key={status}
            value={status}

        > {status}</option >
    )
})

  const errClass = isError ? "errmsg" : "offscreen";

  return (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveNoteClicked}>
        <div className="form__title-row">
          <h2>Edit Task</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteTaskClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
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
          values={selectedEmployees}
          onChange={onUsersChanged}
          multiple
        >
          {options}
        </select>


        <label className="form__label form__checkbox-container" htmlFor="username">
         Status:
        </label>
        <select
          id="username"
          name="username"
          className="form__select"
          values={status}
          onChange={onStatusChanged}
          
        >
          {options1}
        </select>
      </form>
    </>
  );
};

export default EditTaskForm;
