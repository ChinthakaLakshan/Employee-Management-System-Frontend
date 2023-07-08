import { useState, useEffect } from "react"
import {useDeleteEmployeesMutation , useUpdateEmployeesMutation} from "./employeesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave , faTrashCan} from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
import { DEPARTMENT } from "../../config/department"



const EditEmployeeForm = ({employees}) => {

    const [updateEmployees, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateEmployeesMutation()

    const [deleteEmployees, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteEmployeesMutation()

    const navigate = useNavigate()

   
    const [roles, setRoles] = useState(["Employee"])
    const [email, setemail] = useState('')
    const [prevexperience, setexperience] = useState('')
    const [phone, setphone] = useState('')
   /* const [fname, setfname] = useState('')
    const [lname, setlname] = useState('')
   
    const [address, setaddress] = useState('')
    
    
    
    const [empid, setempid] = useState('')*/
    const [department, setdepartment] = useState([''])



    

    useEffect(() => {
        if (isSuccess||isDelSuccess) {
            
            setRoles([])
            setemail('')
            setexperience('')
            setphone('')
           /* setaddress('')
            
            setempid('')
            
            setfname('')
            setlname('')
          
            */
           setdepartment([])
            navigate('/dash/employee')
        }
    }, [isSuccess,isDelSuccess, navigate])

    

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        setRoles(values)
    }
    const onDepartmentChanged = e => {
      const values = Array.from(
          e.target.selectedOptions, //HTMLCollection 
          (option) => option.value
      )
      setdepartment(values)
  }


  const onEmailChanged = e => {
    const value = e.target.value;
    setemail(value);
  }


    const onSaveEmployeesClicked = async (e) => {
        
            await updateEmployees({ id: employees.id, email, department, roles , phone ,prevexperience})
        
            
        }
    
    const onDeleteEmployeesClicked = async () => {
        await deleteEmployees({ id: employees.id })
    }

    
    const canSave = [roles.length ,department.length].every(Boolean) && !isLoading

    

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })
    const options1 = Object.values(DEPARTMENT).map(department => {
      return (
          <option
              key={department}
              value={department}

          > {department}</option >
      )
  })


 

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''
    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''
    const validDeptClass = !Boolean(department.length) ? 'form__input--incomplete' : ''

    const content = (
        <>
        <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={e => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Employee</h2>
          <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveEmployeesClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
            <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteEmployeesClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
          </div>
        </div>
        <label className="form__label" htmlFor="email">
         Email: <span className="nowrap"></span>
        </label>
        <input
          className={`form__input `}
          id="email"
          name="email"
          type="text"
          autoComplete="off"
          value={email}
          onChange={onEmailChanged}
        />

       
        <label className="form__label" htmlFor="roles">
          Assigned Roles:
        </label>
        <select
          id="roles"
          name="roles"
          className={`form__select ${validRolesClass}`}
          multiple={true}
          size="3"
          value={roles}
          onChange={onRolesChanged}
        >
          {options}
        </select>

        <label className="form__label" htmlFor="department">
          Assigned Department:<span className="nowrap"></span>
        </label>
        <select
          id="department"
          name="department"
          className={`form__select ${validDeptClass}`}
          multiple={true}
          size="3"
          value={department}
          onChange={onDepartmentChanged}
        >
          {options1}
        </select>



       
      </form>
    </>
    )

    return content
}
export default EditEmployeeForm