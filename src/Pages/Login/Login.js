import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthPorvider';
import useToken from '../../hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('')
    const { login } = useContext(AuthContext);
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail)
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";


    if (token) {
        navigate(from, { replace: true })
    }


    const handleLogin = data => {
        setLoginError('')

        login(data.email, data.password)
            .then(result => {
                // getUserToken(data.email);
                setLoginUserEmail(data.email)
            })
            .catch(error => {
                console.log(error.message);
                setLoginError(error.message)
            })
    }

    // const getUserToken = (email) => {
    //     fetch(`http://localhost:5000/jwt?email=${email}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.accessToken) {
    //                 localStorage.setItem('access-Token', data.accessToken)
    //                 navigate(from, { replace: true })
    //             }
    //         })
    // }



    return (
        <div className='h-auto lg:w-2/4 mb-10 lg:my-16 rounded-xl flex flex-col py-12 px-20 items-center shadow-lg mx-auto'>
            <h1 className='text-4xl font-bold'>Login</h1>
            <form onSubmit={handleSubmit(handleLogin)} className='w-full'>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Email:</span>
                    </label>
                    <input type="text"
                        {...register("email", {
                            required: 'Email is Required'
                        })}
                        className="input input-bordered input-primary w-full" />
                    {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Password:</span>
                    </label>
                    <input type="password"
                        {...register("password", {
                            required: "Password is Required",
                            minLength: {
                                value: 6,
                                message: "Password at least 6 characters or longer"
                            }
                        })}
                        className="input input-bordered input-primary w-full" />
                    {errors.password && <p className='text-red-600'>X {errors.password?.message}</p>}
                    <Link><p className='text-sm mt-2'>Forgot Password?</p></Link>
                </div>
                {loginError && <p className='text-red-500 font-semibold'>{loginError}</p>
                }
                <input type="submit" value='Login' className='btn btn-primary w-full my-5' />
            </form>
            <p>New to doctors Porta? <Link to='/signup' className='text-primary'>Create New Account</Link> </p>
            <div className="divider">OR</div>
            <button className='btn btn-outline btn-primary w-full text-white'>Continue With Google</button>
        </div>
    );
};

export default Login;