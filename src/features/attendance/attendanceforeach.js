import { useState, useEffect } from 'react';
import { useAuth } from './authContext';
import { useGetAttendanceQuery } from './attendanceApiSlice';
import Attendance from './Attendance';

const AttendanceList1 = () => {
  const { user } = useAuth(); // Access the logged-in user's information from the authentication context
  const [attendanceData, setAttendanceData] = useState([]);

  // Fetch attendance data for the logged-in employee
  const { data: attendanceResult, isLoading, isError } = useGetAttendanceQuery('List');

  useEffect(() => {
    if (attendanceResult) {
      setAttendanceData(attendanceResult.entities);
    }
  }, [attendanceResult]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching attendance data.</p>;
  }

  const filteredAttendance = Object.values(attendanceData).filter(
    (attendance) => attendance.empId === user.empId
  );

  return (
    <>
      <h2>Attendance Details for {user.username}</h2>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Date</th>
            <th>Time In</th>
            <th>Time Out</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredAttendance.map((attendance) => (
            <Attendance key={attendance.id} AttendanceId={attendance.id} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AttendanceList1;