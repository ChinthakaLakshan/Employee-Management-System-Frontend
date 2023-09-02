import { useParams } from 'react-router-dom';
import EditAttendanceForm from './EditAttendanceForm';
import { useGetAttendanceQuery } from './attendanceApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';
import useTitle from '../../hooks/useTitle';
import useAuth from '../../hooks/useAuth';

const EditAttendance = () => {
  useTitle('Aknara: Edit Attendance');
  const { username, isManager, isAdmin } = useAuth();
  const { id } = useParams();

  const { attendance } = useGetAttendanceQuery("List", {
    selectFromResult: ({ data }) => ({
      attendance: data?.entities[id],
    }),
  });

  if (!attendance) return <PulseLoader color={"#FFF"} />;
  if (!isManager && !isAdmin) {
    if (attendance.username !== username) {
      return <p className="errmsg">No access</p>;
    }
  }

  const content = <EditAttendanceForm attendance={attendance} />;

  return content;
};

export default EditAttendance;
