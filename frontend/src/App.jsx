import { useState } from 'react'
import Login from './Pages/Auth/Login'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Feed from './Pages/Global/Feed'
import Registro from './Pages/Auth/Registro/Registro'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path='/login' index element={<Login />} />
        <Route path='/registro' index element={<Registro />} />
        <Route path='/' element={<Feed />} />
      </Routes>
    </>
  )
}

export default App