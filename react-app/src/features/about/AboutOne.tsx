import React from 'react';
import './aboutOne.css';

export default function AboutOne() {
    return (
        <div className="aboutOne">
            <div className="aboutOnePermbajtja">
                <img src="/assets/aboutOne1.jpg" alt="" />
                <div className="aboutOnePershkrimi">
                    <h2>Our Story</h2>
                    <p>"Lorem ipsum dolor sit amet consectetur adipisicing elit. Et debitis numquam dignissimos optio laudantium nostrum ut, magni dolor ipsum omnis autem enim aperiam molestiae illo quibusdam, praesentium beatae possimus quod."</p>
                </div>
            </div>
            <hr className='aboutOneHr1'/>
            <hr className='aboutOneHr2'/>
        </div>
    )
}
