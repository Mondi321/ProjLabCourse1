import React, { useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./sectionFive.css";

// import required modules
import { Navigation } from "swiper";
import { useStore } from "../../app/stores/store";

export default function SectionFive() {
    const { eventiStore } = useStore();
    const { eventetByCmimi, loadEventet } = eventiStore;

    useEffect(() => {
        loadEventet();
    }, [loadEventet])
    return (
        <>
            <div className="sectionFive">
                <h1>Organize Your Events In Our Restaurant</h1>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {eventetByCmimi.map(eventi => (
                        <SwiperSlide key={eventi.id}>
                            <div className="permbajtjaFive">
                                <img src="/assets/event-birthday.jpg" alt="" />
                                <div className="pershkrimiFive">
                                    <h3>{eventi.titulli}</h3>
                                    <h4>${eventi.cmimi}</h4>
                                    <p>{eventi.pershkrimi}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                    {/* <SwiperSlide>
                        <div className="permbajtjaFive">
                            <img src="/assets/event-birthday.jpg" alt="" />
                            <div className="pershkrimiFive">
                                <h3>Birthday Parties</h3>
                                <h4>$189</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quae accusamus neque porro eos eum vel ipsa illo dicta? Architecto qui quos illum aliquam officiis facere modi hic, dolor vero.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="permbajtjaFive">
                            <img src="/assets/event-birthday.jpg" alt="" />
                            <div className="pershkrimiFive">
                                <h3>Birthday Parties</h3>
                                <h4>$189</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quae accusamus neque porro eos eum vel ipsa illo dicta? Architecto qui quos illum aliquam officiis facere modi hic, dolor vero.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="permbajtjaFive">
                            <img src="/assets/event-birthday.jpg" alt="" />
                            <div className="pershkrimiFive">
                                <h3>Birthday Parties</h3>
                                <h4>$189</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quae accusamus neque porro eos eum vel ipsa illo dicta? Architecto qui quos illum aliquam officiis facere modi hic, dolor vero.</p>
                            </div>
                        </div>
                    </SwiperSlide> */}
                </Swiper>
            </div>
        </>
    );
}