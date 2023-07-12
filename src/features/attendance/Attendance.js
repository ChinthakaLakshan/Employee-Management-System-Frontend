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

        //const employeeRolesString = employees?.roles?.toString()?.replaceAll(',', ', ') ?? '';
        //const employeeDepartmentsString = employees?.department?.toString()?.replaceAll(',', ', ') ?? '';
        //const employeeRolesString = employees.roles.toString().replaceAll(',', ', ')

       const cellStatus = attendance.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row attendance">    
                <td className={`table__cell ${cellStatus}`}>{attendance.empId}</td>
                <td className={`table__cell ${cellStatus}`}>{attendance.date}</td>
                <td className={`table__cell ${cellStatus}`}>{attendance.timeIn}</td>
                <td className={`table__cell ${cellStatus}`}>{attendance.timeOut}</td>
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