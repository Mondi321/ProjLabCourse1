import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useStore } from '../../app/stores/store';
import './menu.css';

export default observer(function Menu() {
    const { ushqimiStore, pijeStore, embelsiraStore } = useStore();
    const { ushqimetByCmimi, ushqimiRegistry, loadUshqimet } = ushqimiStore;
    const { pijetByCmimi, pijeRegistry, loadPijet } = pijeStore;
    const { embelsiratByCmimi, embelsiraRegistry, loadEmbelsirat } = embelsiraStore;

    const [foodClicked, setFoodClicked] = useState(true);
    const [drinksClicked, setDrinksClicked] = useState(false);
    const [dessertsClicked, setDessertsClicked] = useState(false);
    const [foodClassName, setFoodClassName] = useState('active');
    const [drinksClassName, setDrinksClassName] = useState('');
    const [dessertsClassName, setDessertsClassName] = useState('');


    useEffect(() => {
        if (ushqimiRegistry.size <= 1) loadUshqimet();
    }, [ushqimiRegistry.size, loadUshqimet])

    useEffect(() => {
        if (pijeRegistry.size <= 1) loadPijet();
    }, [pijeRegistry.size, loadPijet])

    useEffect(() => {
        if (embelsiraRegistry.size <= 1) loadEmbelsirat();
    }, [embelsiraRegistry.size, loadEmbelsirat])


    const handleFoodClick = () => {
        setFoodClicked(true);
        setDrinksClicked(false);
        setDessertsClicked(false);
        setFoodClassName('active');
        setDrinksClassName('');
        setDessertsClassName('');
    }
    const handleDrinksClick = () => {
        setFoodClicked(false);
        setDrinksClicked(true);
        setDessertsClicked(false);
        setFoodClassName('');
        setDrinksClassName('active');
        setDessertsClassName('');
    }
    const handleDessertsClick = () => {
        setFoodClicked(false);
        setDrinksClicked(false);
        setDessertsClicked(true);
        setFoodClassName('');
        setDrinksClassName('');
        setDessertsClassName('active');
    }
    return (
        <>
            <div className='menuPage'>
                <h2>On The Menu</h2>
                <hr />
                <div className="kategorite">
                    <ul>
                        <li onClick={handleFoodClick} className={foodClassName}>Food</li>
                        <li onClick={handleDrinksClick} className={drinksClassName}>Drinks</li>
                        <li onClick={handleDessertsClick} className={dessertsClassName}>Desserts</li>
                    </ul>
                    <div className="food">
                        {foodClicked &&
                            ushqimetByCmimi.map(ushqimi => (
                                <div key={ushqimi.id} className='food-section'>
                                    <img src={`/assets/${ushqimi.emri}.jpg`} alt="" />
                                    <div className='pershkrimi'>
                                        <div className='emri-cmimi'>
                                            <h4>{ushqimi.emri}</h4>
                                            <div>. . . . .</div>
                                            <h4>${ushqimi.cmimi}</h4>
                                        </div>
                                        <div className='perberesit'>
                                            <p>{ushqimi.perberesit}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className='food'>
                        {drinksClicked &&
                            pijetByCmimi.map(pije => (
                                <div key={pije.id} className='food-section'>
                                    <img src={`/assets/${pije.emri}.jpg`} alt="" />
                                    <div className='pershkrimi'>
                                        <div className='emri-cmimi'>
                                            <h4>{pije.emri}</h4>
                                            <div>. . . . .</div>
                                            <h4>${pije.cmimi}</h4>
                                        </div>
                                        <div className='perberesit'>
                                            <p>{pije.perberesit}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {/* // <div className='food'>
                        //     <div className='food-section'>
                        //         <img src="https://bootstrapmade.com/demo/templates/Restaurantly/assets/img/menu/bread-barrel.jpg" alt="" />
                        //         <div className='pershkrimi'>
                        //             <div className='emri-cmimi'>
                        //                 <h4>Lobster Bisque</h4>
                        //                 <div>. . . . .</div>
                        //                 <h4>$5.95</h4>
                        //             </div>
                        //             <div className='perberesit'>
                        //                 <p>Lorem, deren, trataro, filede, nerada</p>
                        //             </div>
                        //         </div>
                        //     </div>
                        //     <div className='food-section'>
                        //         <img src="https://bootstrapmade.com/demo/templates/Restaurantly/assets/img/menu/bread-barrel.jpg" alt="" />
                        //         <div className='pershkrimi'>
                        //             <div className='emri-cmimi'>
                        //                 <h4>Lobster Bisque</h4>
                        //                 <div>. . . . .</div>
                        //                 <h4>$5.95</h4>
                        //             </div>
                        //             <div className='perberesit'>
                        //                 <p>Lorem, deren, trataro, filede, nerada</p>
                        //             </div>
                        //         </div>
                        //     </div>
                        //     <div className='food-section'>
                        //         <img src="https://bootstrapmade.com/demo/templates/Restaurantly/assets/img/menu/bread-barrel.jpg" alt="" />
                        //         <div className='pershkrimi'>
                        //             <div className='emri-cmimi'>
                        //                 <h4>Lobster Bisque</h4>
                        //                 <div>. . . . .</div>
                        //                 <h4>$5.95</h4>
                        //             </div>
                        //             <div className='perberesit'>
                        //                 <p>Lorem, deren, trataro, filede, nerada</p>
                        //             </div>
                        //         </div>
                        //     </div>
                        //     <div className='food-section'>
                        //         <img src="https://bootstrapmade.com/demo/templates/Restaurantly/assets/img/menu/bread-barrel.jpg" alt="" />
                        //         <div className='pershkrimi'>
                        //             <div className='emri-cmimi'>
                        //                 <h4>Lobster Bisque</h4>
                        //                 <div>. . . . .</div>
                        //                 <h4>$5.95</h4>
                        //             </div>
                        //             <div className='perberesit'>
                        //                 <p>Lorem, deren, trataro, filede, nerada</p>
                        //             </div>
                        //         </div>
                        //     </div>
                        // </div> */}


                    <div className='food'>
                        {dessertsClicked &&
                            embelsiratByCmimi.map(embelsira => (
                                <div key={embelsira.id} className='food-section'>
                                    <img src={`/assets/${embelsira.emri}.jpg`} alt="" />
                                    <div className='pershkrimi'>
                                        <div className='emri-cmimi'>
                                            <h4>{embelsira.emri}</h4>
                                            <div>. . . . .</div>
                                            <h4>${embelsira.cmimi}</h4>
                                        </div>
                                        <div className='perberesit'>
                                            <p>{embelsira.perberesit}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
        </>
    )
})
