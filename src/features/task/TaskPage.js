import React from "react";


import { useGetUsersQuery } from '../users/usersApiSlice'
import useTitle from '../../hooks/useTitle'
import PulseLoader from 'react-spinners/PulseLoader'
import NewTaskForm from "./NewTaskForm";


const TaskPage = () => {
  useTitle('New Task')




const { users } = useGetUsersQuery("usersList", {
  selectFromResult: ({ data }) => ({
      users: data?.ids.map(id => data?.entities[id])
  }),
})


if (!users?.length) return <PulseLoader color={"#FFF"} />

const content = <NewTaskForm users={users} />

return content
}

export default TaskPage;