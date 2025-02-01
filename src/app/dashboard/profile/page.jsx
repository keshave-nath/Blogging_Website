'use client'

// import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Headers from '../header/Headers';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { FaFacebookF } from "react-icons/fa";
import { BsEyeFill, BsEyeSlash, BsInstagram } from "react-icons/bs";
import { FiYoutube } from "react-icons/fi";
import { BsTwitterX } from "react-icons/bs";
// import Cookies from 'js-cookie';

// import axios from 'axios';
import '../dashboard.css';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
// import swal from 'sweetalert';
// import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';

const Page = () => {

    const nav = useRouter()

    const [getAdminData, SetAdminData] = useState({})
    const [hideinputs, showinputs] = useState(false)
    const [btntext, setbtntext] = useState("Send OTP")
    const [imgPres, setImgPres] = useState({});
    const [eye, seteye] = useState(false)


    const AdminData = () => {
        const cookiedata = JSON.parse(Cookies.get("BlogAdmin-login"))
        // console.log(cookiedata)
        if (cookiedata) {
            SetAdminData(cookiedata[0])

        }
        // console.log(getAdminData)
        // setAdminData(cookiedata)
    }

    const handelUpdateprofile = async(e)=>{
        e.preventDefault();

        // const datas={
        //     name:e.target.name.value,
        //     fb:e.target.facebook.value,
        //     insta:e.target.insta.value,
        //     youtube:e.target.youtube.value,
        //     twitter:e.target.youtube.value,
        //     logo:e.target.logo.value,
        //     favicon:e.target.favicon.value,
        //     footer_icon:e.target.footer_icon.value,
        //     password:e.target.password.value
        // }
        // console.log(datas)
        const datas=e.target
        try{
           if( !window.confirm("Do you want to update this Profile"))return
            let response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/admin/update-admin/${getAdminData._id}`,datas)
            // console.log(datas,response,getAdminData._id)
            // if(response.status!==200)return(
            //     swal({
            //         title:"Something Went Wrong !! ",
            //         text:"Please Try After Sometime !!",
            //         icon:"warning",
            // }))
            // swal({
            //     title:"SUCCESS !! ",
            //     text:"Data has been Successfully Updated",
            //     icon:"success",
            // })

            Cookies.remove("BlogAdmin-login")
            nav.push("/Adminlogin")
        }
        catch(error){
            console.log(error)
        //     swal({
        //         title:"Something Went Wrong !! ",
        //         text:"Something Went Wrong in Server !!",
        //         icon:"error",
        //    })
        }
    }

    const handlegenerateotp = () => {
        

        try {
            const response = axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/admin/generate-otp`, getAdminData)
            // alert("")
            if(response.status == 200) {
                alert("Otp sent successfully")   
            }
            if(response.status==500){
                alert('try again')
            }
            showinputs(true)
                let otptimer = 60
                setbtntext(`REGENERATE OTP IN ${otptimer}`)
                const timerInterval = setInterval(() => {
                    otptimer--
                    setbtntext(`REGENERATE OTP IN ${otptimer}'s`)
                    if (otptimer === 0) {
                        clearInterval(timerInterval)
                        showinputs(false)
                        setbtntext("Send OTP")
                    }
                }, 1000)
           
            // toast("otp is sent");

        }
        catch (error) {
            console.log(error)
            // swal({
            //     title:"Something went wrong in server !!",
            //     text:"Please try again",
            //     icon:"error"
            // })
        }
    }

    const updateemail=(e)=>{
        e.preventDefault();
        const newvalues = {
            email:e.target.email.value,
            userotp:e.target.otp.value,
            newemail:e.target.newemail.value
        }
        // console.log(e.target)
        // console.log(getAdminData._id)
        try{
            if( !window.confirm("Do you want to update this email"))return

            const response = axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/admin/update-email/${getAdminData._id}`,newvalues)
            // swal({
            //     title:"SUCCESS ",
            //     text:"Email has been successfully updated !!",
            //     icon:"success"
            // })
            Cookies.remove("frankandoak-login")
            nav.push("/login-admin")
        }
        catch(error){
            console.log(error)
            // swal({
            //     title:"Something went wrong in server !!",
            //     text:"Please try again",
            //     icon:"error"
            // })
        }
    }

    const handleFileSelect = (e) => {
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
    //   console.log(getAdminData,"admin",imgPres)

    useEffect(() => {
        AdminData()
    }, [])
    // console.log("GET",getAdminData)

    return (
        <div>
            <Headers />
            <div className=''>
                <div className='p-2 border-top border-bottom border-end'>
                    <ul className=' list-unstyled d-flex gap-2 mx-3'>
                        <Link className='text-decoration-none' href='/dashboard' ><li className='text-info'>Home</li></Link>
                        <li>/</li>
                        <li>Profile</li>

                    </ul>
                </div>
                <form method='post' onSubmit={handelUpdateprofile} className=''>
                    <Container>
                        <div className='border-start border-end border-bottom my-4 rounded-top'>
                            <div className='bgg fw-bold fs-3 py-2 px-3'>
                                Profile
                            </div>
                            <div className=''>
                                <div className='container' >
                                    <div>
                                        <label htmlFor="" className='my-2 d-block' >
                                            Profile Picture
                                        </label>
                                        <img src={imgPres.profilePic ? imgPres.profilePic : `${process.env.NEXT_PUBLIC_SERVER}/keshaveBlog-files/admin/${getAdminData.profile}`} alt="profile" width='100px' height='100px' />
                                        <input type="file" className='d-block my-3' name="profile" onChange={handleFileSelect} />
                                    </div>
                                    <div>
                                        <label htmlFor="" className='my-2 d-block' >
                                            Name
                                        </label>
                                        <input type="text" placeholder='Name' value={getAdminData.name} 
                                        onChange={(e) => { SetAdminData({ ...getAdminData, name: e.target.value }) }}
                                        className='d-block my-3 bg-transparent border border-white p-2 w-100 rounded text-white' 
                                        name="name" />
                                    </div>
                                    <div className='position-relative'>
                                        <label htmlFor="" className='my-2 d-block' >
                                            Password
                                        </label>
                                        <input type={eye == false ? 'password' : 'text'} 
                                        placeholder='Password' 
                                        value={getAdminData.password} 
                                        onChange={(e) => { SetAdminData({ ...getAdminData, password: e.target.value }) }}
                                        className='d-block my-3 bg-transparent border border-white p-2 w-100 rounded text-white' name="password" />
                                        <div className=''>
                                            <div className='fs-5 pt-0 pe-2 position-absolute top-50 end-0' onClick={() => seteye(!eye)} >
                                                {
                                                    eye == false ? <BsEyeSlash /> : <BsEyeFill />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button className='border-0 bg-primary text-white p-2 rounded fs-5 fw-bold my-2'>
                                            Submit
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Container>
                </form>

                <form method='post' onClick={updateemail} >
                    <Container>
                        <div className='border-start border-end border-bottom my-4 rounded-top'>
                            <div className='bgg fw-bold fs-3 py-2 px-3'>
                                Email Authentication
                            </div>
                            <div className='container p-3'>
                                <label className='my-2'>
                                    Old Email
                                </label>
                                <input placeholder='Current Email'
                                    value={getAdminData.email}
                                    name='email'
                                    onChange={(e) => { SetAdminData({ ...getAdminData, email: e.target.value }) }}
                                    className='d-block w-100 rounded inn p-1 my-2' type='email' />

                                {
                                    hideinputs == true ?
                                        <><label className='my-2'>
                                            OTP
                                        </label>
                                            <input placeholder='Enter your OTP'
                                                name='otp'
                                                className='d-block w-100 rounded inn p-1 my-2' type='text' />

                                            <label className='my-2'>
                                                New Email
                                            </label>
                                            <input placeholder='New Email' className='d-block w-100 rounded inn p-1 my-2' name='newemail' type='email' />

                                            <button className='my-3 p-2 rounded border-0 bg-secondary text-white' disabled >{btntext}</button>
                                            <button type='submit' className='my-3 mx-5 p-2 rounded border-0 bg-primary text-white'
                                              >Update Email</button>
                                        </>

                                        :

                                        <button type='button' className='my-3 p-2 rounded border-0 bg-primary text-white' onClick={handlegenerateotp}>
                                            {btntext}
                                            {/* <ToastContainer /> */}
                                        </button>
                                }


                            </div>
                        </div>
                    </Container>
                </form>
            </div>
        </div>
    )
}

export default Page
