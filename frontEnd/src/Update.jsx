import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
    const { firstname } = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        email: ''
    });

    useEffect(() => {
        axios.get('http://localhost:8081/read/' + firstname)
            .then(res => {
                const { firstname, lastname, email } = res.data[0];
                setValues({ firstname, lastname, email });
            })
            .catch(err => console.log(err));
    }, [firstname]);

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8081/update/' + firstname, values)
            .then(res => {
                console.log(res);
                // Display success message or any notification here if needed
                navigate('/');
            })
            .catch(err => {
                console.error(err);
                // Display error message to the user
            });
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleUpdate}>
                    <h2>Update Student Details</h2>
                    <div className='mb-2'>
                        <label htmlFor='firstname'>First Name</label>
                        <input type='text' id='firstname' placeholder='Enter First Name' className='form-control' value={values.firstname} onChange={e => setValues({ ...values, firstname: e.target.value })} required />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='lastname'>Last Name</label>
                        <input type='text' id='lastname' placeholder='Enter Last Name' className='form-control' value={values.lastname} onChange={e => setValues({ ...values, lastname: e.target.value })} required />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' placeholder='Enter Email' className='form-control' value={values.email} onChange={e => setValues({ ...values, email: e.target.value })} required />
                    </div>
                    <button type='submit' className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default Update;
