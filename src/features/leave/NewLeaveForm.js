import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewLeaveMutation } from "./leaveApiSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { LEAVES } from "../../config/leave";
import moment from 'moment';
import useAuth from "../../hooks/useAuth"


const NewLeaveForm = ({ users }) => {

 
  const [addNewLeave, { isLoading, isSuccess, isError, error }] = useAddNewLeaveMutation();
  const navigate = useNavigate();

/*   const users = useSelector((state) => state.user); */

  const [leaveType, setLeaveType] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
   const [userId, setUserId] = useState(users.id);

  /* const [userId, setUserId] = useState(users?.username || ''); */
 /*  const [userId, setUserId] = useState(users?.username || ''); */

  useEffect(() => {
    if (isSuccess) {
      setLeaveType([]);
      setStartDate('');
      setEndDate('');
      setReason(false);
       setUserId(users.id);  
      navigate('/dash/leave');
    }
  }, [isSuccess, navigate, users]);

  const onSaveLeaveClicked = async e => {
    e.preventDefault();
    if (leaveType.length > 0 && startDate && endDate  /* userId */) {

        const formattedDateStart = moment(startDate).format('YYYY-MM-DD');
        const formattedDateend = moment(endDate).format('YYYY-MM-DD');
      await addNewLeave({ users:userId , leaveType,startDate: formattedDateStart, endDate:formattedDateend, reason });
    }
  };

  const options = users.map(user => (
    <option key={user.id} value={user.username}>
      {user.username}
    </option>
  ));

  const onLeavesChanged = e => {
    const values = Array.from(
        e.target.selectedOptions, //HTMLCollection 
        (option) => option.value
    )
    setLeaveType(values)
}

const options1 = Object.values(LEAVES).map(leave => {
    return (
        <option
            key={leave}
            value={leave}

        > {leave}</option >
    )
})


  const errClass = isError ? "errmsg" : "offscreen";
  const validLeaveTypeClass = !leaveType ? "form__input--incomplete" : '';
  const validStartDateClass = !startDate ? "form__input--incomplete" : '';
  const validEndDateClass = !endDate ? "form__input--incomplete" : '';

  return (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveLeaveClicked}>
        <div className="form__title-row">
          <h2>New Leave Request</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              disabled={isLoading}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="leaveType">
          Leave Type:
        </label>
        <select
          className={`form__input ${validLeaveTypeClass}`}
          id="leaveType"
          name="leaveType"
          type="text"
          autoComplete="off"
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}>
 
           {options1} 
          </select>

        <label className="form__label" htmlFor="startDate">
          Start Date:
        </label>
        <input
          className={`form__input ${validStartDateClass}`}
          id="startDate"
          name="startDate"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label className="form__label" htmlFor="endDate">
          End Date:
        </label>
        <input
          className={`form__input ${validEndDateClass}`}
          id="endDate"
          name="endDate"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <label className="form__label" htmlFor="reason">
          Reason:
        </label>
        <input
          type="text"
          id="reason"
          name="reason"
          value={reason}
          className={`form__input`}
          onChange={(e) => setReason(e.target.value)}
        />

{/* <label className="form__label" htmlFor="username">
      Username:
    </label>
    <input
      className="form__input"
      id="username"
      name="username"
      type="text"
      value={userId}
      readOnly
    /> */}
      </form>
    </>
  );
};

export default NewLeaveForm;