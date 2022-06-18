import React from 'react';
import {TbTruckDelivery} from 'react-icons/tb';
import {RiSecurePaymentFill} from 'react-icons/ri';
import {MdSupportAgent} from 'react-icons/md';
import './aboutFour.css';

export default function AboutFour() {
    return (
        <div className="aboutFour">
            <h2>WHAT WE OFFER</h2>
            <div className="aboutFourPermbajtja">
                <div className="aboutFour1">
                    <p>FREE <br /> DELIVERY</p>
                    <TbTruckDelivery className='icon' />
                </div>
                <div className="aboutFour1">
                    <p>SECURE <br /> PAYMENT</p>
                    <RiSecurePaymentFill className='icon'/>
                </div>
                <div className="aboutFour1">
                    <p>24/7 <br /> SUPPORT</p>
                    <MdSupportAgent className='icon'/>
                </div>

            </div>
        </div>
    )
}
