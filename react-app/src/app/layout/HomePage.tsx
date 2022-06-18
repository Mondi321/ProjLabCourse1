import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../stores/store'

export default observer(function HomePage() {
  const { userStore } = useStore();
  return (
    <div className='homePage'>
      <img src="/assets/restaurant_homePage.jpg" alt="" />
      <h1>WELCOME TO OUR RESTAURANT!</h1>
      {userStore.isLoggedIn ? (
        <>
          <Link to='/home'>
            <button className='button-homePage'><span>CONTINUE</span></button>
          </Link>
        </>
      ) : (
        <Link to='/sign-in'>
          <button className='button-homePage'><span>SIGN IN</span></button>
        </Link>
      )}

    </div>
  )
})
