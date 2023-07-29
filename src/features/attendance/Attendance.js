import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetAttendanceQuery } from './attendanceApiSlice' 
import { memo } from 'react'

const Attendance = ({AttendanceId }) => {

    const { attendance} = useGetAttendanceQuery("List", {
        selectFromResult: ({ data }) => ({
            attendance: data?.entities[AttendanceId]
        }),
    })

    const navigate = useNavigate()

    if (attendance) {
        const handleEdit = () => navigate(`/dash/attendance/${AttendanceId}`)

 

       const cellStatus = attendance.active ? '' : 'table__cell--inactive'
       const formattedDate = new Date(attendance.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
      const formattedTimeIn = new Date(attendance.timeIn).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
      
      const formattedTimeOut = new Date(attendance.timeOut).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
        return (
            <tr className="table__row attendance">    
                <td className={`table__cell ${cellStatus}`}>{attendance.empId}</td>
                <td className={`table__cell ${cellStatus}`}>{formattedDate}</td>
                <td className={`table__cell ${cellStatus}`}>{ formattedTimeIn}</td>
                <td className={`table__cell ${cellStatus}`}>{formattedTimeOut}</td>
                <td className={`table__cell ${cellStatus}`}>
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>


            </tr>
        )

    } else return null
}

const memoizedAttendance = memo(Attendance)

export default memoizedAttendance