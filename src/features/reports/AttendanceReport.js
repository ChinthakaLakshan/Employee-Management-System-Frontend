





const AttendanceReport = ({ data }) => {
    if (!data || !Array.isArray(data)) {
        return <p>No attendance data available.</p>;
      }
    
    return (
      <div>
        <h2>Attendance Report</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time In</th>
              <th>Time Out</th>
            </tr>
          </thead>
          <tbody>
            {data.map((attendance) => (
              <tr key={attendance.id}>
                <td>{attendance.date}</td>
                <td>{attendance.timeIn}</td>
                <td>{attendance.timeOut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  

};
 

export default AttendanceReport;