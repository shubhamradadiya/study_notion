import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/common/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useSelector } from 'react-redux';

function App() {
  return (
    <div className=' w-screen min-h-screen flex flex-col font-inter bg-richblack-900'>
       <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>

        <Route path='login' 
        element={<OpenRoute> 
                  <Login/> 
             </OpenRoute>}/>

        <Route path='signup'
        element ={
          <OpenRoute>
            <Signup/>
          </OpenRoute>
        }/>


      </Routes>
    
    </div>
  );
}

const OpenRoute =({children})=>{
  const {token} = useSelector((state)=>state.auth)
  return (
     token === null ?
     (children)
     :(<Navigate to="/dashboard/my-profile" />)
  )
}



export default App;


