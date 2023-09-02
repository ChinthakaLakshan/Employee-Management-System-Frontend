import { useGetLeavesQuery } from "./leaveApiSlice"
import Leave from './Leave'
import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle"
import React, {  useRef } from "react";
import { useReactToPrint } from "react-to-print";
const LeaveList = () => {
    const { username, isManager, isAdmin , isEmployee } = useAuth()
    useTitle('Aknara: Employees Leve List')
    const conponentPDF= useRef();
    
    const generatePDF= useReactToPrint({
        content: ()=>conponentPDF.current,
        documentTitle:"Userdata",
        onAfterPrint:()=>alert("Data saved in PDF")
    });
    const {
        data: leave,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetLeavesQuery('leaveList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = leave

        let filteredIds
        if (isManager || isAdmin || isEmployee) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(leaveId => entities[leaveId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(leaveId=> <Leave key={leaveId} leaveId={leaveId} />)

        content = (
            <div>
            <div ref={conponentPDF} style={{width:'100%'}}>
            <table className="table tableleave">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th note__status">Username</th>
                        <th scope="col" className="table__th note__created">Leave Type</th>
                        <th scope="col" className="table__th note__updated">Start Date</th>
                        <th scope="col" className="table__th note__title">End Date</th>
                        <th scope="col" className="table__th note__username">Reason</th>
                        <th scope="col" className="table__th note__edit">Status</th>
                        <th scope="col" className="table__th note__edit">Action</th>   
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
                
            </table>
            </div>

           
               <div className="d-grid d-md-flex justify-content-md-end mb-3">
                    <button className="btn btn-success" onClick={ generatePDF}>PDF</button>                       
                    </div> 
                    </div>
                  
        )
        
    }

    return content
}
export default LeaveList