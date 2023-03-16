import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Login = () => {
    const [credentials,setCredentials]=useState({
        email:"",
        password:""
    })

    const navigate=useNavigate()

    const {loading,error,dispatch}=useContext(AuthContext)

     const handleChange=(e)=>{
        setCredentials(creden=>({...creden,[e.target.name]:e.target.value}))
     }
     const handleLogin=async(e)=>{
        e.preventDefault()
        dispatch({type:"LOIN_START"})
        try{
            const res=await axios.post("http://localhost:3500/api/auth/login",credentials)
            dispatch({type:"LOGIN_SUCCESS",payload:res.data})
            navigate("/")
        }
        catch(err){
            dispatch({type:"LOGIN_FAILURE",payload:err.response.data})
        }

     }
  return (
    <div className="login">
        <div className="lContainer">
            <input type="email" placeholder='email' id="email" onChange={handleChange} name="email" className="lInput" />
            <input type="password" placeholder='password' id="password" onChange={handleChange} name="password" className="lInput" />
            <button disabled={loading} className="lButton" onClick={handleLogin}>Login</button>
            {error && <span>{error.message}</span>}
        </div>
    </div>
  )
}

export default Login
