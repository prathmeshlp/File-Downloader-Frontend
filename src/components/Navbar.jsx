import React from "react";
import {useNavigate} from 'react-router-dom'

const Navbar = () => {

const navigate = useNavigate();


  const token = !!localStorage.getItem("token");
  console.log(token,"tpken")


  const handleLogOut  = ()=>{
    localStorage.clear();
    navigate('/')
  }


  return (
    <nav className="w-full h-24 bg-transparent px-8 py-6 flex justify-between border border-black">
      <img
        className="w-[250px] h-16"
        src="\src\assets\Mobigic Logo.svg"
        alt="mobigic_logo"
      />
      {token ? (
        <button onClick={handleLogOut} className="border border-black rounded-md p-1 w-40 h-10 mr-10 bg-white">
          LogOut
        </button>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Navbar;
