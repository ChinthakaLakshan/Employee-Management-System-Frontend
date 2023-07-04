import { useState, useEffect } from "react"
import {useAddNewEmployeesMutation} from "./employeesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
import { DEPARTMENT } from "../../config/department"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewEmployeeForm = () => {

    const [addNewEmployee, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewEmployeesMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(["Employee"])

   const [fname, setfname] = useState('')
    const [lname, setlname] = useState('')
    const [email, setemail] = useState('')
    const [address, setaddress] = useState('')
    const [phone, setphone] = useState('')
    const [department, setdepartment] = useState([''])
    const [experience, setexperience] = useState('')
    const [empid, setempid] = useState('')


    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            setaddress('')
            setemail('')
            setempid('')
            setexperience('')
            setfname('')
            setlname('')
           setphone('')
           setdepartment([])
            navigate('/dash/employee')
        }
    }, [isSuccess, navigate])

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

    const canSave = [roles.length, validUsername, validPassword,empid.length,phone.length,email.length,fname.length,lname.length].every(Boolean) && !isLoading

    const onSaveEmployeeClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewEmployee({ username, password, roles,fname,lname,address,email,phone,department,experience,empid })
        }
    }

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

    const errClass = isError ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''
    const validDeptClass = !Boolean(department.length) ? 'form__input--incomplete' : ''

    const content = (
        <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveEmployeeClicked}>
        <div className="form__title-row">
          <h2>Add New Employees</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="username">
          Username123: <span className="nowrap">[3-20 letters]</span>
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
          <label className="form__label" htmlFor="empid">
         Employee ID:<span className="nowrap"></span>
        </label>
        <input
          className="form__input"
          id="empid"
          name="empid"
          type="text"
          value={empid}
          onChange={(e) => setempid(e.target.value)}
        />

        <label className="form__label" htmlFor="roles">
          Assigned Roles:<span className="nowrap">[4-12 chars incl. !@#$%]</span>
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

        <label className="form__label" htmlFor="fname">
          First Name:<span className="nowrap"></span>
        </label>
        <input
          className="form__input"
          id="fname"
          name="fname"
          type="text"
          value={fname}
          onChange={(e) => setfname(e.target.value)}
        />

        <label className="form__label" htmlFor="lname">
          Last Name:<span className="nowrap"></span>
        </label>
        <input
          className="form__input"
          id="lname"
          name="lname"
          type="text"
          value={lname}
          onChange={(e) => setlname(e.target.value)}
        />

        <label className="form__label" htmlFor="email">
          Email:<span className="nowrap"></span>
        </label>
        <input
          className="form__input"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />

        <label className="form__label" htmlFor="address">
          Address:<span className="nowrap"></span>
        </label>
        <input
          className="form__input"
          id="address"
          name="address"
          type="text"
          value={address}
          onChange={(e) => setaddress(e.target.value)}
        />

        <label className="form__label" htmlFor="phone">
          Phone:<span className="nowrap"></span>
        </label>
        <input
          className="form__input"
          id="phone"
          name="phone"
          type="tel"
          value={phone}
          onChange={(e) => setphone(e.target.value)}
        />

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
        
        
        <label className="form__label" htmlFor="expirience">
          Expirience:<span className="nowrap"></span>
        </label>
        <input
          className="form__input"
          id="expirience"
          name="expirience"
          type="text"
          value={experience}
          onChange={(e) => setexperience(e.target.value)}
        />
       
      </form>
    </>
    )

    return content
}
export default NewEmployeeForm