import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetTasksQuery } from './taskApiSlice' 
import { memo } from 'react'


const Task = ({TaskId }) => {

    const { task} = useGetTasksQuery("taskList", {
        selectFromResult: ({ data }) => ({
            task: data?.entities[TaskId]
        }),
    })
   

    const navigate = useNavigate()
  

      if (task) {
        const handleEdit = () => navigate(`/dash/task/${TaskId}`);
    
        const created = new Date(task.createdAt).toLocaleString('en-US', {
          day: 'numeric',
          month: 'long',
        });

       const cellStatus = task.active ? '' : 'table__cell--inactive'
       

       
      
    
        return (
            <tr className="table__row task">    
                <td className={`table__cell ${cellStatus}`}>{created}</td>
                <td className="table__cell note__username">{task.selectedEmployees}</td>
                <td className={`table__cell ${cellStatus}`}>{ task.title}</td> 
                <td className={`table__cell ${cellStatus}`}>{task.description}</td>
                <td className={`table__cell ${cellStatus}`}>{task.status}</td>
                <td className={`table__cell ${cellStatus}`}>
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>


            </tr>
        )

    } else return null
}

const memoizedTask = memo(Task)

export default memoizedTask