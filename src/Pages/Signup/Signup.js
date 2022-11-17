import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthPorvider';
import useToken from '../../hooks/useToken';

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [signupError, setSignupError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();

    if (token) {
        navigate('/')
    }


    const handleSignUp = data => {
        setSignupError('')
        createUser(data.email, data.password)
            .then(result => {

                const profile = {
                    displayName: data.name
                }
                updateUser(profile)
                    .then(() => {
                        saveUser(data.name, data.email);
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
            })
            .catch(error => {
                setSignupError(error.message);
            })

    }

    const saveUser = (name, email) => {
        const user = { name, email };

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email)
                // getUserToken(email)
            })
    }


    // const getUserToken = (email) => {
    //     fetch(`http://localhost:5000/jwt?email=${email}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.accessToken) {
    //                 localStorage.setItem('access-Token', data.accessToken)
    //                 navigate('/');
    //             }
    //         })
    // }


    return (
        <div className='h-auto lg:w-2/4 mb-10 lg:my-16 rounded-xl flex flex-col py-12 px-20 items-center shadow-lg mx-auto'>
            <h1 className='text-4xl font-bold'>Sign Up</h1>
            <form onSubmit={handleSubmit(handleSignUp)} className='w-full'>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Name</span>
                    </label>
                    <input type="text" {...register('name', {
                        required: 'Name is Required'
                    })} className="input input-bordered input-primary w-full" />
                    {errors?.name && <p className='text-red-700'>{errors?.name.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Email</span>
                    </label>
                    <input type="email"{...register('email', {
                        required: 'Email is Required'
                    })} className="input input-bordered input-primary w-full" />
                    {errors?.email && <p className='text-red-700'>{errors?.email.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Password</span>
                    </label>
                    <input type="password"{...register('password', {
                        required: 'Password is Required',
                        minLength: {
                            value: 6,
                            message: 'Password at least 6 characters '
                        }
                    })} className="input input-bordered input-primary w-full" />
                    {errors?.password && <p className='text-red-700'>{errors?.password.message}</p>}
                </div>
                {
                    signupError && <p className='text-red-700'>{signupError}</p>
                }
                <input type="submit" value='Sign Up' className='btn btn-primary w-full my-5' />
            </form>
            <p>Already Have an Account? <Link to='/login' className='text-primary'>Login</Link> </p>
            <div className="divider">OR</div>
            <button className='btn btn-outline btn-primary w-full text-white'>Continue With Google</button>
        </div>
    );
};

export default Signup;