import React, { useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../fierbase";
import './style.css';
import { useNavigate } from "react-router-dom";
import {signOut } from "firebase/auth";
import { toast } from "react-toastify";
const Header=()=>{

    const [user, loading] = useAuthState(auth);
    const navigate=useNavigate();

    useEffect(()=>{
        if(user){
            navigate('/dashboard')
        }
    },[user,loading])

    function logoutfunc(){
        signOut(auth).then(() => {
            // Sign-out successful.
            toast.success("Sign Out Successfull!")
            navigate('/');
          }).catch((error) => {
            // An error happened.
            toast.error(error.message);
          });
          
    }

    return (
        <div className="navbar">
            <p className="logo">Financely.</p>
            {
                user && <p className="log-out" onClick={logoutfunc}>Logout</p>
            }
        </div>
    )
}

export default Header;