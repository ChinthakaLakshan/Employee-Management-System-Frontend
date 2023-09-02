import { store } from '../../app/store'
import { attendanceApiSlice } from '../attendance/attendanceApiSlice';
import { employeesApiSlice } from '../employee/employeesApiSlice';
import { leaveApiSlice } from '../leave/leaveApiSlice';
import { notesApiSlice } from '../notes/notesApiSlice'
import { taskApiSlice } from '../task/taskApiSlice';
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {

    useEffect(() => {
        store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true }))
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
    // store.dispatch(attendanceApiSlice.util.prefetch('getattendance', 'attendanceList', { force: true }))
    /*     store.dispatch(employeesApiSlice.util.prefetch('getEmployees', 'EmployeesList', { force: true }))
        store.dispatch(leaveApiSlice.util.prefetch('getleave', 'leaveList', { force: true }))
        store.dispatch(taskApiSlice.util.prefetch('getTasks', 'tasksList', { force: true }))  */
    }, [])

    return <Outlet />
}
export default Prefetch