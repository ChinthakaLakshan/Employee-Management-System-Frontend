import React from "react";


import { useGetUsersQuery } from '../users/usersApiSlice'
import useTitle from '../../hooks/useTitle'
import PulseLoader from 'react-spinners/PulseLoader'
import NewAttendanceForm from '../attendance/NewAttendanceForm'

const NewAttendance = () => {
  useTitle('New Attendance')




const { users } = useGetUsersQuery("usersList", {
  selectFromResult: ({ data }) => ({
      users: data?.ids.map(id => data?.entities[id])
  }),
})


if (!users?.length) return <PulseLoader color={"#FFF"} />

const content = <NewAttendanceForm users={users} />

return content
}

export default  NewAttendance;