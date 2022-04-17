
import './App.css'
import {Routes, Route , Link} from 'react-router-dom'
import Home from './component/Home'
import Knowmore from './component/Knowmore'
import Login from './component/Login'

function App() {


  return (
    <div className="App">
     
     <div className='navbar'>
         <Link to={"/"}><h3>Resident Management System</h3></Link> 
         <Link to={"/login"}><div className='loginbtn'>Add member</div></Link> 

     </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/knowmore/:id" element={<Knowmore />} />
        <Route path='/login' element={<Login />}/>
      </Routes>

    </div>
  )
}

export default App
