// components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom'

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const handleRegister = async () => {
    try {   
      if (!username || !password) {
        alert('Please enter both username and password.');
        return;
      }
     const response= await axios.post('http://localhost:3000/register', { username, password });
     console.log(response)
      // Redirect to login page or display success message
      alert("User Registered Successfully")
      navigate('/')
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const handleLogin = () =>{
    navigate('/')
  }

  return (
    <div className='w-[45%] p-8 border border-black rounded-lg mx-auto mt-[100px] flex flex-col justify-center place-items-center'>
      <h2 className='font-bold'>Register User</h2>
      <input className='w-80 border border-black rounded-md p-2 mt-4' type="text"  placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input  className='w-80 border border-black rounded-md p-2 mt-5'  type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button  className='w-40  mt-6 border border-black rounded-md py-1' onClick={handleRegister}>Register</button><br />
      <div className='flex justify-between text-center items-center w-96 px-6'>
      <span >Already A User?</span>
      <button className='border border-black rounded-md p-1 w-40' onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Register;
