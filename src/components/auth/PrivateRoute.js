// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Adjust this to your token storage mechanism

    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const decodedToken = jwtDecode(token);

        // Check if the token is expired
        const currentTime = Date.now() / 1000; // in seconds
        if (decodedToken.exp < currentTime) {
            // Token has expired
            localStorage.removeItem('token'); // Optionally remove the expired token
            return <Navigate to="/login" />;
        }

        // Optionally, you can add more validation logic here if needed
        return children;
    } catch (error) {
        // Token is invalid
        console.error('Invalid token:', error);
        localStorage.removeItem('token'); // Optionally remove the invalid token
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;