'use client'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const Page = () => { // Renamed from page to Page
  const nav = useRouter();
  const [otp, setotp] = useState(false);
  const [btntext, setbtntext] = useState("Send OTP");
  const [forget, setforget] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const handlegenerateotp = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/blogging-services/user/generate-otp`, {
        email: e.target.email.value
      })
      if (response.status == 200) {
        Swal.fire({
          title: "Success",
          text: "OTP sent Successfully",
          icon: "success"
        })
        setIsLoading(false)
        setforget(true)
        setotp(true)
        let otptimer = 60
        setbtntext(`Resend OTP IN ${otptimer}`)
        const timerInterval = setInterval(() => {
          otptimer--
          setbtntext(`Resend OTP IN ${otptimer}'s`)
          if (otptimer === 0) {
            clearInterval(timerInterval)
            setotp(false)
            setforget(false)
            setbtntext("Send OTP")
          }
        }, 1000)
      }
      if (response.status != 200) {
        Swal.fire({
          title: "Error",
          text: "Something Went Wrong !",
          icon: "error"
        })
        setIsLoading(false)
      }
    }
    catch (error) {
      console.log(error)
      setIsLoading(false)
      Swal.fire({
        title: "Error",
        text: "Internal Server Error !",
        icon: "error"
      })
    }
  }

  const updatePassword = async (e) => {
    e.preventDefault();
    const newvalues = {
      email: e.target.email.value,
      userotp: e.target.otp.value,
      password: e.target.newpassword.value
    }
    setIsLoading(true)
    try {
      if (!window.confirm("Do you want to update this Password")) return

      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/blogging-services/user/update-password`, newvalues);
      if (response.status != 200) {
        setIsLoading(false)
        Swal.fire({
          title: "Error",
          text: "Something Went Wrong !",
          icon: "error"
        })
      }
      if (response.status == 200) {
        setIsLoading(false)
        Swal.fire({
          title: "Success",
          text: "Password Changed Successfully",
          icon: "success"
        })
        if (Cookies) {
          Cookies.remove("Blogging_User")
          nav.push("/")
        }
        else {
          nav.push("/")
        }
      }
    }
    catch (error) {
      console.log(error)
      setIsLoading(false)
      Swal.fire({
        title: "error",
        text: "Internal Server Error",
        icon: "error"
      })
    }
  }

  return (
    <div className='w-100 d-flex back justify-content-center align-items-center' style={{ height: '100vh' }}>
      <div className='px-3 py-2 rounded bg-dark text-white' style={{ maxWidth: '90%', boxShadow: '0px 0px 10px 10px black' }}>
        <span className='text-center mb-2 fw-bold fs-1 fs-md-5'>Forgot Password ?</span>
        <div>
          {
            forget == false ? (
              <form onSubmit={handlegenerateotp}>
                <div>
                  <h5>Enter Your Email !</h5>
                  <input type="email" name="email" placeholder='Enter your Email' className='w-100 p-2 my-2' />
                  <div>
                    {isLoading ? (
                      <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <button type='submit' className='border-0 bg-primary fw-bold text-white p-2 w-100 rounded my-3'>
                        Send OTP
                      </button>
                    )}
                  </div>
                  <p className='fw-bold text-secondary text-center'>Powered By AK</p>
                </div>
              </form>
            ) : (
              <form onSubmit={updatePassword}>
                <div>
                  <h5>Enter Your Email !</h5>
                  <input type="email" name="email" placeholder='Enter your Email' className='w-100 p-2 my-2' />
                  <div>
                    <h5>Enter OTP</h5>
                    <input type="text" name='otp' placeholder='Enter OTP' className='w-100 p-2 my-2' />
                    <h5>Enter Your New Password</h5>
                    <input type="text" name='newpassword' placeholder='Enter Your New Password' className='w-100 p-2 my-2' />
                  </div>
                  <div className='d-flex'>
                    <button type='button' disabled style={{ width: '170px' }} className='border-0 me-2 bg-secondary p-2 text-white fw-bold rounded my-2'>
                      {btntext}
                    </button>
                    {isLoading ? (
                      <div className="text-center p-2" style={{ width: '170px' }}>
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <button type='submit' style={{ width: '170px' }} className='border-0 bg-success p-2 text-white fw-bold rounded my-2'>
                        SUBMIT
                      </button>
                    )}
                  </div>
                  <p className='fw-bold text-secondary text-center'>Powered By AK</p>
                </div>
              </form>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Page; // Updated export statement
