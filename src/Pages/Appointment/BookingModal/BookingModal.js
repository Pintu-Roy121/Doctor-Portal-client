import { format } from 'date-fns';
import React from 'react';

const BookingModal = ({ treatment, selectedDate, setTreatment }) => {
    const { name, slots } = treatment;
    const date = format(selectedDate, 'PP')

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

        console.log(booking);
        setTreatment(null)
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
                        <input name='name' type="text" placeholder="Full Name" className="input input-bordered input-info w-full" required />
                        <input name='phone' type="text" placeholder="Phone Number" className="input input-bordered input-info w-full" />
                        <input name='email' type="email" placeholder="Email" className="input input-bordered input-info w-full" />
                        <input type="submit" value='submit' className="btn  btn-bordered btn-info w-full" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;