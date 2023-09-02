import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetAttendanceQuery } from './attendanceApiSlice' 
import { memo } from 'react'
import { useGetUsersQuery } from '../users/usersApiSlice'

const Attendance = ({AttendanceId }) => {

    const { attendance} = useGetAttendanceQuery("List", {
        selectFromResult: ({ data }) => ({
            attendance: data?.entities[AttendanceId]
        }),
    })
    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
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

      let selectedEmployeeNames = [];
      if (Array.isArray(attendance.empId)) {
        // attendance.empId is an array
        selectedEmployeeNames = attendance.empId.map(employeeId =>
          users.find(user => user.id === employeeId)?.username || "Unknown User"
        );
      } else {
        // attendance.empId is a single value
        selectedEmployeeNames.push(
          users.find(user => user.id === attendance.empId)?.username || "Unknown User"
        );
      }
        return (
            <tr className="table__row attendance">    
                <td className={`table__cell ${cellStatus}`}>{selectedEmployeeNames}</td>
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