import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const imageHostingKey = process.env.REACT_APP_imagebb_key;

    const { data: specialities, isLoading } = useQuery({
        queryKey: ['speciality'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/appointmentSpecialty')
            const data = await res.json()
            return data
        }
    })

    const handleAddDoctor = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);

        const url = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        image: imgData.data.url
                    }

                    // save doctor to database...............
                    fetch('http://localhost:5000/doctors', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('access-Token')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(result => {
                            toast.success(`${data.name} is added Successfully`);
                            navigate('/dashboard/managedoctors')
                        })
                }
            })

    }

    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <div className='mx-14 flex-1 p-16'>
            <div className="text-3xl font-semibold text-center">Add A Doctor</div>
            <form onSubmit={handleSubmit(handleAddDoctor)} className='w-full'>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Name</span>
                    </label>
                    <input type="text" {...register('name', {
                        required: 'Name is Required'
                    })} className="input input-bordered input-primary w-full" />
                    {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Email</span>
                    </label>
                    <input type="email"{...register('email', {
                        required: 'Email is Required'
                    })} className="input input-bordered input-primary w-full" />
                    {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Speciality</span>
                    </label>
                    <select {...register('specialty', { required: 'Specialty is Required' })} className="select select-info w-full">
                        {
                            specialities.map(speciality => <option
                                key={speciality._id}
                                value={speciality.name}
                            >{speciality.name}</option>)
                        }
                    </select>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Photo</span>
                    </label>
                    <input type="file" {...register('image', {
                        required: 'Photo is Required'
                    })} className="input w-full" />
                    {errors.img && <p className='text-red-600'>{errors.image?.message}</p>}
                </div>
                <input type="submit" value='Sign Up' className='btn btn-primary w-full my-5' />
            </form>
        </div>
    );
};

export default AddDoctor;