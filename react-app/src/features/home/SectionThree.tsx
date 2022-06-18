import React from 'react'
import { Link } from 'react-router-dom';
import './sectionThree.css';

export default function SectionThree() {
  return (
    <div className='sectionThree'>
        <div className="pershkrimiThree">
            <h1>Restaurant MENU</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni iste ab, ipsum dolores officiis provident optio voluptates vel quo doloremque aperiam esse eveniet maiores, sed dignissimos atque perspiciatis nesciunt vero!</p>
            <Link to='/menu'>
                WHAT'S ON THE MENU
            </Link>
        </div>
        <div className="fotoThree">
            <img src="/assets/section3-1.jpg" alt="" />
        </div>
    </div>
  )
}
