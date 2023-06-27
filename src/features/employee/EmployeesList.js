import { useGetEmployeesQuery } from "./employeesApiSlice"
import Employee from './Employee'

const EmployeesList = () => {

    const {
        data: employees,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetEmployeesQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = employees

        const tableContent = ids?.length
            ? ids.map(EmployeeId => <Employee key={EmployeeId} EmployeeId={EmployeeId} />)
            : null

        content = (
            <table className="table table--employees">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th employee__employeename">Employee Name</th>
                        <th scope="col" className="table__th employee__roles">Roles</th>
                        <th scope="col" className="table__th employee__edit">Edit</th>

                        <th scope="col" className="table__th employee__employeeemail">Email</th>
                        <th scope="col" className="table__th employee__phone">Phone</th>
                        <th scope="col" className="table__th employee__address">Adddress</th>

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
export default EmployeesList