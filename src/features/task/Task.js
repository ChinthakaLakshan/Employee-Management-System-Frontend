import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetTasksQuery } from './taskApiSlice' 
import { memo } from 'react'
import { useGetUsersQuery } from '../users/usersApiSlice'


const Task = ({TaskId  }) => {

    const { task} = useGetTasksQuery("taskList", {
        selectFromResult: ({ data }) => ({
            task: data?.entities[TaskId]
        }),
    })
    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
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
    
     
       const formattedDate = new Date(task.startDatet).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    const formattedTimeIn = new Date(task.timeOut).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
      const selectedEmployeeUsernames = task.selectedEmployees.map(employeeId =>
        users.find(user => user._id === employeeId)?.username || "Unknown User"
    ); 
    
        return (
            <tr className="table__row task">    
                <td className={`table__cell ${cellStatus}`}>{created}</td>
                <td className={`table__cell ${cellStatus}`}>{ task.title}</td> 
                <td className={`table__cell ${cellStatus}`}>{ formattedDate}</td> 
                <td className={`table__cell ${cellStatus}`}>{formattedTimeIn}</td> 
                <td className={`table__cell ${cellStatus}`}>{task.description}</td>
                <td className={`table__cell ${cellStatus}`}>{task.status}</td>
                <td className="table__cell note__username">  <ul>
                        {selectedEmployeeUsernames.map((username, index) => (
                            <li key={index}>{username}</li>
                        ))}
                    </ul></td>
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