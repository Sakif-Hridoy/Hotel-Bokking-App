import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    // Methods to read/detect "Token" from the back end to secure/prevent anonymous login
    // headers may be contains both server and clients data,req,response
    // Its a dynamic system to secure a users data via token
    useEffect(() => {
        fetch('http://localhost:5000/bookings?email=' + loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })

            .then(res => res.json())
            .then(data => setBookings(data));
    }, [])
    return (
        <div>
            <h3>You have:{bookings.length} bookings</h3>
            {
                bookings.map(book => <li>{book.name} from: {(new Date(book.checkIn).toDateString('dd/MM/yy'))} To:{(new Date(book.checkOut).toDateString('dd/MM/yy'))}</li>)
            }
        </div>
    );
};

export default Bookings;