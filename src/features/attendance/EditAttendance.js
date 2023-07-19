import { useParams } from 'react-router-dom';
import EditAttendanceForm from './EditAttendanceForm';
import { useGetAttendanceQuery } from './attendanceApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';
import useTitle from '../../hooks/useTitle';

const EditAttendance = () => {
  useTitle('Aknara: Edit Attendance');

  const { id } = useParams();

  const { attendance } = useGetAttendanceQuery("List", {
    selectFromResult: ({ data }) => ({
      attendance: data?.entities[id],
    }),
  });

  if (!attendance) return <PulseLoader color={"#FFF"} />;

  const content = <EditAttendanceForm attendance={attendance} />;

  return content;
};

export default EditAttendance;
