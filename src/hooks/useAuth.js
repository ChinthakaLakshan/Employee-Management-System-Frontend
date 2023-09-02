import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isManager = false
    let isAdmin = false
    


let isChef =false
let isSupevisor =false
let isStewards =false
let isAccountant =false
let isEmployee =false

    let status = "Employee"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles  } = decoded.UserInfo

        isManager = roles.includes('Manager')
        isAdmin = roles.includes('Admin')
         isChef =roles.includes('Chef')
         isSupevisor =roles.includes('Supervisor')
          isStewards =roles.includes('steward')
           isAccountant =roles.includes('Acountant')
           isEmployee=roles.includes('Employee')

        if (isManager) status = "Manager"
        if (isAdmin) status = "Admin"
        if (isChef) status = "Chef"
        if (isSupevisor) status = "Supervisor"
        if (isStewards) status = "steward"
        if (isAccountant) status = "Acountant"
        if (isEmployee) status = "Employee"

       

        return { username, roles, status, isManager, isAdmin ,isChef, isSupevisor,isStewards,isAccountant ,isEmployee }
    }

    return { username: '', roles: [], isManager, isAdmin, status , isChef, isSupevisor,isStewards,isAccountant,isEmployee  }
}
export default useAuth