import { useState } from 'react';
import { useGetUsersQuery } from '../users/usersApiSlice';
import { useGetAttendanceQuery } from '../attendance/attendanceApiSlice';
import { useGetLeavesQuery } from '../leave/leaveApiSlice'

import AttendanceReport from './AttendanceReport';
import LeavesReport from './LeavesReport';

const Reports = () => {

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
      })

      
  const { data: usersData, isLoading: isUsersLoading } = useGetUsersQuery();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const { data: attendanceData, isLoading: isAttendanceLoading } = useGetAttendanceQuery(selectedEmployeeId);
  const { data: leavesData, isLoading: isLeavesLoading } = useGetLeavesQuery(selectedEmployeeId);

  // Handle selection of employee from the dropdown
  const handleSelectEmployee = (employeeId) => {
    setSelectedEmployeeId(employeeId);
  };

  // Render the reports UI with employee dropdown, table, or charts for attendance and leaves

  return (
    <div>
      {isUsersLoading ? (
        <p>Loading employees...</p>
      ) : (
        <select value={selectedEmployeeId} onChange={(e) => handleSelectEmployee(e.target.value)}>
          <option value="">Select an employee</option>
          {usersData?.data.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      )}

      {/* Render attendance and leave reports */}
      {selectedEmployeeId && (
        <div>
          {isAttendanceLoading ? (
            <p>Loading attendance...</p>
          ) : (
            <AttendanceReport data={attendanceData?.data || []} />
          )}

          {isLeavesLoading ? (
            <p>Loading leaves...</p>
          ) : (
            <LeavesReport data={leavesData?.data || []} />
          )}
        </div>
      )}
    </div>
  );
}

export default Reports;
