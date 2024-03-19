import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import Create from './Create'
import Read from './Read'
import Update from './Update'


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
       <Route path='/' element={<Home/>}></Route>
       <Route path='/create' element={<Create/>}></Route>
       <Route path='/read/:firstname' element={<Read/>}></Route>
       <Route path='/edit/:firstname' element={<Update/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}
