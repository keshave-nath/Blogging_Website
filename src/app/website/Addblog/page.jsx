'use client'
import { ContextAPI } from '@/app/context/Maincontext';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import Header from '../component/Header';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
// import Header from '../component/Header'

const page = () => {

  const nav = useRouter();
  const [imgPres, setImgPres] = useState({});
  const [Userr, SetUserr] = useState([]);
  let { user } = useContext(ContextAPI)

  const handleFileSelect = (e) => {
    SetUserr(user._id);
    const fieldname = e.target.name;

    const reader = new FileReader();

    const file = e.target.files[0];

    if (file) {
      reader.readAsDataURL(file);
    }

    reader.onload = () => {
      // setImgPres({...imgPres,fieldname: reader.result })

      setImgPres((prevState) => ({ ...prevState, [fieldname]: reader.result }));
      // SetAdminData((prevState)=>({...prevState, [fieldname]:reader.result}));
    }

  };

  const handeladdPost = async (e) => {
    e.preventDefault();
    // const datas = e.target;
    const data = new FormData(e.target);
    data.append('userr', (Userr));
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/blogging-services/user-posts/add-user-post`, data)
      if (response.status != 200) {
        Swal.fire({
          title: "Error",
          text: "Something Went Wrong !",
          icon: "error"
        })
      }
      if (response.status == 200) {
        Swal.fire({
          title: "Success",
          text: "Blog Added Successfull",
          icon: "success"
        }).then((res)=>(
          nav.push('/website/Index')
        ))
      }
      // console.log(e.target)
    }
    catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Something Went Wrong !",
        icon: "error"
      })
    }
  }
  // console.log(user)

  return (
    <>
      <Header />
      <div className='w-100 py-4 d-flex justify-content-center align-items-center backk'
        style={{
          // height:'100vh'
        }}
      >
        <div className='container col-12 col-lg-6 mb-1 p-5 rounded'
          style={{
            boxShadow: '0px 0px 10px 8px white'
          }}
        >
          <div>
            <h1 className='text-center text-white'>ADD YOUR BLOG !!</h1>
          </div>
          <form onSubmit={handeladdPost} >
            <label htmlFor="" className='fw-bold fs-4 text-white'>
              IMAGE :
            </label>
            <div className='w-50 text-white my-3 '>
              <img src={imgPres.thumbnail} alt="Thumbnail " className='p-1' width='100%' />
            </div>
            <input type="file" name='thumbnail' onChange={handleFileSelect} placeholder='Enter Your Title' className='d-block w-100 bg-white text-black rounded border-0 my-3 p-1' />
            <label htmlFor="" className='fw-bold fs-4 text-white'>
              TITLE :
            </label>
            <input type="text" name='title' placeholder='Enter Your Title' className='d-block w-100 rounded border-0 my-3 p-1' />

            <label htmlFor="" className='fw-bold fs-4 text-white'>
              CAUTION :
            </label>
            <input type="text" name='caution' placeholder='Enter The Caution' className='d-block w-100 rounded border-0 my-3 p-1' />

            <label htmlFor="" className='fw-bold fs-4 text-white'>
              LOCATION :
            </label>
            <input type="text" name='location' placeholder='Enter Your Location' className='d-block w-100 rounded border-0 my-3 p-1' />

            <label htmlFor="" className='fw-bold fs-4 text-white'>
              DETAILS :
            </label>
            <textarea name="detail" placeholder='Enter Your Trip Experience' maxLength={630} id="" className='d-block w-100 rounded border-0 my-3 p-1' ></textarea>

            <button className='text-white butt border-0 w-100 p-1 rounded fw-bold fs-3 mt-5'>
              ADD Your Blog
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default page