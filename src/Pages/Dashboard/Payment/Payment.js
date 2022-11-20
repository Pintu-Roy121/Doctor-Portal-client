import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {
    const booking = useLoaderData();
    const { treatment, price, slot, appointmentDate } = booking
    return (
        <div>
            <h1 className="text-3xl font-semibold">Payment {treatment}</h1>
            <p className='text-2xl text-success font-semibold'>Price:$ <strong>{price}</strong> </p>
            <p className='text-xl font-semibold'>Date: {appointmentDate} and time slot is {slot}</p>
        </div>
    );
};

export default Payment;