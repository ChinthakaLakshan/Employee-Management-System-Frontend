
import { useGetTasksQuery} from './taskApiSlice';

import Task from './Task'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from "../../hooks/useTitle"

const TaskList = () => {
    useTitle('Aknara: Employees Task List')
    const {
        data: task,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTasksQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = task

        const tableContent = ids?.length
            ? ids.map(TaskId=> <Task key={TaskId} TaskId={TaskId} />)
            : null

        content = (
            <table className="tabletask table--task">


                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th employee__employeeid"> created Date</th>
                        <th scope="col" className="table__th employee__employeedate">Assigned Employees</th>
                        <th scope="col" className="table__th employee__employeedate">Function</th>
                        <th scope="col" className="table__th employee__Time">Description</th>
                        <th scope="col" className="table__th employee__Time"> Status </th>
                        <th scope="col" className="table__th employee__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default  TaskList

