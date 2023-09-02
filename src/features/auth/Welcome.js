import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserPlus, faUser, faPlus, faStickyNote } from '@fortawesome/free-solid-svg-icons';

const Welcome = () => {
  const { username, isManager, isAdmin , isChef, isSupevisor,isStewards,isAccountant} = useAuth();

  const date = new Date();
  const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date);

  const boxContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const boxStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '300px',
    height: '200px',
    backgroundColor: '#311465',
    borderRadius: '10px',
    margin: '10px',
    padding: '10px',
    textAlign: 'center',
  };

  const iconStyle = {
    fontSize: '50px',
    marginBottom: '10px',
  };
  const handleBoxHover = (event) => {
    event.target.style.transform = 'scale(1.1)';
  };

  const handleBoxLeave = (event) => {
    event.target.style.transform = 'scale(1)';
  };

  const content = (
    <section className="welcome">
    <p>{today}</p>
    <h1>Welcome {username}!</h1>

    <div style={boxContainerStyle}>
      {(isManager || isAdmin) && (
        <div
          style={boxStyle}
          onMouseEnter={handleBoxHover}
          onMouseLeave={handleBoxLeave}
        >
          <Link to="/dash/users">
            <FontAwesomeIcon icon={faUsers} style={iconStyle} />
            View Users
          </Link>
          </div>
        )}

        {(isManager || isAdmin) && (
          <div style={boxStyle}
          onMouseEnter={handleBoxHover}
          onMouseLeave={handleBoxLeave}>
             
            <Link to="/dash/users/new">
              <FontAwesomeIcon icon={faUserPlus} style={iconStyle} />
              Add New User
            </Link>
          </div>
        )}

        {(isManager || isAdmin) && (
          <div style={boxStyle}
          onMouseEnter={handleBoxHover}
          onMouseLeave={handleBoxLeave}>
             
            <Link to="/dash/employee">
              <FontAwesomeIcon icon={faUser} style={iconStyle} />
              Employee Details
            </Link>
          </div>
        )}

        {(isManager || isAdmin) && (
          <div style={boxStyle}
          onMouseEnter={handleBoxHover}
          onMouseLeave={handleBoxLeave}>
            <Link to="/dash/employee/new">
              <FontAwesomeIcon icon={faPlus} style={iconStyle} />
              Add New Employee
            </Link>
          </div>
        )}

        <div style={boxStyle}
        onMouseEnter={handleBoxHover}
        onMouseLeave={handleBoxLeave}>
          <Link to="/dash/attendance">
            <FontAwesomeIcon icon={faStickyNote} style={iconStyle} />
            Attendance
          </Link>
        </div>

     {/*    <div style={boxStyle}
        onMouseEnter={handleBoxHover}
        onMouseLeave={handleBoxLeave}>
          <Link to="/dash/notes/new">
            <FontAwesomeIcon icon={faStickyNote} style={iconStyle} />
            Task
          </Link>
        </div> */}

        <div style={boxStyle}
        onMouseEnter={handleBoxHover}
        onMouseLeave={handleBoxLeave}>
          <Link to="/dash/task">
            <FontAwesomeIcon icon={faStickyNote} style={iconStyle} />
            Task
          </Link>
        </div>

        <div style={boxStyle}
        onMouseEnter={handleBoxHover}
        onMouseLeave={handleBoxLeave}>
          <Link to="/dash/leave">
            <FontAwesomeIcon icon={faStickyNote} style={iconStyle} />
            Leaves
          </Link>
        </div>

        <div style={boxStyle}
        onMouseEnter={handleBoxHover}
        onMouseLeave={handleBoxLeave}>
          <Link to="/dash/leave/new">
            <FontAwesomeIcon icon={faStickyNote} style={iconStyle} />
           Reuest Leaves
          </Link>
        </div>

     {/*    <div style={boxStyle}
        onMouseEnter={handleBoxHover}
        onMouseLeave={handleBoxLeave}>
          <Link to="/dash/reports">
            <FontAwesomeIcon icon={faStickyNote} style={iconStyle} />
           Reports
          </Link>
        </div> */}

      </div>

      
    </section>
  );

  return content;
};

export default Welcome;