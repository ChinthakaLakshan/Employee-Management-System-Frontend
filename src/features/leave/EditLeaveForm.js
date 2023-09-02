import { useState, useEffect } from "react"
import { useDeleteLeaveMutation, useUpdateLeaveMutation } from "./leaveApiSlice";
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave , faTrashCan} from "@fortawesome/free-solid-svg-icons"
import { APPROVAL } from "../../config/status";
const EditLeaveForm = ({ leave }) => {


    const [updateLeave, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateLeaveMutation()
    
    const [deleteLeave, {
      isSuccess: isDelSuccess,
      isError: isDelError,
      error: delerror
  }] = useDeleteLeaveMutation()


    const navigate = useNavigate()

    const [leaveType, setLeaveType] = useState(leave.leaveType);
     const [startDate, setStartDate] = useState(leave.startDate);
    const [endDate, setEndDate] = useState(leave.endDate);
    const [reason, setReason] = useState(leave.reason); 
    const [approvalStatus, setApprovalStatus] = useState(leave.approvalStatus);
   
    
  

   useEffect(() => {
      console.log(isSuccess)
      if (isSuccess || isDelSuccess) {
        
          setApprovalStatus([])
          navigate('/dash/leave')
      }

  }, [isSuccess, isDelSuccess,  navigate])
  

  const onStatusChanged = e => {
    const values = Array.from(
        e.target.selectedOptions,
        (option) => option.value
    )
    setApprovalStatus(values)
}
    const onSaveLeaveClicked = async () => {
      // Make the API call to update the leave with new data
      await updateLeave({
        id: leave.id,
        startDate,
        endDate,
        reason,
        approvalStatus,
        leaveType
      });
    };


    const onDeleteLeaveClicked = async () => {
      await deleteLeave({ id: leave.id })
  }

  

    const options = Object.values(APPROVAL).map(status => {
      return (
          <option
              key={status}
              value={status}

          > {status}</option >
      )
  })
    const canSave = [ approvalStatus.length].every(Boolean) && !isLoading;
    const errClass = (isError ) ? "errmsg" : "offscreen"
    const errContent = (error?.data?.message ) ?? ''
    
    const content = (
      <>
        <p className={errClass}>{errContent}</p>
  
        <form className="form" onSubmit={e => e.preventDefault()}>
          <div className="form__title-row">
            <h2>Edit Leave</h2>
            <div className="form__action-buttons">
              <button
                className="icon-button"
                title="Save"
                onClick={onSaveLeaveClicked}
                disabled={!canSave}
              >
                <FontAwesomeIcon icon={faSave} />
              </button>
              <button className="icon-button" title="Delete" onClick={onDeleteLeaveClicked}>
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </div>
        
            <label className="form__label" htmlFor="username">
              Username:<span className="nowrap"></span>
            </label>
            <input
              className="form__input"
              id="username"
              name="username"
              type="text"
              autoComplete="off"
              value={leave.userId}
              readOnly
            />

<label className="form__label" htmlFor="leavetype">
             Leave Type:<span className="nowrap"></span>
            </label>
            <input
              className="form__input"
              id="leavetype"
              name="leavetype"
              type="text"
              autoComplete="off"
              value={leave.leaveType}
              readOnly
            />
         
         
            <label className="form__label" htmlFor="startDate">
              Start Date:<span className="nowrap"></span>
            </label>
            <input
              className="form__input"
              id="startDate"
              name="startDate"
              type="date"
              value={startDate}
              
              readOnly
            />
         
         
            <label className="form__label" htmlFor="endDate">
              End Date:<span className="nowrap"></span>
            </label>
            <input
              className="form__input"
              id="endDate"
              name="endDate"
              type="date"
              value={endDate}
              readOnly
            />
        
          
            <label className="form__label" htmlFor="reason">
              Reason:<span className="nowrap"></span>
            </label>
            <textarea
              className="form__input"
              id="reason"
              name="reason"
              value={reason}
              readOnly
            />
       
          
            <label className="form__label" htmlFor="approvalStatus">
              Approval Status:<span className="nowrap"></span>
            </label>
            <select
              id="approvalStatus"
              name="approvalStatus"
              className="form__select"
              multiple={true}
              size="3"
              value={approvalStatus}
              onChange={onStatusChanged}
            >
              {options}
            </select>
          
        </form>
      </>
    );

    return content
  };
  
  export default EditLeaveForm;