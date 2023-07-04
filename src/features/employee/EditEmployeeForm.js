import { useState, useEffect } from "react"
import {useDeleteEmployeesMutation , useUpdateEmployeesMutation} from "./employeesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave , faTrashCan} from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
import { DEPARTMENT } from "../../config/department"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

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

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(["Employee"])

   /* const [fname, setfname] = useState('')
    const [lname, setlname] = useState('')
    const [email, setemail] = useState('')
    const [address, setaddress] = useState('')
    const [phone, setphone] = useState('')
    
    const [experience, setexperience] = useState('')
    const [empid, setempid] = useState('')*/
    const [department, setdepartment] = useState([''])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess||isDelSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
           /* setaddress('')
            setemail('')
            setempid('')
            setexperience('')
            setfname('')
            setlname('')
           setphone('')
            */
           setdepartment([])
            navigate('/dash/employee')
        }
    }, [isSuccess,isDelSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

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


    const onSaveEmployeesClicked = async (e) => {
        if (password) {
            await updateEmployees({ id: employees.id, username, password, roles })
        } else {
            await updateEmployees({ id: employees.id, username, roles })
        }
    }
    const onDeleteEmployeesClicked = async () => {
        await deleteEmployees({ id: employees.id })
    }
    const canSave = [roles.length, validUsername, validPassword/*,empid.length,phone.length,email.length,fname.length,lname.length,address.length,department.length,experience.length*/,department.length].every(Boolean) && !isLoading

    

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
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
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
        <label className="form__label" htmlFor="username">
          Username: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validUserClass}`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={onUsernameChanged}
        />

        <label className="form__label" htmlFor="password">
          Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className={`form__input ${validPwdClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChanged}
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