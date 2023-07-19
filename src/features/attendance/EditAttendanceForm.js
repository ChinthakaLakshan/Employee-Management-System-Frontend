import { useState, useEffect } from "react";
import { useUpdateEmployeeAttendanceMutation, useDeleteEmployeeAttendanceMutation } from "./attendanceApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";



const EditAttendanceForm = ({ attendance }) => {
  const [updateAttendance, { isLoading, isSuccess, isError, error }] = useUpdateEmployeeAttendanceMutation();
  const [deleteAttendance, { isSuccess: isDelSuccess, isError: isDelError, error: delerror }] = useDeleteEmployeeAttendanceMutation();
  const navigate = useNavigate();

  const [empId, setEmpId] = useState(attendance.empId || '');
  const [date, setDate] = useState(attendance.date || '');
  const [timeIn, setTimeIn] = useState(attendance.timeIn || '');
  const [timeOut, setTimeOut] = useState(attendance.timeOut || '');

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
        setEmpId('')
        setDate('')
        setTimeIn('')
        setTimeOut('')

      navigate('/dash/attendance');
    }
  }, [isSuccess, isDelSuccess, navigate]);

  

 

  const onSaveAttendanceClicked = async () => {
    await updateAttendance({ id: attendance.id, date , timeIn,timeOut ,empId });
  };

  const onDeleteAttendanceClicked = async () => {
    await deleteAttendance({ id: attendance.id });
  };

  const canSave = [date.length , timeIn.length,timeOut.length ,empId.length].every(Boolean) && !isLoading;

 

 

  const errClass = (isError || isDelError) ? "errmsg" : "offscreen";
  const errContent = (error?.data?.message || delerror?.data?.message) ?? '';

  return (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={e => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Attendance</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveAttendanceClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={onDeleteAttendanceClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
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
};

export default EditAttendanceForm;
