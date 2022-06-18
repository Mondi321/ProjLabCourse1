import React from 'react'
import { Link } from 'react-router-dom';
import './sectionTwo.css';

export default function SectionTwo() {
  return (
    <>
        <div className='sectionTwo'>
            <div className='fotoTwo'>
                <img src="/assets/section2-1.jpg" alt="" className='fotoTwo1'/>
                <img src="/assets/section2-2.jpg" alt="" className='fotoTwo2'/>
            </div>
            <div className='pershkrimiTwo'>
                <h2>Welcome At <br /> Our Restaurant</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, debitis quos modi odio commodi totam illo officiis omnis nam sit delectus unde odit nulla quaerat tempora. Laudantium asperiores quos facere!</p>
                <Link className='link' to='/about'>
                    About Us
                </Link>
            </div>
        </div>
    </>
  )
}
