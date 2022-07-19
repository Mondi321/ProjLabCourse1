import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './homeNavbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button, Image, NavDropdown } from 'react-bootstrap';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import ReviewModal from '../../features/reviews/ReviewModal';

export default observer(function HomeNavbar() {
    const { userStore: { user, logout }, commonStore } = useStore();

    const {modalShow, setModalShow} = commonStore;

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
            <nav className={colorChange ? 'navbarHome colorChange' : 'navbarHome'}>
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
                        <li style={{display: 'flex', flexDirection:'row', gap:'10px'}}>
                            <Link
                                to='rezervimiForm'
                            >
                                <Button
                                    variant='warning'
                                >
                                    Reservation
                                </Button>
                            </Link>
                            <Link
                                to='porosia'
                            >
                                <Button
                                    variant='warning'
                                >
                                    Order
                                </Button>
                            </Link>
                        </li>
                    </ul>
                    <div className='image-information'>
                        <Image style={{ height: '40px', width: '40px' }} roundedCircle src={user?.image || '/assets/user.png'} />
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title={user?.displayName}
                            menuVariant="dark"
                        >
                            {user?.roli.includes('Admin') && (
                                <NavDropdown.Item href='/ushqimet'>Dashboard</NavDropdown.Item>
                            )}
                            <NavDropdown.Item href='/reservations'>Reservations</NavDropdown.Item>
                            <NavDropdown.Item href='/porosite'>Orders</NavDropdown.Item>
                            <NavDropdown.Item href='/changePhoto'>Change Photo</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setModalShow(true)}>Write a Review</NavDropdown.Item>
                            <NavDropdown.Divider style={{ background: 'white' }} />
                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                    <div className="nav-icon" onClick={handleClick}>
                        {click ? <FaTimes /> : <FaBars />}
                    </div>
                </div>
            </nav>
            <ReviewModal
                modalShow={modalShow}
                setModalShow={setModalShow}
            />
        </>
    )
})
