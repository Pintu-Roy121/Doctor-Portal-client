import React from 'react';
import chair from '../../../assets/images/chair.png'
import { DayPicker } from 'react-day-picker';

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {


    return (
        <header className="my-">
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={chair} alt='' className="max-w-sm rounded-lg shadow-2xl" />
                    <div className='mr-6'>
                        <DayPicker
                            mode='single'
                            selected={selectedDate}
                            // onSelect={setSelectedDate}
                            // avoiding double click error..................
                            onSelect={(selectedDate) => {
                                if (selectedDate) {
                                    setSelectedDate(selectedDate)
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppointmentBanner;

// onSelect = {(selectedDate) => {
//     if (selectedDate) {
//         setSelectedDate(selectedDate)
//     }
// }}