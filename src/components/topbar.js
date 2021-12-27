import React, {useContext, Fragment} from "react";
import { Link, NavLink } from "react-router-dom";
import { CurrentUserContexts } from "contexts/currentUser";
const TopBar = () => {
    const [currentUserState] = useContext(CurrentUserContexts)
    return (
        <nav className='navbar navbar-light'>
            <div className='container'>
                <Link to='/' className='navbar-brand'>Medium
                </Link>
                <ul className='nav navbar-nav pull-xs-right'>
                    <li className='nav-item'>
                        <NavLink to='/' className='nav-link' exact>Home
                        </NavLink>
                    </li>
                    {currentUserState.isLoggedIn === false && (
                        <Fragment>
                    <li className='nav-item'>
                        <NavLink to='/login' className='nav-link' exact>Sign in
                        </NavLink>
                    </li>
                    <li className='nav-item'><NavLink to='/register' className='nav-link' exact>Sign up
                    </NavLink>
                    </li>
                    </Fragment>
                    )}
                    {currentUserState.isLoggedIn && (
                        <Fragment>
                            <li className='nav-item'>
                                <NavLink to='/articles/new' className='nav-link'>
                                    <i className='ion-compose'></i>
                                    &nbsp; New Post
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                            <NavLink to='/settings' className='nav-link'>
                                    <i className='ion-gear-a'></i>
                                    &nbsp; Settings
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to={`/profiles/${currentUserState.currentUser.username}`}className='nav-link'>
                                    <img className='user-pic' 
                                    src={currentUserState.currentUser.image}
                                    alt=''/>
                                    &nbsp; {currentUserState.currentUser.username}
                                </NavLink>
                            </li>
                        </Fragment>
                    )}  
                </ul>
            </div>
        </nav>
    )
}

export default TopBar;