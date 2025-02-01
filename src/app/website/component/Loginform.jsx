import { ContextAPI } from '@/app/context/Maincontext';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const Loginform = () => {
    const nav = useRouter();
    // let {pathh,setpathh} = useContext(ContextAPI)
    const [Login, SetLogin] = useState(false);
    const [eye, seteye] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateFormDate = () => {

        let checkError = {};
        if (!formData.username) {
            checkError.username = 'UserName is required';
        }


        const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!formData.email || !formData.email.match(emailPattern)) {
            checkError.email = 'Email is required';
        }

        // if(!formData.email.test(emailPattern)){
        //     checkError.email='Enter a Valid Email'
        // }

        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!formData.password || !formData.password.match(passwordPattern)) {
            checkError.password = 'Password must be of 8 digit long & contains uppercase and lowercase character any number and special character';
        }

        // if(!formData.password.test(passwordPattern)){
        //     checkError.password='Enter a Valid Password'
        // }

        setErrors(checkError);
        return (Object.keys(checkError).length === 0);

    };

    const handelloading=()=>{
        setIsLoading(false)
        SetLogin(false)
    }

    const handleGenerateOtp = async () => {
        const ifValid = validateFormDate();
        if (ifValid) {
            setIsLoading(true)
            try {
                // alert("Keshave is best")
                const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/blogging-services/user/register-user`, formData);

                // // console.log(response)

                if (response.status != 200) {
                    Swal.fire({
                        title: "Error",
                        text: "Something Went Wrong",
                        icon: "error"
                      })
                      setIsLoading(false)
                    }

                if(response.status==200)return(
                    Swal.fire({
                        title:"SUCCESS !!",
                        text:"User is being register successfully",
                        icon:"success"
                    }).then((res)=>(
                        handelloading()
                        
                    ))
                )
                // swal({
                //     title:"SUCCESS !!",
                //     text:"User is being register successfully",
                //     icon:"success"
                // })
                
            }
            catch (error) {
                console.log(error);
                setIsLoading(false)
                Swal.fire({
                    title: "Error",
                    text: "Network Error !",
                    icon: "error"
                  })

                // swal({
                //     title:"Something went wrong in server !!",
                //     text:"Please try again",
                //     icon:"error"
                // })
            }
        }
        else {
            setTimeout(() => {
                setErrors({});
            }, 5000);
        }

        

    };

    const handelLogin = async (e) => {
        // console.log(process.env.NEXT_PUBLIC_SERVER)
        e.preventDefault();
        const datas = {
            "email": e.target.email.value,
            "password": e.target.password.value
        }
        setIsLoading(true)
        //    console.log(datas)
        try {

            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/blogging-services/user/login-user`, datas)
            // console.log(response)
            if (response.status!= 200) {
                // swal({
                //     title: "Something went wrong !!",
                //     text:"Please try after sometime !!",
                //     icon: "warning"
                // })
                Swal.fire({
                    title: "Oops",
                    text: "Something Went Wrong",
                    icon: "error"
                  })
                  setIsLoading(false);
            }
            if (response.status == 200) {

                Cookies.set("Blogging_User", JSON.stringify(response.data.data), { expires: 1 });
                setIsLoading(false);
                Swal.fire({
                    title: "Success",
                    text: "Login Successfull",
                    icon: "success"
                  })
                //  console.log(response.data.file_path);
                nav.push('/website/Index');



            }




        }
        catch (error) {
            console.log(error)
            Swal.fire({
                title: "Error",
                text: "Network Error !",
                icon: "error"
              })
              setIsLoading(false);
            // swal({
            //     title:"Something went wrong in server !!",
            //     text:"Please try again",
            //     icon:"error"
            // })
        }
        // finally {
        //     // Hide loader after API call completes
        //     setIsLoading(false);
        // }



    }

    return (
        <div>
            {
                Login === false
                    ?
                    <div className=' mx-auto bg-dark border border-2 rounded p-3'
                        style={{
                            // width: '400px',
                            maxWidth:'90%',
                            boxShadow: '0px 0px 10px 7px white'
                        }}
                    >
                        <div>
                        <h2 className='text-center text-white'>
                            Welcome To Our Blogging Website
                        </h2>
                            <h3 className='text-center text-white fw-bold'>
                                Log-in
                            </h3>
                            <form action="" method='post' onSubmit={handelLogin}>
                                <label htmlFor="" className='fw-bold text-white fs-5 my-2'>Email :</label>
                                <input type="email" placeholder='email' name="email" className="d-block w-100 px-1 py-1" />

                                <div className='position-relative'>
                                    <label htmlFor="" className='fw-bold text-white fs-5 my-2'>Password :</label>
                                    <input type={eye == true ? 'text' : 'password'} placeholder='Password' name="password" className="d-block w-100 px-1 py-1" />

                                    <i className='position-absolute'
                                        style={{
                                            right: '10px',
                                            top: '50px',
                                            color: 'black'
                                        }}
                                        onClick={() => (seteye(!eye))}
                                    >
                                        {
                                            eye == true ?
                                                <FaRegEye />
                                                :
                                                <FaRegEyeSlash />
                                        }

                                    </i>
                                </div>

                                <div className='mt-3 text-primary fw-semibold '>
                                    <p><a href="/website/Forgetpassword">FORGET PASSWORD ? </a></p>

                                </div>

                                {isLoading ? (
                                    <div className="text-center">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        className='w-100 py-1 my-3 border-0 butt bg-primary text-white fw-bold rounded text-center'
                                        type="submit"
                                    >
                                        Login
                                    </button>
                                )}
                            </form>

                        </div>
                        <p className='my-3 text-center text-white'>
                            Click , Here to
                            <a className='mx-1 text-primary text-decoration-underline'
                                style={{
                                    cursor: 'pointer'
                                }}
                                onClick={() => SetLogin(true)}>Sign-up</a>
                        </p>
                        <p className='fw-bold text-secondary text-center'>Powered By AK</p>
                    </div>
                    :
                    <div
                        style={{
                            // width: "450px",
                            maxWidth:'90%',
                            boxShadow: '0px 0px 10px 7px white'
                        }}
                        className='mx-auto border border-2 bg-dark rounded p-2 px-3'>
                        <h2 className='text-center text-white'>
                            Welcome To Our Blogging Website
                        </h2>
                        <p className='text-center my-2 fw-bold text-white'>
                            Click , Here If you are already
                            <a className='mx-1 text-primary text-decoration-underline'
                                style={{
                                    cursor: 'pointer'
                                }}
                                onClick={() => SetLogin(false)}>Log-in</a>
                        </p>


                        <form action="" method='get'>
                            <label htmlFor="" className='fw-bold text-white fs-5 my-2'>Username :</label>
                            <input type="text" placeholder='@Username' name="username" value={formData.username} onChange={(e) => (setFormData({ ...formData, username: e.target.value }))} className="d-block w-100 px-1 py-1" />
                            <div>
                                {errors.username &&
                                    <p className='errors'>{errors.username}</p>
                                }
                            </div>

                            <label htmlFor="" className='fw-bold text-white fs-5 my-2'>Email :</label>
                            <input type="email" placeholder='Email' name="email" value={formData.email} onChange={(e) => (setFormData({ ...formData, email: e.target.value }))} className="d-block w-100 px-1 py-1" />
                            <div>
                                {errors.email &&
                                    <p className='errors'>{errors.email}</p>
                                }
                            </div>

                            <div className='position-relative'>
                                <label htmlFor="" className='fw-bold text-white fs-5 my-2'>Password :</label>
                                <input type={eye == true ? 'text' : 'password'} placeholder='Password' name="password" value={formData.password} onChange={(e) => (setFormData({ ...formData, password: e.target.value }))} className="d-block w-100 px-1 py-1" />

                                <i className='position-absolute'
                                    style={{
                                        right: '10px',
                                        top: '50px',
                                        color: 'black'
                                    }}
                                    onClick={() => (seteye(!eye))}
                                >
                                    {
                                        eye == true ?
                                            <FaRegEye />
                                            :
                                            <FaRegEyeSlash />
                                    }

                                </i>
                            </div>
                            <div>
                                {errors.password &&
                                    <p className='errors'>{errors.password}</p>
                                }
                            </div>


                            {isLoading ? (
                                    <div className="text-center">
                                        <div className="spinner-border text-primary mt-2" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                ) : (
                            <button type='button' onClick={handleGenerateOtp} className='w-100 py-2 my-5 border-0 butt bg-primary text-white rounded fw-bold text-center'>
                                Sign-up
                            </button>
                                )}
                        </form>
                        <p className='fw-bold text-secondary text-center'>Powered By AK</p>
                    </div>

            }
        </div>
    )
}

export default Loginform