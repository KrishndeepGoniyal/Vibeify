import React from 'react'
import Authservice from '../services/auth'
import { useDispatch } from 'react-redux'
import { logout } from '../features/authSlice';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';


function Logoutbtn() {
 const dispatch = useDispatch();
 const navigate  = useNavigate();

  const  handleLogout =async()=>{
    let res =  await Authservice.logout()
    if(res){
     dispatch(logout());
     navigate('/');
    }
    else {
        console.log("error in logout btn ")
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
    >
      <LogOut className="inline mr-2" size={18} />
      Logout
    </button>
  );
}

export default Logoutbtn
