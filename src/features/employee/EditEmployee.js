import { useParams } from 'react-router-dom'
import EditEmployeeForm from './EditEmployeeForm'
import { useGetEmployeesQuery } from './employeesApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const EditEmployee = () => {
    useTitle('Aknara: Edit Employee')

    const { id } = useParams()

    const {employee } = useGetEmployeesQuery("EmployeesList", {
        selectFromResult: ({ data }) => ({
            employee: data?.entities[id]
        }),
    })

    if (!employee) return <PulseLoader color={"#FFF"} />

    const content = <EditEmployeeForm employee={employee} />

    return content
}
export default EditEmployee