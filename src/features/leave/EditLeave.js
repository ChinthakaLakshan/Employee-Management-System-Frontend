import { useParams } from 'react-router-dom';
import EditLeaveForm from './EditLeaveForm';
import { useGetLeavesQuery } from './leaveApiSlice';
import { useGetUsersQuery } from '../users/usersApiSlice';
import useAuth from '../../hooks/useAuth';
import PulseLoader from 'react-spinners/PulseLoader';
import useTitle from '../../hooks/useTitle';


const EditLeave = () => {
  useTitle(': Edit Leave');

  const { id } = useParams();

  const { username, isManager, isAdmin } = useAuth();

  const { leave } = useGetLeavesQuery('leaveList', {
    selectFromResult: ({ data }) => ({
      leave: data?.entities[id],
    }),
  });

  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!leave || !users?.length) return <PulseLoader color={'#FFF'} />;

  if (!isManager && !isAdmin) {
    if (leave.username !== username) {
      return <p className="errmsg">No access</p>;
    }
  }

  const content = <EditLeaveForm leave={leave} users={users} />;

  return content;
};

export default EditLeave;