import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

// function Read() {
//     const {firstname}=useParams();
//     const [student,setStudent]=useState(null)
//     useEffect(()=>{
//         axios.get('http://localhost:8081/read/'+firstname)
//         .then(res=>{
//             console.log(res)
//             setStudent(res.data);
//         })
//         .catch(err=>console.log(err))
//     },[])
//   return (
//     <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
//         <div className='w-50 bg-white rounded p-3'>
//             <h2>Student Details</h2>
//             <h2>{student[0].firstname}</h2>
//             <h2>{student[0].lastname}</h2>
//             <h2>{student[0].email}</h2>
//             <Link to="/" className='btn btn-primary me-2'>Back</Link>
//             <button className='btn btn-info'>Edit</button>
//         </div>
//     </div>
//   )
// }

function Read() {
    const { firstname } = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8081/read/' + firstname)
            .then(res => {
                console.log(res);
                setStudent(res.data);
            })
            .catch(err => console.log(err));
    }, [firstname]);

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <h2>Student Details</h2>
                {student && student.length > 0 && (
                    <>
                        <h2>{student[0].firstname}</h2>
                        <h2>{student[0].lastname}</h2>
                        <h2>{student[0].email}</h2>
                    </>
                )}
                <Link to="/" className='btn btn-primary me-2'>Back</Link>

            </div>
        </div>
    );
}

export default Read