"use client"
import React, { useEffect, useState } from 'react'
import '../dashboard.css'
import { IoReorderThreeOutline } from "react-icons/io5";
import { IconContext } from 'react-icons';
import { Button, ListGroup } from 'react-bootstrap';
import { LuBell } from "react-icons/lu";
import { IoMailOpenOutline } from "react-icons/io5";
import { IoMdCheckboxOutline } from "react-icons/io";
import { FaLock, FaRegMessage } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa6";
import { GrDocument } from "react-icons/gr";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Headers() {
  const nav = useRouter()
  const [proo, setproo] = useState(false)
  const [profile, setprofile] = useState([])

  let handlepro = () => {
    setproo(!proo)
  }

  const checkedifloggedin = () => {
    let cookiedata = Cookies.get("BlogAdmin-login");
    if (!cookiedata) {
      nav.push("/Adminlogin")
    } else {
      cookiedata = JSON.parse(cookiedata)
      setprofile(cookiedata)
    }
  }

  const handlelogout = () => {
    Cookies.remove("BlogAdmin-login")
    nav.push("/Adminlogin")
  }

  useEffect(() => {
    checkedifloggedin();
  }, []) // Added dependency

  return (
    <div className='bg-dark w-100 text-white '>
      <div className='w-100 border-start border-end d-flex justify-content-between'>
        <div className='w-25 p-2 my-1 d-flex'>
          <div className=''>
            <IconContext.Provider value={{ size: "3em", className: "global-class-name" }}>
              <IoReorderThreeOutline />
            </IconContext.Provider>
          </div>
          <div className='p-2 my-1 mx-2'>
            Dashboard
          </div>
        </div>
        <div>
          <div>
            <div className='imgg-r'>
              <img src={`${process.env.NEXT_PUBLIC_SERVER}/keshaveBlog-files/admin/${profile.map((v) => v.profile)}`} onClick={handlepro} className='w-100' alt='profile' />
            </div>
            <div className={`border-start pro ${proo == true ? 'd-block' : 'd-none'} border-end border-bottom my-4 rounded-top`}>
              <div className='bgg fw-bold  py-2 px-3'>
                <Link href='/dashboard/profile'>
                  <IoPersonSharp />
                  &nbsp;
                  Profile
                </Link>
              </div>
              <div className='bggg fw-bold  py-2 px-3' onClick={handlelogout}>
                <FaLock />
                &nbsp;
                Log-Out
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}