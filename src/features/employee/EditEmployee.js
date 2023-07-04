import { useParams } from 'react-router-dom'
import EditEmployeeForm from './EditEmployeeForm'
import { useGetEmployeesQuery } from './employeesApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const EditEmployee = () => {
    useTitle('Aknara: Edit Employee')

    const { id } = useParams()

    const {employees } = useGetEmployeesQuery("EmployeesList", {
        selectFromResult: ({ data }) => ({
            employees: data?.entities[id]
        }),
    })

    if (!employees) return <PulseLoader color={"#FFF"} />

    const content = <EditEmployeeForm employees={employees} />

    return content
}
export default EditEmployee