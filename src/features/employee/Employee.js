import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetEmployeesQuery } from './employeesApiSlice'
import { memo } from 'react'

const Employee = ({EmployeeId }) => {

    const { employees } = useGetEmployeesQuery("employeeList", {
        selectFromResult: ({ data }) => ({
            employees: data?.entities[EmployeeId]
        }),
    })

    const navigate = useNavigate()

    if (employees) {
        const handleEdit = () => navigate(`/dash/employee/${EmployeeId}`)

        const employeeRolesString = employees?.roles?.toString()?.replaceAll(',', ', ') ?? '';
        const employeeDepartmentsString = employees?.department?.toString()?.replaceAll(',', ', ') ?? '';
        //const employeeRolesString = employees.roles.toString().replaceAll(',', ', ')

        const cellStatus = employees.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row employee">    
                <td className={`table__cell ${cellStatus}`}>{employees.fname}</td>
                <td className={`table__cell ${cellStatus}`}>{employees.lname}</td>
                <td className={`table__cell ${cellStatus}`}>{employees.email}</td>
                <td className={`table__cell ${cellStatus}`}>{employees.address}</td>
                <td className={`table__cell ${cellStatus}`}>{employees.phone}</td>
                <td className={`table__cell ${cellStatus}`}>{employeeDepartmentsString}</td>
                <td className={`table__cell ${cellStatus}`}>{employeeRolesString}</td>
                <td className={`table__cell ${cellStatus}`}>{employees.prevexperience}</td>
                <td className={`table__cell ${cellStatus}`}>{employees.empId}</td>
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

const memoizedEmployee = memo(Employee)

export default memoizedEmployee