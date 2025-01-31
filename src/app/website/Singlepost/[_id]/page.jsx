'use client'
import React, { useContext, useEffect, useState } from 'react'
// import Header from '../component/Header'
import Footer from '../../component/Footer'
import Link from 'next/link'
import { FaCommentDots, FaLocationDot, FaRegCommentDots, FaRegHeart } from 'react-icons/fa6'
import { FaShareAlt } from "react-icons/fa";
import logo from '../../../../../public/images/login_logo.png';
import { BsHeart, BsHeartFill, BsThreeDotsVertical } from 'react-icons/bs'
import { IoSend } from "react-icons/io5";
import Image from 'next/image'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Header from '../../component/Header'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { ContextAPI } from '@/app/context/Maincontext'
import { MdDeleteForever } from 'react-icons/md'
import { TbMessageReport } from 'react-icons/tb'
import Swal from 'sweetalert2'


const page = () => {

    const params = useParams();
    const nav = useRouter();
    // console.log(params)
    const [report, setreport] = useState(false)
    const [like, setlike] = useState(false)
    const [comment, setcomment] = useState(false)
    const [modalShow, setModalShow] = React.useState(false);
    const [fetchSingle, setfetchSingle] = useState([])
    const [pat, setpat] = useState([])
    const [prof, setprof] = useState([])
    // let prof = []

    const fetchuserPost = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/blogging-services/user-posts/fetch-single-post/${params._id}`)
            if (response.status != 200) {
                alert("error")
            }
            if (response.status == 200) {
                setfetchSingle(response.data.data)
                setpat(response.data.file_Path)
                // prof.push(response.data.data.userr)
                // setprof()
                setprof(response.data.data.userr)
            }

        }
        catch (error) {
            console.log(error)
        }
    }

    const [del, setdel] = useState(false)
    const handelDelete = () => {
        setdel(!del);
    }

    const deletePost = async (e) => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/api/blogging-services/user-posts/delete-user-post/${e}`)
            if (response.status == 200) {

                Swal.fire({
                    title: "Success ",
                    text: "Post Deleted Successfully !",
                    icon: "success",
                }).then((res)=>(
                    nav.push('/website/Profile')
                ))

                // const indexNo = fetchpost.findIndex((v) => v._id === e);
                // const newData = [...fetchpost]
                // newData.splice(indexNo, 1);

                // setfetchpost(newData);


            }
        }
        catch (error) {
            console.log(error);
            Swal.fire({
                title: "Oops ",
                text: "Internal Server Error Try After Sometime !",
                icon: "error",
            })
        }
    }

    useEffect(() => { fetchuserPost(); }, [])
    // console.log(prof.profile)
    return (
        <>
            <Header />

            {
                <div className='container my-3  '>
                    <section className='w-100 my-2 p-3 rounded shad text-white row'>
                        <div className='d-flex justify-content-between  align-items-center'>

                            <div className='d-flex my-2 align-items-center'>

                                <div>
                                    <img src={`http://localhost:5200/keshaveBlog-files/users/${prof.profile}`} className=' rounded-circle profile me-4 ' width={100} height={100} alt="" />
                                </div>
                                <div>
                                    <h4>{prof.username}</h4>
                                </div>
                            </div>
                            <h4 className='position-relative'>
                                <BsThreeDotsVertical onClick={() => setreport(!report)} />
                                <div className={`${report == true ? '' : 'd-none'} position-absolute end-0 border border-white rounded p-2`}
                                    style={{
                                        cursor: 'pointer'
                                    }}
                                >
                                    {/* <h5>Delete Post</h5> */}
                                    <Link href={`/website/Reports/${fetchSingle._id}`} className='text-white d-flex gap-2' >
                                        <TbMessageReport className="fs-4 text-white" />
                                        <h5>Report</h5>
                                    </Link>

                                    <div className='d-flex p-1 ' style={{ cursor: 'pointer' }} onClick={() => (deletePost(fetchSingle._id))} >
                                        <h5 className='d-flex'><MdDeleteForever className=' fs-4 text-danger' />Delete</h5>
                                    </div>
                                </div>

                            </h4>
                        </div>
                        <Link href={`/website/Detail/${prof._id}`}
                            style={{
                                color: 'black',
                                textDecoration: 'none'
                            }}
                        >
                            <div className='row text-white'>
                                <div className='col-12 col-lg-4 p-2'>
                                    <img src={`${pat}${fetchSingle.thumbnail}`} width='100%' height={350} alt="" />
                                </div>
                                <div className='col-12 col-lg-8 p-2 text-center lh-lg'>
                                    <h4 className='my-2 fw-bold'>
                                        {fetchSingle.title}

                                    </h4>
                                    <p className='my-4 fw-bold'>
                                        <q>{fetchSingle.caution}</q>
                                    </p>
                                    <p className='my-4 fw-bold'>
                                        <span><FaLocationDot /></span> {fetchSingle.location}
                                    </p>
                                    <p className='my-4 fw-semibold'
                                        style={{
                                            textAlign: 'justify'
                                        }}
                                    >
                                        {fetchSingle.detail}
                                    </p>
                                </div>
                            </div>
                        </Link>
                        <LikeCommentShare v={fetchSingle} p={pat} />
                    </section>
                </div>
            }

            <Footer />
        </>
    )
}


function LikeCommentShare(v) {
    const [like, setlike] = useState(false)
    const [comment, setcomment] = useState(false)
    const [modalShow, setModalShow] = React.useState(false);
    // console.log(v)
    return (
        <div className='fs-2 d-flex justify-content-center justify-content-md-end gap-5 py-2'>
            <div onClick={() => setlike(!like)}>
                {
                    like == true ? <BsHeartFill className='text-danger' /> : <BsHeart />
                }

            </div>
            <div className='d-flex align-items-center gap-3' >
                {
                    comment == true ? <FaCommentDots className='text-white' onClick={() => (setcomment(true), setModalShow(true))} /> : <FaRegCommentDots onClick={() => (setcomment(true), setModalShow(true))} />
                }


                <MyVerticallyCenteredModal
                    show={modalShow}
                    v={v.v}
                    p={v.p}
                    onHide={() => (setModalShow(false), setcomment(false))}
                />
            </div>
            <div>
                <FaShareAlt />
            </div>
        </div>
    )
}

function MyVerticallyCenteredModal(props) {

    let { user } = useContext(ContextAPI)
    const [comment, setcomment] = useState([])
    // const [commentprof, setcommentprof] = useState([])
    // console.log(user)
    const addComments = async (e) => {
        e.preventDefault()
        const data = {
            "userrs": user._id,
            "comments": e.target.comment.value,

        };
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/blogging-services/user-comments/add-user-comments`, data);
            if (response.status == 200) {
                e.target.comment.value = " ";
            }
            // console.log(response.data.data)
        }
        catch (error) {
            console.log(error);
        }
    }

    const viewComments = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/blogging-services/user-comments/view-user-comments`)
            setcomment(response.data.data)
            // setcommentprof(response.data.data.userrs)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { viewComments() }, [comment])
    // console.log(comment)
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"

            data-bs-theme='dark'
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h1 className='text-center'>COMMENTS !</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row' >
                    <div className='col-6'>
                        <img src={`${props.p}${props.v.thumbnail}`} width='100%' height={350} alt="" />
                    </div>
                    <div className='col-6' >
                        <div className='scrollC'>
                            {
                                comment.map((item, index) => (
                                    <div className='d-flex fs-4 gap-2 my-2 p-2'>
                                        <div className='rounded-circle'>
                                            <img src={`http://localhost:5200/keshaveBlog-files/users/${item.userrs.profile}`} width={50} height={50} className='rounded-circle' />
                                        </div>
                                        <div>
                                            {item.comments}
                                        </div>
                                    </div>
                                ))
                            }


                            {/* <div className='d-flex fs-4 gap-2 my-2 p-2'>
                                <div className='rounded-circle'>
                                    <Image src={logo} width={50} height={50} className='rounded-circle' />
                                </div>
                                <div>
                                    Comments !
                                </div>
                            </div>
                            <div className='d-flex fs-4 gap-2 my-2 p-2'>
                                <div className='rounded-circle'>
                                    <Image src={logo} width={50} height={50} className='rounded-circle' />
                                </div>
                                <div>
                                    Comments !
                                </div>
                            </div>
                            <div className='d-flex fs-4 gap-2 my-2 p-2'>
                                <div className='rounded-circle'>
                                    <Image src={logo} width={50} height={50} className='rounded-circle' />
                                </div>
                                <div>
                                    Comments !
                                </div>
                            </div>

                            <div className='d-flex fs-4 gap-2 my-2 p-2'>
                                <div className='rounded-circle'>
                                    <Image src={logo} width={50} height={50} className='rounded-circle' />
                                </div>
                                <div>
                                    Comments !
                                </div>
                            </div>

                            <div className='d-flex fs-4 gap-2 my-2 p-2'>
                                <div className='rounded-circle'>
                                    <Image src={logo} width={50} height={50} className='rounded-circle' />
                                </div>
                                <div>
                                    Comments !
                                </div>
                            </div> */}
                        </div>
                        <div className='mt-2'>
                            <form onSubmit={addComments} className={` position-relative`}>
                                <input type="text" name='comment' placeholder='Click To Comment !' className={` bg-transparent py-2 fs-4 rounded border-0 text-white w-100 p-2`} />
                                <button className='border-0 bg-transparent position-absolute  top-50 end-0 translate-middle-y text-white p-2 fs-4'>

                                    <IoSend className='text-white' />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer> */}
        </Modal>
    );
}
export default page