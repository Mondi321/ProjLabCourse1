import React from 'react';
import './aboutThree.css';

export default function AboutThree() {
    return (
        <div className="aboutThree">
            <div className="aboutThree-pershkrimi">
                <h1>OUR TEAM</h1>
                <h4>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim quisquam rerum, iste voluptates sit quaerat eos magni incidunt quo assumenda.</h4>
            </div>
            <div className="aboutThree-foto">
                <img src="/assets/aboutThree1.jpg" alt="" />
                <img src="/assets/aboutThree2.jpg" alt="" />
                <img src="/assets/aboutThree3.jpg" alt="" />
            </div>
            <hr className='aboutThreeHr1'/>
            <hr className='aboutThreeHr2'/>
        </div>
    )
}
