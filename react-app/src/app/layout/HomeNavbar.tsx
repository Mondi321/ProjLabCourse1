import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './homeNavbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Image, NavDropdown } from 'react-bootstrap';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function HomeNavbar() {
    const { userStore: { user, logout } } = useStore();

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const [colorChange, setColorchange] = useState(false);
    const changeNavbarColor = () => {
        if (window.scrollY >= 120) {
            setColorchange(true);
        }
        else {
            setColorchange(false);
        }
    };
    window.addEventListener('scroll', changeNavbarColor);
    return (
        <>
            <nav className={colorChange ? 'navbar colorChange' : 'navbar'}>
                <div className="nav-container">
                    <NavLink exact to="/" className="nav-logo">
                        SONA
                    </NavLink>

                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-itemH">
                            <NavLink
                                exact
                                to="/home"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-itemH">
                            <NavLink
                                exact
                                to="/menu"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Menu
                            </NavLink>
                        </li>
                        <li className="nav-itemH">
                            <NavLink
                                exact
                                to="/about"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                About
                            </NavLink>
                        </li>
                        <li className="nav-itemH">
                            <NavLink
                                exact
                                to="/contact"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Contact Us
                            </NavLink>
                        </li>
                    </ul>
                    <div className='image-information'>
                        <Image style={{ height: '40px', width: '40px', marginBottom: '10px' }} roundedCircle src={user?.image || '/assets/user.png'} />
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title={user?.displayName}
                            menuVariant="light"
                        >
                            <NavDropdown.Item>Another action</NavDropdown.Item>
                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                    <div className="nav-icon" onClick={handleClick}>
                        {click ? <FaTimes /> : <FaBars />}
                    </div>
                </div>
            </nav>
        </>
    )
})
