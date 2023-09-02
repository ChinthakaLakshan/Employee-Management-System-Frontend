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

    
    const leavestatus = leave.approvalStatus.toString().replaceAll(',', ', ')
    if (leave ) {
        return (
            <tr className="table__row">
               <td className="table__cell note__username">{leave.userId}</td>
                <td className="table__cell note__updated">{leave.leaveType}</td>
                <td className="table__cell note__username">{formattedDatestart}</td>
                <td className="table__cell note__username">{formattedDateend}</td>
                <td className="table__cell note__title">{leave.reason}</td>
                <td className={`table__cell `}>{leavestatus}</td>
        <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        );
    } else return null;
}

const memoizedLeave = memo(Leave);

export default memoizedLeave;
