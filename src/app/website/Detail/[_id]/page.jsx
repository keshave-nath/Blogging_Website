'use client'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../component/Header'
import Footer from '../../component/Footer'
import Link from 'next/link'
import { ContextAPI } from '@/app/context/Maincontext'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useParams } from 'next/navigation'

const page = () => {

    const params = useParams();

    let { user, setUser } = useContext(ContextAPI)
    const [pat,setpat]=useState([])
    const [fetchpost, setfetchpost] = useState([])
    const [prof,setprof] = useState([])
    // let cookieData = Cookies.get('Blogging_User')
    // if (cookieData) {
    //     cookieData = JSON.parse(cookieData)
    // }
    const fetchuserPost = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/blogging-services/user-posts/fetch-user-post/${params._id}`)
            if (response.status != 200) {
                alert("error")
            }
            if (response.status == 200) {
                setfetchpost(response.data.data)
                setpat(response.data.file_Path)
                setprof(response.data.data[0].userr)
            }

        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { fetchuserPost(); }, [])
    // console.log(prof)

    return (
        <>
            <Header />
            <div className="container my-3"
            // style={{
            //     height:'100vh'
            // }}
            >

                <div className='row'>
                    <div className='col-3 d-flex justify-content-center align-items-center'>
                        <div className='rounded-circle '
                            style={{
                                width: '300px',
                                height: '300px'
                            }}
                        >
                            <img src={`${process.env.NEXT_PUBLIC_SERVER}/keshaveBlog-files/users/${prof.profile}`} className=' rounded-circle profile ' width='100%' height='100%' alt="profile" />
                        </div>
                    </div>
                    <div className='col-9 lh-lg'>
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
                    <h2 className='text-center my-4'>
                        Posts
                    </h2>
                </div>
                <div className='row my-3'>

                    {
                        fetchpost.map((v, i) => (
                            <div className='col-4 shadd rounded'>
                                <Link href={`/website/Singlepost/${v._id}`}>
                                    <div className='row p-2 '>
                                        <div className='col-12 rounded'>
                                            <img src={`${pat}${v.thumbnail}`} className='rounded' width='100%' height={350} alt="thumbnail" />
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

export default page