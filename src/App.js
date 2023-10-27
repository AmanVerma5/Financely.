import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const App=()=>{
    return(
            <>
                <ToastContainer/>
                <Routes>
                    <Route path='/' element={<Signup/>}/>
                    <Route path='/dashboard' element={<Dashboard/>} />
                </Routes>
            </>
    )
}

export default App;