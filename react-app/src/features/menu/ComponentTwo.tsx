import React, { useLayoutEffect } from 'react';
import HomeNavbar from '../../app/layout/HomeNavbar';
import Footer from '../../app/layout/Footer';
import PageOne from '../../features/menu/PageOne';
import Menu from '../../features/menu/Menu';
import PageTwo from '../../features/menu/PageTwo';

export default function ComponentTwo() {

    useLayoutEffect(() => {
        window.scrollTo(0,0)
    });
    
    return (
        <>
            <HomeNavbar />
            <PageOne />
            <Menu />
            <PageTwo />
            <Footer />
        </>
    )
}
