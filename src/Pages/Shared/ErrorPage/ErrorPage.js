import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div>
            <p className='text-4xl font-semibold'>Somthing went wrond!!!!</p>
            <p className='text-xl font-semibold text-red-600'>{error.statusText || error.message}</p>
        </div>
    );
};

export default ErrorPage;