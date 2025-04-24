import './App.css'
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from './pages/home'
import Login from './pages/login'
import Gallery from './pages/Gallery'
import {ToastContainer} from 'react-toastify'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import News from './pages/News'
import AdminPage from './pages/admin/adminPage'
import StudentDetails from './pages/admin/studentDetails'

function App() {


  return (   
  <BrowserRouter>
    <ToastContainer/>
    <Routes path="/*">
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
   <Route path='/register' element={<Register/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/settings' element={<Settings/>}/>
    <Route path='/gallery' element={<Gallery/>}/>
    <Route path='/news' element={<News/>}/>
    <Route path='/admin/*' element={<AdminPage/>}/>
    <Route path='/student/StudentDetails' element={<StudentDetails/>}/>
   </Routes>
   </BrowserRouter>
    
      
  )
}

export default App
