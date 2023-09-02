import { useParams } from 'react-router-dom';
import EditTaskForm from './EditTaskForm';
import { useGetTasksQuery } from './taskApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';
import useTitle from '../../hooks/useTitle';
import { useGetUsersQuery } from '../users/usersApiSlice'
import useAuth from '../../hooks/useAuth';
const EditTask = () => {
  useTitle('Aknara: Edit Task');
  const { username, isManager, isAdmin } = useAuth();
  const { id } = useParams();

  const { task } = useGetTasksQuery(id, {
    selectFromResult: ({ data }) => ({
      task: data?.entities[id],
    }),
  });

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
        users: data?.ids.map(id => data?.entities[id])
    }),
})



  if (!task) return <PulseLoader color={'#FFF'} />;
  if (!isManager && !isAdmin) {
    if (task.username !== username) {
      return <p className="errmsg">No access</p>;
    }
  }

  const content = <EditTaskForm task={task} users={users} />;

  return content;
};

export default EditTask;
