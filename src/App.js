import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/common/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useSelector } from 'react-redux';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';

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

       <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        /> 

        <Route 
        path='forgot-password'
        element = {
          <OpenRoute>
            <ForgotPassword />
          </OpenRoute>
        }
      />

      <Route
       path='update-password/:id'
       element={
        <OpenRoute>
          <UpdatePassword/>
        </OpenRoute>
       }
       />
        
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


