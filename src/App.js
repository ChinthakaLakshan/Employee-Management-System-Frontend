import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'

import EmployeesList from './features/employee/EmployeesList'
import EditEmployee from './features/employee/EditEmployee'
import NewEmployeeForm from './features/employee/NewEmployeeForm'

import EditNote from './features/notes/EditNote'
import NewNote from './features/notes/NewNote'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'
//import { DEPARTMENT } from "../../config/department"

import AttendanceList from './features/attendance/AttendanceList'
import NewAttendanceForm from './features/attendance/NewAttendanceForm';
import EditAttendance from './features/attendance/EditAttendance';

import TaskList from './features/task/TaskList';
function App() {
  return (
    <Routes>
      <Route  ute path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>

                <Route index element={<Welcome />} />

                <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>
                
                <Route path="employee">
                  <Route index element={<EmployeesList />} />
                  <Route path=":id" element={<EditEmployee />} />
                  <Route path="new" element={<NewEmployeeForm/>} />
                </Route>

                <Route path="attendance">
                  <Route index element={<AttendanceList />} />
                  <Route path=":id" element={<EditAttendance />} />
                  <Route path="new" element={<NewAttendanceForm/>} /> 
                </Route>
                
                <Route path="task">
                  <Route index element={<TaskList />} />
                  {/* <Route path=":id" element={<EditAttendance />} />
                  <Route path="new" element={<NewAttendanceForm/>} />  */}
                </Route>


              </Route>{/* End Dash */}
            </Route>
          </Route>
        </Route>{/* End Protected Routes */}

      </Route>
    </Routes >
  );
}

export default App;
