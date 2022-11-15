import React from 'react';
import chair from '../../../assets/images/chair.png';
import PrimaryButton from '../../../Components/PrimaryButton/PrimaryButton';
import './Banner.css'

const Banner = () => {
    return (
        <div className="hero hero-bg">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={chair} className="rounded-lg lg:w-1/2 shadow-2xl" alt='' />
                <div >
                    <h1 className="text-5xl font-bold">Box Office News!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <PrimaryButton>Getting Started</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default Banner;

// relative flex items-center justify-center h-[300px] before:content-[''] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-[rgba(0,0,0,0.25)]