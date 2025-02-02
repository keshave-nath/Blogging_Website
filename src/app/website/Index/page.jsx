'use client'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
// import { FaLocationDot } from "react-icons/fa6";
// import { BsThreeDotsVertical } from "react-icons/bs";
import Link from 'next/link';
import logo from '../../../../public/images/login_logo.png';
import Image from 'next/image';

// import React, { useState } from 'react'
// import Header from '../component/Header'
// import Footer from '../component/Footer'
// import Link from 'next/link'
import { FaCommentDots, FaLinkedin, FaLocationDot, FaRegCommentDots, FaRegHeart, FaXTwitter } from 'react-icons/fa6'
import { FaFacebookSquare, FaShareAlt } from "react-icons/fa";
import { TbMessageReport } from "react-icons/tb";
// import logo from '../../../../public/images/login_logo.png';
import { BsHeart, BsHeartFill, BsThreeDotsVertical } from 'react-icons/bs'
import { IoSend } from "react-icons/io5";
// import Image from 'next/image'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { ContextAPI } from '@/app/context/Maincontext';
import { PiVanLight } from 'react-icons/pi';
import Swal from 'sweetalert2';

const Page = () => {
    // let {user} = useContext(ContextAPI)
    

    const [Posts, setPosts] = useState([]);
    let [paath, setpaath] = useState([]);


    const handelPosts = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/blogging-services/user-posts/view-user-post`)
            if (response.status == 200) {
                setPosts(response.data.data);
                setpaath(response.data.file_path)
                // console.log(response.data.file_path)
            }
            if (response.status != 200) {
                Swal.fire("Something went wrong", "Please try again", "error");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { handelPosts() }, [])

    // console.log(Posts)

    return (
        <>
            <Header />
            <main className="my-3 container">

                {
                    Posts.map((v, i) => (
                        <section className='w-100 my-2 mx-2 p-2 rounded shad text-white row' key={v._id} >
                            <div className='d-flex justify-content-between  align-items-center'>

                                <div className='d-flex  align-items-center gap-3'>

                                    <div className='border-0 rounded-circle'>
                                        <img src={`${process.env.NEXT_PUBLIC_SERVER}/keshaveBlog-files/users/${v.userr.profile}`} width={100} height={100} className='border-0 rounded-circle' alt="profile" />
                                    </div>
                                    <div>
                                        <h4>{v.userr.username}</h4>
                                    </div>
                                </div>
                                <Report v={v} />
                            </div>
                            <Link href={`/website/Detail/${v.userr._id}`}
                                style={{
                                    color: 'black',
                                    textDecoration: 'none'
                                }}
                            >
                                <div className='row text-white'>
                                    <div className='col-12 col-lg-4 p-2 rounded'>
                                        <img src={`${paath}${v.thumbnail}`} width='100%' height={400} className='rounded' alt="thumbnail" />
                                    </div>
                                    <div className='col-12 col-lg-8 p-2 text-center lh-lg'>
                                        <h4 className='my-2 fw-bold'>
                                            {v.title}

                                        </h4>
                                        <p className='my-4 fw-bold'>
                                            <q>{v.caution}</q>
                                        </p>
                                        <p className='my-4 fw-bold'>
                                            <span><FaLocationDot /></span> {v.location}
                                        </p>
                                        <p className='my-4 fw-semibold'
                                            style={{
                                                textAlign: 'justify'
                                            }}
                                        >
                                            {v.detail}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                            <LikeCommentShare v={v} p={paath} />
                        </section>
                    ))
                }

            </main>
            <Footer />
        </>
    )
}

function Report(v) {
    const [report, setreport] = useState(false)

    // const handelReport = async(e)=>{
    //     try{
    //         console.log(e)
    //     }
    //     catch(error){
    //         console.log(error)
    //     }
    // }

    return (
        <h4 className='position-relative'>
            <BsThreeDotsVertical onClick={() => setreport(!report)} />
            <div className={`${report == true ? '' : 'd-none'} position-absolute end-0 border border-white rounded p-2`}
            style={{
                cursor:'pointer',
                width:'120px'
            }}
            
            >
                <Link href={`/website/Reports/${v.v._id}`} className='text-white d-flex gap-2' >
                <TbMessageReport className="fs-4 text-white" />
                    <h5>Report</h5>
                </Link>
                
            </div>
        </h4>
    )
}

function LikeCommentShare(v) {
    const [like, setlike] = useState(false)
    const [comment, setcomment] = useState(false)
    const [modalShow, setModalShow] = React.useState(false);
    const [share, setshare] = useState(false)

    const handelShare=()=>{
        setshare(!share)
    }

    const handelShareButton = (e)=>{
        // console.log(e)
        document.addEventListener('load', function() {
            // Get the current URL and title of the blog post
            var currentUrl = window.location.href;  // Gets the current page URL
            var currentTitle = document.title;      // Gets the current page title
            console.log(currentUrl)
            // Facebook Share button
            document.getElementById('facebook-share').addEventListener('click', function() {
              var facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
              window.open(facebookUrl, '_blank', 'width=600,height=400');
            });
        
            // Twitter Share button
            document.getElementById('twitter-share').addEventListener('click', function() {
              var twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(currentTitle)}`;
              window.open(twitterUrl, '_blank', 'width=600,height=400');
            });
        
            // LinkedIn Share button
            document.getElementById('linkedin-share').addEventListener('click', function() {
              var linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
              window.open(linkedinUrl, '_blank', 'width=600,height=400');
            });
          });
    } 

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
            <div className='position-relative ' >
                <FaShareAlt onClick={handelShare} />
                <div className={` ${share==true?'border border-3 bg-black rounded d-flex gap-3 p-2':'d-none'}`}
                style={{
                    position:'absolute',
                    top:'40px',
                    right:'-120px',
                }}
                >
                <FaFacebookSquare className='text-white fs-4' id="facebook-share" onClick={handelShareButton} />
                <FaXTwitter className='text-white fs-4' id="twitter-share" onClick={handelShareButton} />
                <FaLinkedin className='text-white fs-4' id="linkedin-share" onClick={handelShareButton} />
                </div>
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
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/blogging-services/user-comments/add-user-comments`, data)
            // console.log(response.data.data)
            if(response.status==200){
                e.target.comment.value=" ";
            }
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
                        <img src={`${props.p}${props.v.thumbnail}`} width='100%' height={350} alt="thumbnail" />
                    </div>
                    <div className='col-6' >
                        <div className='scrollC'>
                            {
                                comment.map((item, index) => (
                                    <div className='d-flex fs-4 gap-2 my-2 p-2' key={item._id} >
                                        <div className='rounded-circle'>
                                            <img src={`${process.env.NEXT_PUBLIC_SERVER}/keshaveBlog-files/users/${item.userrs.profile}`} width={50} height={50} className='rounded-circle' alt='profile' />
                                        </div>
                                        <div>
                                            {item.comments}
                                        </div>
                                    </div>
                                ))
                            }

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
           
        </Modal>
    );
}

export default Page