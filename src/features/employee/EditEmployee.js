import { useSelector } from 'react-redux'
import { selectEmployeeById } from './employeesApiSlice'
import EditEmployeeForm from './EditEmployeeForm'
import { useParams } from 'react-router-dom'

const EditEmployee = () => {
    const { id } = useParams()

    const employee = useSelector(state => selectEmployeeById(state, id))

    const content = employee ? <EditEmployeeForm employee={employee} /> : <p>Loading...</p>

    return content
}
export default EditEmployee