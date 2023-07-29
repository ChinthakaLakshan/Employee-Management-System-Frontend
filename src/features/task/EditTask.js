import { useParams } from 'react-router-dom';
import EditTaskForm from './EditTaskForm';
import { useGetTasksQuery } from './taskApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';
import useTitle from '../../hooks/useTitle';

const EditTask = () => {
  useTitle('Aknara: Edit Task');

  const { id } = useParams();

  const { task } = useGetTasksQuery(id, {
    selectFromResult: ({ data }) => ({
      task: data?.entities[id],
    }),
  });

  if (!task) return <PulseLoader color={'#FFF'} />;

  const content = <EditTaskForm task={task} />;

  return content;
};

export default EditTask;
