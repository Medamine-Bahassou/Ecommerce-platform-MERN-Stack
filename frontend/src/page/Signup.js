import React, { useState } from 'react'
import loginSignupImage from '../assets/login-animation.gif'
import { BiShow, BiHide  } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { ImagetoBase64 } from '../utility/imagetoBase64';

const Signup = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [data,setData] = useState({
    firstName : "",
    lastName : "",
    email : "",
    password : "",
    confirmpassword : "",
    image : ""
  });
  // console.log(data)
  const handleShowPassword = () => {
    setShowPassword(prev => !prev)
  }
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(preve => !preve)
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

  const handleUploadProfileImage = async(e) => {
    const data = await ImagetoBase64(e.target.files[0])
    console.log(data)

    setData((preve) => {
      return {
        ...preve,
        image : data
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const {firstName, email, password, confirmpassword} = data 
    if(firstName &&  email && password && confirmpassword ){
      if(password === confirmpassword){
        alert("successfull")
        navigate("/login")
      }
      else{
        alert("password and confirm password not equals")
      }
    }
    else{
      alert("Please Enter required fields ")
    }
    
  }


  return (
    <div className='p-3 md:p-4'>
      <div className='w-full max-w-sm bg-white m-auto flex flex-col p-4'>
        <h1 className='text-center text-2xl font-bold'>Sign up</h1>
        <div className='w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative'>
          <img src={ data.image ? data.image : loginSignupImage} className='w-full h-full'/>
          <label htmlFor='profileImage' >
            <div className='absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer'>
              <p className='text-sm p-1 text-white '>Upload</p>
            </div>
          </label>
          <input type={"file"} id='profileImage' accept='image/*' className='hidden' onChange={handleUploadProfileImage} />
        </div>
        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
          <label htmlFor='firstName'> First Name</label>
          <input 
            type={'text'} 
            id="firstName" 
            name='firstName'
            className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' 
            value={data.firstName}
            onChange={handleOnChange}
            />
          
          <label htmlFor='lastName'> Last Name</label>
          <input 
            type={'text'}
            id="lastName" 
            name='lastName' 
            className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' 
            value={data.lastName}
            onChange={handleOnChange}
          />

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

          <label htmlFor='confirmpassword'> Confirm Password</label>
          <div className='flex px-2 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300'>
            <input type={ showConfirmPassword ? 'text' : 'password'} id="confirmpassword" name='confirmpassword' className='mt-1 mb-1 w-full bg-slate-200 rounded border-none outline-none' 
              value={data.confirmpassword}
              onChange={handleOnChange}            
            />
            <span className='flex text-2xl items-center cursor-pointer' onClick={handleShowConfirmPassword}>{showConfirmPassword ? <BiShow /> : <BiHide />}</span>
          </div>

          <button className='max-w-[120px] w-full m-auto cursor-pointer bg-red-500 hover:bg-red-600 text-white text-xl font-medium text-center py-1 rounded-full mt-4'>Sign up</button>
        </form>
        <p className='text-left text-sm my-2'>Already have account ? <Link to={"/login"} className='text-red-600 underline'>Login</Link></p>

      </div>
    </div>
  )
}

export default Signup
