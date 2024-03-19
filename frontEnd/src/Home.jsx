import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
function Home() {
    const [data,setData]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:8081/')
        .then(res=>setData(res.data))
        .catch(err=>console.log(err));
    },[])
    const handleDelete =(firstname)=>{
        axios.delete('http://localhost:8081/delete/'+firstname)
        .then(res=>{
            location.reload();

        })
        .catch(err=>console.log(err))
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <h2>Students List</h2>
            <div className='d-flex justify-content-end mr-4'>
            <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic pr-4">
        Export
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="http://localhost:8081/export-to-pdf">Export-To-PDF</Dropdown.Item>
        <Dropdown.Item href="http://localhost:8081/export-to-excel">Export-To-Excel</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
                
                <Link to="/create" className='btn btn-success'>Create+</Link>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>firstname</th>
                        <th>secondname</th>
                        <th>email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((students,index)=>{
                        return <tr key={index}>
                            <td>{students.firstname}</td>
                            <td>{students.lastname}</td>
                            <td>{students.email}</td>
                            <td>
                                <Link to={`/read/${students.firstname}`} className='btn btn-sm btn-info'>Read</Link>
                                <Link to={`/edit/${students.firstname}`}  className='btn btn-sm btn-primary mx-2'>Edit</Link>
                                <button onClick={ ()=>handleDelete(students.firstname)} className='btn btn-sm btn-danger'>Delete</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Home