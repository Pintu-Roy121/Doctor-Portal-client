import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthPorvider';

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
    const { name, slots } = treatment;
    const date = format(selectedDate, 'PP');
    const { user } = useContext(AuthContext);

    const handleBooking = (event) => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const slot = form.slot.value;

        const booking = {
            appointmentDate: date,
            treatment: treatment.name,
            patient: name,
            email,
            phone,
            slot,
        }

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setTreatment(null);
                    toast.success('Booking Confirmed');
                    refetch();
                }
                else {
                    toast.error(data.message)
                }
            })


    }

    return (
        <>
            <input type="checkbox" id="Booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="Booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-xl font-bold">{name}</h3>
                    <form onSubmit={handleBooking} className='flex flex-col gap-5 mt-8'>
                        <input name='date' type="text" className="input input-bordered input-info w-full" disabled value={date} />
                        <select name='slot' className="select select-info w-full">
                            {
                                slots.map((slot, index) => <option
                                    key={index}
                                    value={slot}>{slot}</option>)
                            }
                        </select>
                        <input name='name' type="text" value={user.displayName} placeholder="Full Name" className="input input-bordered input-info w-full" required readOnly />
                        <input name='phone' type="text" placeholder="Phone Number" className="input input-bordered input-info w-full" />
                        <input name='email' type="email" value={user.email} placeholder="Email" className="input input-bordered input-info w-full" readOnly />
                        <input type="submit" value='submit' className="btn  btn-bordered btn-info w-full" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;