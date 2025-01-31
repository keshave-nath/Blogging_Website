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

const page = () => {

    // const params = useParams();

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
    // console.log("Keshave"+cookieData)

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
                            <img src={`http://localhost:5200/keshaveBlog-files/users/${prof.profile}`} className=' rounded-circle profile ' width='100%' height='100%' alt="" />
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
                    <h2 className='text-center border-bottom pb-3 my-4'>
                        Posts
                    </h2>
                </div>
                <div className='row my-3'>

                    {
                        fetchpost.map((v, i) => (
                            <div className='col-4 shadd position-relative rounded '>
                                <Link href={`/website/Singlepost/${v._id}`}>
                                    <div className='row p-2'>
                                        <div className='col-12'>
                                            <img src={`${pat}${v.thumbnail}`} className='rounded' width='100%' height={350} alt="" />
                                        </div>

                                    </div>
                                </Link>
                                {/* <HandelDeletee v={v._id}/> */}
                            </div>
                        ))
                    }



                </div>

            </div>
            <Footer />
        </>
    )
}

// function HandelDeletee(v){
//     // console.log(v);
//     const [del,setdel] =useState(false)
//     const handelDelete = ()=>{
//         setdel(!del);
//     }

//     const deletePost = async (e) => {
//         try {
//             const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/api/blogging-services/user-posts/delete-user-post/${e}`)
//             if (response.status == 200) {

//                 Swal.fire({
//                     title:"Success ",
//                     text:"Post Deleted Successfully !",
//                     icon:"success",
//                 })

//                 const indexNo = fetchpost.findIndex((v) => v._id === e);
//                 const newData = [...fetchpost]
//                 newData.splice(indexNo, 1);

//                 setfetchpost(newData);


//             }
//         }
//         catch (error) {
//             console.log(error);
//             Swal.fire({
//                 title:"Oops ",
//                 text:"Internal Server Error Try After Sometime !",
//                 icon:"error",
//             })
//         }
//     }
//     return(
//         <div className='position-absolute top-0 end-0' >
//                                      <BsThreeDotsVertical className=' fs-3' onClick={handelDelete} />
//                                      <div className='position-absolute ms-1 fw-bold '>
//                                         <div className={del==false ?'d-none':'d-flex p-1 border border-2 rounded bg-black'} style={{cursor:'pointer'}} onClick={()=>(deletePost(v.v))} >
//                                             <MdDeleteForever className='fs-4 text-danger' /> <p>Delete</p>
//                                         </div>
//                                      </div>
//                                 </div>
//     )
// }

export default page