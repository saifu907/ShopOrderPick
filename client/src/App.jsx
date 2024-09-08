import './App.css'

import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import WishCart from './components/WishCart'
import Navbar from './components/Navbars'
import Navbars from './components/Navbars'


function App() {
  
  
  return (
    <>



    <Routes>
      <Route path='/*' element={<Home/>}/>
      


    </Routes>
    




    

     
    </>
  )
}

export default App
