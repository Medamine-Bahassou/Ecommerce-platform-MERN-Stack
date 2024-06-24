import React, { useState } from 'react'
import loginSignupImage from '../assets/login-animation.gif'
import { BiShow, BiHide  } from "react-icons/bi";
import { Link } from 'react-router-dom';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [data,setData] = useState({
      email : "",
      password : "",
    });
    console.log(data)
    const handleShowPassword = () => {
      setShowPassword(prev => !prev)
    }
    const handleOnChange = (e) => {
      const {name, value} = e.target 
      setData((preve) => {
        return {
          ...preve,
          [name] : value 
        }
      })
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
  
      const {firstName, email, password, confirmpassword} = data 
      if(firstName &&  email && password && confirmpassword ){
        
      }
      else{
        alert("Please Enter required fields ")
      }
      
    }
  
  
  return (
    <div className='p-3 md:p-4'>
      <div className='w-full max-w-sm bg-white m-auto flex flex-col p-4'>
        <h1 className='text-center text-2xl font-bold'>Sign up</h1>
        <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto'>
          <img src={loginSignupImage} className='w-full'/>
        </div>
        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
          
          <label htmlFor='email'> Email</label>
          <input type={'email'} id="email" name='email' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300'
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor='password'> Password</label>
          <div className='flex px-2 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300'>
            <input type={ showPassword ? 'text' : 'password'} id="password" name='password' className='mt-1 mb-1 w-full bg-slate-200 rounded border-none outline-none' 
              value={data.password}
              onChange={handleOnChange}
            />
            <span className='flex text-2xl items-center cursor-pointer' onClick={handleShowPassword}>{showPassword ? <BiShow /> : <BiHide />}</span>
          </div>


          <button className='max-w-[120px] w-full m-auto cursor-pointer bg-red-500 hover:bg-red-600 text-white text-xl font-medium text-center py-1 rounded-full mt-4'>Sign up</button>
        </form>
        <p className='text-left text-sm my-2'>Don't have account ? <Link to={"/signup"} className='text-red-600 underline'>Sign up</Link></p>
        <p className='text-left text-sm my-2'>Forgot the password ? <Link to={""} className='text-red-600 underline'>yes</Link></p>

      </div>
    </div>
  )
}

export default Login
