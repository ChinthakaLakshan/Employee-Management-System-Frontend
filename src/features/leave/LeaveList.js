import { useGetLeavesQuery } from "./leaveApiSlice"
import Leave from './Leave'
import useAuth from "../../hooks/useAuth"

const LeaveList = () => {
    const { username, isManager, isAdmin } = useAuth()


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
        if (isManager || isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(leaveId => entities[leaveId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(leaveId=> <Leave key={leaveId} leaveId={leaveId} />)

        content = (
            <table className="table table--notes">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th note__status">Username</th>
                        <th scope="col" className="table__th note__created">Leave Type</th>
                        <th scope="col" className="table__th note__updated">Start Date</th>
                        <th scope="col" className="table__th note__title">End Date</th>
                        <th scope="col" className="table__th note__username">Reason</th>
                        <th scope="col" className="table__th note__edit">Status</th>
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
export default LeaveList