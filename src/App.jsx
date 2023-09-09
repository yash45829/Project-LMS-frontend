import { Route, Routes } from 'react-router-dom'
import './App.css'
import AboutUs from './Pages/AboutUs'
import HomePage from './Pages/HomePage'

function App() {
// routing here 
  return (
  <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/about' element={<AboutUs/>}/>
  </Routes>
  )
}

export default App
