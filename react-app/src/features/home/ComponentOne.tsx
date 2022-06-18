import React, { useLayoutEffect } from 'react'
import HomeNavbar from '../../app/layout/HomeNavbar';
import Home from './Home';
import SectionTwo from './SectionTwo';
import SectionThree from '../../features/home/SectionThree';
import SectionFour from '../../features/home/SectionFour';
import SectionFive from '../../features/home/SectionFive';
import SectionSix from '../../features/home/SectionSix';
import Footer from '../../app/layout/Footer';

export default function ComponentOne() {

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });

  return (
    <>
      <HomeNavbar />
      <Home />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <SectionSix />
      <Footer />
    </>
  )
}
