import { useGetAttendanceQuery } from './attendanceApiSlice'
import Attendance from './Attendance'
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'
import React , {useRef } from 'react';

import { useReactToPrint } from "react-to-print";

const AttendanceList = () => {
    useTitle('Aknara: Employees Attendance List')

    const componentPDF= useRef();

    const {
        data: attendance,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAttendanceQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "TaskList",
        onAfterPrint: () => alert("Data saved in PDF")
      });

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = attendance

        const tableContent = ids?.length
            ? ids.map(AttendanceId=> <Attendance key={AttendanceId} AttendanceId={AttendanceId} />)
            : null

        content = (
            <div  ref={componentPDF} style={{width:'80%'}}>
            
            <table className="tableatte table--employees">


                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th employee__employeeid">Employee Id</th>
                        <th scope="col" className="table__th employee__employeedate">Date</th>
                        <th scope="col" className="table__th employee__Time">Time In</th>
                        <th scope="col" className="table__th employee__Time">Time Out</th>
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
export default  AttendanceList
