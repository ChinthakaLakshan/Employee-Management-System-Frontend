import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth"
import { useCreateTaskMutation } from "./taskApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';

const NewTaskForm = ({  users  }) => {

  const { username ,isAdmin,isManager } = useAuth()
  const [createNewTask, { isLoading, isSuccess, isError, error }] = useCreateTaskMutation();
  const navigate = useNavigate();
  

  //const [taskNumber, setTaskNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]/* [users[0].username] */);
  const [startDatet, setStartDatet] = useState('');
  const [timeOut, setTimeOutt] = useState('');

  useEffect(() => {
    if (isSuccess) {
      setTitle('');
      //setTaskNumber('');
      setDescription('');
      setSelectedEmployees([]);
      setStartDatet('');
      setTimeOutt('');

      navigate('/dash/task');
    }
  }, [isSuccess, navigate ,createNewTask]);

  const onTitleChanged = e => setTitle(e.target.value);
  const onDescriptionChanged = e => setDescription(e.target.value);
  
  
  
  const onUsersChanged = e => {
    const values = Array.from(
        e.target.selectedOptions, //HTMLCollection 
        (option) => option.value
    )
    console.log("Selected Employees:", values);
    setSelectedEmployees(values)
}
  const canSave = [ title, description,selectedEmployees, startDatet,timeOut].every(Boolean) && !isLoading;
  
  const onSaveNoteClicked = async e => {
    e.preventDefault();
    if (canSave) {
      const formattedDate = moment(startDatet).format('YYYY-MM-DD');
      const formattedTimeIn = moment(timeOut, 'HH:mm').toDate();
      await createNewTask({ selectedEmployees, title, description , startDatet:formattedDate,timeOut:formattedTimeIn});
     
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
          Task Name:
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


        <label className="form__label" htmlFor="startDate">
          Start Date:
        </label>
        <input
          className={`form__input `}
          id="startDate"
          name="startDate"
          type="date"
          value={startDatet}
          onChange={(e) => setStartDatet(e.target.value)}
        />
         <label className="form__label" htmlFor="timeOut">
          Starting Time:<span className="nowrap"></span>
        </label>
        <input
          className="form__input"
          id="timeOut"
          name="timeOut"
          type="time"
          value={timeOut}
          onChange={(e) => setTimeOutt(e.target.value)}
        />


      </form>
    </>
  );
};

export default NewTaskForm;
