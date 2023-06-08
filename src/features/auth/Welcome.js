import { Link } from 'react-router-dom'

const Welcome = () => {

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome!</h1>

         

            

            <p><Link to="/dash/users">View User </Link></p>

            <p><Link to="/dash/users/new">Add New User</Link></p>

            <p><Link to="/dash/notes/new">Add New Employee</Link></p>

            <p><Link to="/dash/notes">View Employees</Link></p>

        </section>
    )

    return content
}
export default Welcome