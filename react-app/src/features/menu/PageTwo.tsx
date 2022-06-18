import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./pageTwo.css";

// import required modules
import { Pagination } from "swiper";

export default function App() {
    return (
        <>
            <div className="pageTwo">
                <h2>OUR DELICIOUS FOOD</h2>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <img src="/assets/delicious-food1.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/assets/delicious-food2.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/assets/delicious-food3.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/assets/delicious-food4.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/assets/delicious-food5.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/assets/delicious-food6.jpg" alt="" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    );
}