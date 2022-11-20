import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const ManageDoctors = () => {

    const [deletingDoctors, setDeletingDoctors] = useState(null);

    const closeModal = () => {
        setDeletingDoctors(null);
    }


    const { data: doctors = [], isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/doctors', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('access-Token')}`
                }
            })
            const data = await res.json()
            return data;
        }
    })


    const handleDeleteDoctor = (doctor) => {
        fetch(`http://localhost:5000/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('access-Token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    toast.success(`Delete ${doctor.name} successful`);
                    refetch();
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='p-16'>
            <h1 className='text-3xl mb-5 font-semibold'>All Doctors: {doctors?.length}</h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>sl</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Treatement</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, index) => <tr
                                key={doctor._id}
                            >
                                <td>{index + 1}</td>
                                <td>
                                    <div className='avatar'>
                                        <div className="w-16 rounded-full">
                                            <img src={`${doctor.image}`} alt="doctorsImage" />
                                        </div>
                                    </div>
                                </td>
                                <td>{doctor.name}</td>
                                <td>{doctor.specialty}</td>
                                <td>{doctor.email}</td>
                                <th>
                                    <label onClick={() => setDeletingDoctors(doctor)} htmlFor="confirmation-modal" className="btn btn-error btn-xs">Delete</label>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingDoctors && <ConfirmationModal
                    title={`Are you sure to delete the doctor`}
                    message={`If you delete the ${deletingDoctors.name} it cannot me undone`}
                    successAction={handleDeleteDoctor}
                    successbtnName='Delete'
                    modalData={deletingDoctors}
                    closeModal={closeModal}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;