import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { useGetLeavesQuery, useUpdateLeaveMutation } from './leaveApiSlice';
import { memo, useState } from 'react';

import { useGetUsersQuery } from '../users/usersApiSlice'

const Leave = ({ leaveId }) => {
    const { leave } = useGetLeavesQuery("leaveList", {
        selectFromResult: ({ data }) => ({
            leave: data?.entities[leaveId]
        }),
    });

   /*  const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        }),
    }) */

    const formattedDatestart = new Date(leave.startDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    const formattedDateend = new Date(leave.endDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    const navigate = useNavigate();

    const updateLeaveMutation = useUpdateLeaveMutation();

    const [approvalStatus, setApprovalStatus] = useState(leave?.approvalStatus);

    

    const handleEdit = () => navigate(`/dash/leave/${leaveId}`);

    const handleStatusChange = async (status) => {
        try {
            // Update the approval status in the backend
            await updateLeaveMutation.mutateAsync({
                id: leaveId,
                approvalStatus: status
            });

            // Update the local state to reflect the change
            setApprovalStatus(status);
        } catch (error) {
            console.error("Failed to update leave status:", error);
        }
    };

    if (leave ) {
        return (
            <tr className="table__row">
                <td className="table__cell note__created">{leave.username}</td>
                <td className="table__cell note__updated">{leave.leaveType}</td>
                <td className="table__cell note__username">{formattedDatestart}</td>
                <td className="table__cell note__username">{formattedDateend}</td>
                <td className="table__cell note__title">{leave.reason}</td>
                <td className="table__cell note__status">
                    {leave.approvalStatus === "pending" ? (
                        <select
                            value={approvalStatus}
                            onChange={(e) => handleStatusChange(e.target.value)}
                        >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="canceled">Canceled</option>
                        </select>
                    ) : leave.approvalStatus === "approved" ? (
                        <span className="note__status--completed">Approved</span>
                    ) : (
                        <span className="note__status--open">Canceled</span>
                    )}
                </td>
            </tr>
        );
    } else return null;
}

const memoizedLeave = memo(Leave);

export default memoizedLeave;
