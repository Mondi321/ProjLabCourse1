import React from 'react';
import './sectionSix.css';

export default function SectionSix() {
    return (
        <div className="sectionSix">
            <h1>CUSTOMER REVIEWS</h1>
            <div className="customers-Six">
                <div className='customerSix'>
                    <div className="foto-emri-six">
                        <img src="/assets/person1.jpg" alt="" />
                        <h5>Emri Mbiemri</h5>
                    </div>
                    <div className='reviewSix'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita nobis eum, iure quasi labore nesciunt vitae quam cumque excepturi libero tempore, voluptas reprehenderit neque quae. Architecto perferendis exercitationem explicabo similique.</p>
                    </div>
                </div>
                <div className='customerSix'>
                    <div className="foto-emri-six">
                        <img src="/assets/person2.jpg" alt="" />
                        <h5>Emri Mbiemri</h5>
                    </div>
                    <div className='reviewSix'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita nobis eum, iure quasi labore nesciunt vitae quam cumque excepturi libero tempore, voluptas reprehenderit neque quae. Architecto perferendis exercitationem explicabo similique.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
