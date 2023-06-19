import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetEmployeesQuery } from './employeesApiSlice'
import { memo } from 'react'

const Employee = ({EmployeeId }) => {

    const { employee } = useGetEmployeesQuery("List", {
        selectFromResult: ({ data }) => ({
            employee: data?.entities[EmployeeId]
        }),
    })

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/dash/employees/${EmployeeId}`)

        const employeeRolesString = employee.roles.toString().replaceAll(',', ', ')

        const cellStatus = employee.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row employee">
                <td className={`table__cell ${cellStatus}`}>{employee.username}</td>
                <td className={`table__cell ${cellStatus}`}>{employeeRolesString}</td>
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

const memoizedUser = memo(Employee)

export default memoizedEmployee