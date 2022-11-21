import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const PayCheckOutForm = ({ booking }) => {
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState("");
    const [success, setSuccess] = useState();
    const [processing, setProcessing] = useState(false)
    const [transectionId, setTransectionId] = useState();
    const stripe = useStripe();
    const elements = useElements();
    const { price, email, patient, _id } = booking;


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('access-Token')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return
        }

        // const { error, paymentMethod } = await stripe.createPaymentMethod({
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            setCardError(error.message);
        }
        else {
            setCardError('');
        }

        setSuccess('');
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patient,
                        email: email,
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message);
            return
        }

        if (paymentIntent.status === 'succeeded') {
            const payment = {
                price,
                transectionId: paymentIntent.id,
                email,
                bookingId: _id
            }

            // Store Payment info to the database
            fetch('http://localhost:5000/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('access-Token')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.insertedId) {
                        setSuccess('Congrats! Payment Successful');
                        setTransectionId(paymentIntent.id);

                    }
                })

        }
        setProcessing(false);

        console.log('PaymentIntent', paymentIntent);


    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className='btn btn-primary btn-sm mt-5' type="submit"
                    disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>

            <p className='text-lg text-error font-semibold'>{cardError}</p>
            {
                success && <div>
                    <div className="text-lg font-bold text-success">{success}</div>
                    <p className='text-lg font-semibold'>Transaction Id: <span className='text-orange-500'>{transectionId}</span></p>
                </div>
            }
        </>
    );
};

export default PayCheckOutForm;