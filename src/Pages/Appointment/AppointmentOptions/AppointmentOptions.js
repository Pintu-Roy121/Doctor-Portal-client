import React from 'react';

const AppointmentOptions = ({ appointmentOptions, setTreatment }) => {
    const { name, slots } = appointmentOptions

    return (
        <div className="card shadow-xl">
            <div className="card-body text-center">
                <h2 className="text-2xl font-semibold">{name}</h2>
                <p>{slots.length > 0 ? slots[0] : 'Try Another Day'}</p>
                <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} Available</p>
                <div className="card-actions justify-center">
                    <label
                        disabled={slots.length === 0}
                        onClick={() => setTreatment(appointmentOptions)}
                        htmlFor="Booking-modal"
                        className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white"
                    >Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOptions;