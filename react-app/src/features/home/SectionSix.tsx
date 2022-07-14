import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';
import { useStore } from '../../app/stores/store';
import './sectionSix.css';

export default observer(function SectionSix() {
    const { reviewStore } = useStore();
    const { reviewRegistry, loadReviews, reviews } = reviewStore;

    useEffect(() => {
        if (reviewRegistry.size <= 1) loadReviews();
    }, [reviewRegistry.size, loadReviews])

    return (
        <div className="sectionSix">
            <h1>CUSTOMER REVIEWS</h1>
            <div className="customers-Six">
                {reviews.map(review => (
                    <div className='customerSix' key={review.id}>
                        <div className="foto-emri-six">
                            <img src={review.user?.image || 'assets/user.png'} alt="" />
                            <div className="customer-Six-rating">
                                <h5>{review.user?.displayName}</h5>
                                <Rating size={20} readonly ratingValue={review.ratingValue} />
                            </div>
                        </div>
                        <div className='reviewSix'>
                            <p>{review.mesazhi}</p>
                        </div>
                    </div>
                ))}
                {/* <div className='customerSix'>
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
                </div> */}
            </div>
        </div>
    )
})
