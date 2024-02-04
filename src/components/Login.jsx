// components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom'


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()


  const handleLogin = async () => {
    try {
      
      if (!username || !password) {
        alert('Please enter both username and password.');
        return;
      }

      const response = await axios.post('http://localhost:3000/login', { username, password });
      console.log(response,"response")
      alert(response.data.message)
      localStorage.setItem('token', response.data.token);
      navigate('/upload')
    } catch (error) {
      console.log(error)
      alert(error.response.data)
    }
  };

  const handleRegister = ()=>{
    navigate('/register')
  }

  return (
    <div className='w-[45%] p-8 border border-black mx-auto mt-[100px] flex flex-col justify-center place-items-center rounded-lg'>
      <h2 className='font-bold'>Login To Your Account</h2>
      <input  className='w-80 border border-black rounded-md p-2 mt-10' type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input  className='w-80 border border-black rounded-md p-2 mt-4' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className='w-40  mt-5 border border-black rounded-md py-1'  onClick={handleLogin}>Login</button><br />
      <div className='flex justify-between text-center items-center w-96 px-6 mt-3'>
      <span>New User?</span>
      <button className='w-40 border border-black rounded-md py-1'  onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default Login;
