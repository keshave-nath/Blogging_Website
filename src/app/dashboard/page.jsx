'use client'
import React from 'react'
import { Accordion } from 'react-bootstrap'
import Headers from './header/Headers';
import Link from 'next/link';

export default function page() {
  return (
    <div>
      <Headers />
      <div className=''>
        <div className='p-2 border-top border-bottom border-end'>
          <ul className=' list-unstyled d-flex gap-2 mx-3'>
            <Link className='text-decoration-none' href='/dashboard' ><li className='text-info'>Home</li></Link>
            <li>/</li>
            <li>Dashboard</li>
          </ul>
        </div>
        <div className='p-2'>
          <h1 className='text-center mt-5'>
            Welcome to Admin Panel
          </h1>
          <div className='d-flex justify-content-center mt-5' >
            <div className='bg-white w-25 ps-5'>
            <img class="" src='https://i.pinimg.com/originals/bc/9e/4a/bc9e4a15c3b226b8914e57e543defe9e.png' width='200px' height='200px' />
            </div>
            
          </div>
          <h3 className='text-center mt-5'>
            Created By Keshave Nath
          </h3>
        </div>
      </div>
    </div>
  )
}
