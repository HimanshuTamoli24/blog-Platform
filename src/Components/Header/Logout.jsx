import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../AppWrite/auth';
import { logout } from '../../store/authSlice';

function Logout() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        authService.logout()
            .then(() => {
                dispatch(logout());
            })
            .catch((error) => {
                console.error("Logout failed", error);
            });
    };

    return (
        <button className='px-4 py-2 bg-red-500 text-white rounded' type="button" onClick={handleLogout}>
            Logout
        </button>
    );
}

export default Logout;
