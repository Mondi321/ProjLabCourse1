import React, { useLayoutEffect } from 'react';
import AboutOne from '../../features/about/AboutOne';
import AboutTwo from '../../features/about/AboutTwo';
import AboutThree from '../../features/about/AboutThree';
import AboutFour from '../../features/about/AboutFour';
import Footer from '../../app/layout/Footer';
import HomeNavbar from '../../app/layout/HomeNavbar';

export default function ComponentThree() {

    useLayoutEffect(() => {
        window.scrollTo(0,0)
    });

    return (
        <>
            <HomeNavbar />
            <AboutOne />
            <AboutTwo />
            <AboutThree />
            <AboutFour />
            <Footer />
        </>
    )
}
