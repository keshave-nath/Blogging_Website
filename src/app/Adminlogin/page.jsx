'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import loginimg from '../../../public/images/login_logo.png'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Cookies from 'js-cookie'

const Adminlogin = () => {
  const nav =useRouter();
  const [eye, seteye] = useState(false);

  const handelform=async(e)=>{
    e.preventDefault();
    const formdata = {
      email: e.target.email.value,
      password: e.target.password.value
    }
    try{
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/admin/log-in`,formdata)
      
      if(response.status===200){
        Cookies.set("BlogAdmin-login",JSON.stringify(response.data.data),{expires:1})
        nav.push("/dashboard")
        // console.log(response.data)
    }
    }
    catch(error){
      console.log(error);
    }
    nav.push("/dashboard")
  }
  return (
    <div className='container-fluid d-flex justify-content-center align-items-center '>
      <form action="" onSubmit={handelform}>
        <div>
          <div className='text-center'>
            <Image src={loginimg} width={250} height={250} />
          </div>
          <div className='border p-3 lh-lg fw-bold border-2 rounded' style={{
            width: '500px',
            boxShadow: '0px 0px 10px 10px white'
          }} >
            <h1 className='text-center'>Admin Login</h1>
            <div className='my-2'>
              <label htmlFor="" className='d-block'>UserName or Email : </label>
              <input type="text" name='email' className='w-100 bg-transparent border-white text-white ps-1 rounded my-2' />
            </div>

            <div className='my-2 position-relative'>
              <label htmlFor="" className='d-block'>Password : </label>
              <input type={eye == true ? 'text' : 'password'} name='password' className='w-100 bg-transparent border-white text-white ps-1 rounded my-2' />
              <i className='position-absolute'
                style={{
                  right: '10px',
                  top: '40px',
                  cursor: 'pointer'
                }}
                onClick={() => (seteye(!eye))}
              >
                {
                  eye == true ?
                    <FaRegEye />
                    :
                    <FaRegEyeSlash />
                }

              </i>
            </div>

            <div className='text-center my-2'>
              <button className='p-2 rounded border-0 bg-success text-white fw-bold'>
                Login to Admin Panel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Adminlogin