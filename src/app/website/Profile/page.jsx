'use client'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import Link from 'next/link'
import { ContextAPI } from '@/app/context/Maincontext'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useParams } from 'next/navigation'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdDeleteForever } from 'react-icons/md'
import Swal from 'sweetalert2'

const Page = () => {

    let { user, setUser } = useContext(ContextAPI)
    const [pat,setpat]=useState([])
    const [fetchpost, setfetchpost] = useState([])
    const [prof,setprof] = useState([])
    

    let cookieData = Cookies.get('Blogging_User')
    if (cookieData) {
        cookieData = JSON.parse(cookieData)
    }

    const handelProfile = async()=>{
        try {
            setprof(cookieData)
        }
        catch (error) {
            console.log(error);
            Swal.fire({
                title:"Oops ",
                text:"Internal Server Error Try After Sometime !",
                icon:"error",
            })
        }
    }

    const fetchuserPost = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/blogging-services/user-posts/fetch-user-post/${cookieData._id}`)
            if (response.status != 200) {
                Swal.fire({
                    title:"Oops ",
                    text:"Something went wrong !",
                    icon:"error",
                })
            }
            if (response.status == 200) {
                setfetchpost(response.data.data)
                setpat(response.data.file_Path)
                
            }

        }
        catch (error) {
            console.log(error);
            Swal.fire({
                title:"Oops ",
                text:"Internal Server Error Try After Sometime !",
                icon:"error",
            })
        }
    }

    

    useEffect(() => { fetchuserPost(); handelProfile(); }, [])

    return (
        <>
            <Header />
            <div className="container my-3">

                <div className='row m-2'>
                    <div className='col-12 col-lg-3 d-flex justify-content-center align-items-center'>
                        <div className='rounded-circle '
                            style={{
                                width: '300px',
                                height: '300px'
                            }}
                        >
                            <img src={`${prof.profile}`} className=' rounded-circle profile ' width='100%' height='100%' alt="profile" />
                        </div>
                    </div>
                    <div className='col-12 col-lg-9 lh-lg'>
                        <div className='my-3 d-flex justify-content-between'>
                            <h3>
                                {prof.username}
                            </h3>
                            <h3>
                                Total Posts : {fetchpost.length}
                            </h3>   
                        </div>
                        <div className='my-3 text-secondary fs-5 fw-semibold '>
                            <p>
                                {prof.name}
                            </p>
                            <p>
                                {prof.type} !!
                            </p>
                        </div>
                        <div
                            className='fw-semibold lh-sm'
                            style={{
                                textAlign: 'justify'
                            }}
                        >
                            <p>
                                {prof.bio}
                            </p>

                        </div>
                    </div>
                </div>
                <div>
                    <h2 className='text-center border-bottom pb-3 my-4'>
                        Posts
                    </h2>
                </div>
                <div className='row my-3'>

                    {
                        fetchpost.map((v, i) => (
                            <div className='col-12 col-lg-4 shadd position-relative rounded ' key={v._id} >
                                <Link href={`/website/Singlepost/${v._id}`}>
                                    <div className='row p-2'>
                                        <div className='col-12'>
                                            <img src={`${v.thumbnail}`} className='rounded' width='100%' height={350} alt="thumbnail" />
                                        </div>

                                    </div>
                                </Link>
                            </div>
                        ))
                    }



                </div>

            </div>
            <Footer />
        </>
    )
}
export default Page