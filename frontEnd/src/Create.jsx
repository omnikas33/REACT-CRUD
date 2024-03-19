import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Create() {
    const [values,setValues]=useState({
        firstname:'',
        lastname:'',
        email:''
    })
    const navigate = useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:8081/contacts',values)
        .then(res=>{
            console.log(res);
            navigate('/')
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-dark rounded p-3'> 
            <form onSubmit={handleSubmit}>
                <h2 className='bg-black'>Add Student</h2>
                <div className='mb-2'>
                    <label htmlFor=''>firstname</label>
                    <input type='text' placeholder='Enter firstName' className='form-control' onChange={e=>setValues({...values,firstname:e.target.value})}></input>
                </div>
                <div className='mb-2'>
                    <label htmlFor=''>lastname</label>
                    <input type='text' placeholder='Enter 2Name' className='form-control' onChange={e=>setValues({...values,lastname:e.target.value})}></input>
                </div>
                <div className='mb-2'>
                    <label htmlFor=''>Email</label>
                    <input type='text' placeholder='Enter email' className='form-control' onChange={e=>setValues({...values,email:e.target.value})}></input>
                </div>
                <button className='btn btn-success'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Create