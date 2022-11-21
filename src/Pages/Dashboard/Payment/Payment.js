import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
// import { useNavigation } from 'react-day-picker';
import { useLoaderData } from 'react-router-dom';
import PayCheckOutForm from './PayCheckOutForm';
// import Loading from '../../Shared/Loading/Loading'



const stripePromise = loadStripe(process.env.REACT_APP_STRIP_PK);


const Payment = () => {
    // const navigation = useNavigation();
    const booking = useLoaderData();
    const { treatment, price, slot, appointmentDate } = booking;

    // show speinner durint loadin data using loader..............
    // if (navigation.state === "loading") {
    //     return <Loading />
    // }

    return (
        <div>
            <h1 className="text-3xl font-semibold">Payment {treatment}</h1>
            <p className='text-2xl text-success font-semibold'>Price:$ <strong>{price}</strong> </p>
            <p className='text-xl font-semibold'>Date: {appointmentDate} and time slot is {slot}</p>
            <div className='w-2/4 my-10'>
                <Elements stripe={stripePromise}>
                    <PayCheckOutForm
                        booking={booking}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;