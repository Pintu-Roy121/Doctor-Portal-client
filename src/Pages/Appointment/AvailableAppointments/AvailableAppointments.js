import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import AppointmentOptions from '../AppointmentOptions/AppointmentOptions';
import BookingModal from '../BookingModal/BookingModal';

const AvailableAppointments = ({ selectedDate }) => {
    const [appointmentOptions, setAppointmentOptions] = useState([]);
    const [treatment, setTreatment] = useState(null)

    useEffect(() => {
        fetch('AppointmentsOptions.json')
            .then(res => res.json())
            .then(data => setAppointmentOptions(data))
    }, [])



    return (
        <div className='my-14'>
            <p className='text-lg text-center text-secondary font-bold my-8'>Available Appointments on {format(selectedDate, 'PP')}</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-8' >
                {
                    appointmentOptions.map(option => <AppointmentOptions
                        key={option._id}
                        appointmentOptions={option}
                        setTreatment={setTreatment}
                    ></AppointmentOptions>)
                }
            </div>
            {
                treatment &&
                <BookingModal
                    treatment={treatment}
                    selectedDate={selectedDate}
                    setTreatment={setTreatment}
                ></BookingModal>
            }
        </div>
    );
};

export default AvailableAppointments;