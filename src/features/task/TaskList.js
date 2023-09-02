import React , {useRef} from 'react';
import { useGetTasksQuery} from './taskApiSlice';
import useAuth from "../../hooks/useAuth"
import Task from './Task'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from "../../hooks/useTitle"
/* import { useGetUsersQuery } from './userApiSlice'; */


import { useReactToPrint } from "react-to-print";
const TaskList = () => {
    
    const componentPDF= useRef();
    
    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "TaskList",
        onAfterPrint: () => alert("Data saved in PDF")
      });

    const { username, isManager, isAdmin ,isEmployee } = useAuth()
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
        const { ids, entities } = task
        let filteredIds
        if (isManager || isAdmin || isEmployee) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(TaskId => entities[TaskId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(TaskId => <Task key={TaskId} TaskId={TaskId} />)

      

        content = (
            <div  ref={componentPDF} style={{width:'100%'}}>
            <table className="tabletask table--task">


                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th employee__employeeid"> created Date</th>
                        <th scope="col" className="table__th employee__employeedate">Function</th>
                        <th scope="col" className="table__th employee__employeedate">Function Date</th>
                        <th scope="col" className="table__th employee__employeedate">Starting Time Time</th>
                        <th scope="col" className="table__th employee__Time">Description</th>
                        <th scope="col" className="table__th employee__Time"> Status </th>
                        <th scope="col" className="table__th employee__employeedate">Assigned Employees</th>
                        <th scope="col" className="table__th employee__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
            
         <div className="d-grid d-md-flex justify-content-md-end mb-3">
             <button className="btn btn-success" onClick={ generatePDF}>Generate PDF</button>                       
            </div>
            </div> 
        )
    }

    return content
}
export default  TaskList

