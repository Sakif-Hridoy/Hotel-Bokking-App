import React ,{ useState ,useEffect} from 'react';

const Bookings = () => {
    const [bookings,setBookings] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/bookings')
        .then(res=>res.json())
        .then(data=> setBookings(data))
    },[])
    return (
        <div>
           <h3>You have:{bookings.length} bookings</h3> 
           {
               bookings.map(book=><li>{book.name} from: {(new Date(book.checkIn).toDateString('dd/MM/yy'))} To:{(new Date(book.checkOut).toDateString('dd/MM/yy'))}</li>)
           }
        </div>
    );
};

export default Bookings;