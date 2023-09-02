const LeavesReport = ({ data }) => {

    if (!data || !Array.isArray(data)) {
        return <p>No leaves data available.</p>;
      }


    return (
      <div>
        <h2>Leaves Report</h2>
        <table>
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {data.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td>{leave.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  };
  
  
  
  export default  LeavesReport;