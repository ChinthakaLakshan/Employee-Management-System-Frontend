import { useState, useEffect } from "react";
import { useAddNewEmployeeAttendanceMutation } from "./attendanceApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';

const NewAttendanceForm = () => {
  const [addNewAttendance, { isLoading, isSuccess, isError, error }] =
    useAddNewEmployeeAttendanceMutation();
  const navigate = useNavigate();

  const [date, setDate] = useState('');
  const [timeIn, setTimeIn] = useState('');
  const [timeOut, setTimeOut] = useState('');
  const [empId, setEmpId] = useState('');

  useEffect(() => {
    if (isSuccess) {
      setDate('');
      setTimeIn('');
      setTimeOut('');
      setEmpId('');
      navigate('/dash/attendance');
    }
  }, [isSuccess, navigate]);

  const canSave =
    [date.length, timeIn.length, timeOut.length, empId.length].every(Boolean) &&
    !isLoading;

  const onSaveAttendanceClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        const formattedTimeIn = moment(timeIn, 'HH:mm').toDate();
        const formattedTimeOut = moment(timeOut, 'HH:mm').toDate();

        
            await addNewAttendance({ empId, date: formattedDate,
                timeIn: formattedTimeIn,
                timeOut: formattedTimeOut });
         
           
          
    }
  };

  const errClass = isError ? "errmsg" : "offscreen";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveAttendanceClicked}>
        <div className="form__title-row">
          <h2>Add New Attendance</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>

        <label className="form__label" htmlFor="date">
          Date:<span className="nowrap"></span>
        </label>
        <input
          className="form__input"
          id="date"
          name="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label className="form__label" htmlFor="timeIn">
          Time In:<span className="nowrap"></span>
        </label>
        <input
          className="form__input"
          id="timeIn"
          name="timeIn"
          type="time"
          value={timeIn}
          onChange={(e) => setTimeIn(e.target.value)}
        />

        <label className="form__label" htmlFor="timeOut">
          Time Out:<span className="nowrap"></span>
        </label>
        <input
          className="form__input"
          id="timeOut"
          name="timeOut"
          type="time"
          value={timeOut}
          onChange={(e) => setTimeOut(e.target.value)}
        />

        <label className="form__label" htmlFor="empId">
          Employee ID:<span className="nowrap"></span>
        </label>
        <input
          className="form__input"
          id="empId"
          name="empId"
          type="text"
          value={empId}
          onChange={(e) => setEmpId(e.target.value)}
        />
      </form>
    </>
  );

  return content;
};

export default NewAttendanceForm;