import Home from "./components/pages/Home/Home";
import Login from './components/pages/Login/Login'
import { Routes, Route, useNavigate } from "react-router-dom";
import Player from "./components/pages/Player/Player";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./firebase";
import { ToastContainer, toast } from 'react-toastify';

function App() {

  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) =>{
      if(user){

        console.log('logged in');
        navigate('/')
      }else{
        console.log('logged out');
        navigate('/login')
      }
    })
  },[])
  return (
    <div>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </div>
  );
}

export default App;
