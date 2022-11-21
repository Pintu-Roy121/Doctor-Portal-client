import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthPorvider';

const MyAppointment = () => {
    const { user } = useContext(AuthContext);

    const url = `http://localhost:5000/bookings?email=${user?.email}`;

    const { data: bookings = [], refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-Token')}`
                }
            });
            const data = res.json();
            return data;
        }
    })


    const handleBookings = (id) => {
        fetch(`http://localhost:5000/bookings/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('access-Token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    toast.success(`Cancel booking successful`);
                    refetch();
                }
            })
            .catch(error => {
                console.log(error.message);
            })
    }



    return (
        <div>
            <h1 className='text-xl mb-5 font-semibold'>My Appointments: {bookings.length}</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>treatment</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Price</th>
                            <th>Payment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((booking, index) => <tr
                                key={booking._id}
                            >
                                <th>{index + 1}</th>
                                <td>{booking.patient}</td>
                                <td>{booking.treatment}</td>
                                <td>{booking.appointmentDate}</td>
                                <td>{booking.slot}</td>
                                <td>{booking.price}</td>
                                <td>
                                    <>
                                        {
                                            booking?.price && !booking.paid && <Link to={`/dashboard/payment/${booking._id}`}>
                                                <button className='btn btn-sm btn-primary mx-3'
                                                >Pay</button>
                                            </Link>
                                        }
                                        {
                                            booking?.price && booking.paid && <span className='mx-5 font-bold text-success '>Paid</span>
                                        }
                                    </>
                                </td>
                                <td>
                                    <button onClick={() => handleBookings(booking._id)} className='btn btn-sm btn-error'>Cancel
                                    </button>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointment;