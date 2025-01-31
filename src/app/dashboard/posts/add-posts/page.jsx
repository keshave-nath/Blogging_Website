'use client'
import React, { useState } from 'react'
import Headers from '../../header/Headers';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const page = () => {
    const nav = useRouter();
    const [imgPres, setImgPres] = useState({});

    const addPost = async(e)=>{
        e.preventDefault();

        const datas = e.target
        
        try{

            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/posts/add-post`,datas)
            if(response.status==200)return(
                Swal.fire({
                    title: "Do you want to save the post?",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Save",
                    denyButtonText: `Don't save`
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      Swal.fire("Saved!", "", "success");
                      nav.push('./view-posts');
                    } else if (result.isDenied) {
                      Swal.fire("Changes are not saved", "", "info");
                    }
                  })
            )
            
            // .then((result)=>{
            //     if(result.status==200){
            //         Swal.fire({
            //             title: "Success!!",
            //             text: "Post is added successfully",
            //             icon: "success"
            //           }).then(()=>{
            //             nav.push('/posts/view-posts')
            //           })
            //     }
            // })
            
        }
        catch(error){
            console.log(error);
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
    return (
        <div>
            <Headers />
            <div>
                <div className='p-2 border-top border-bottom border-end'>
                    <ul className=' list-unstyled d-flex gap-2 mx-3'>
                        <Link className='text-decoration-none' href='/dashboard' ><li className='text-info'>Home</li></Link>
                        <li>/</li>
                        <li>Add-Posts</li>
                    </ul>
                </div>
                <form method='post' onSubmit={addPost} className=''>
                    <Container>
                        <div className='border-start border-end border-bottom my-4 rounded-top'>
                            <div className='bgg fw-bold fs-3 py-2 px-3'>
                                Add-Posts
                            </div>
                            <div className='container dash' >
                                <label htmlFor="" className='fw-bold fs-4 text-white'>
                                    IMAGE :
                                </label>
                                <div className='w-50 text-white my-3 '>
                                    <img src={imgPres.admin_post} alt="Thumbnail " className='p-1' width='100px' />
                                </div>
                                <input type="file" name='admin_post' onChange={handleFileSelect} placeholder='Enter Your Title' className='d-block w-100 rounded border-2 border-white my-3 p-1' />
                                <label htmlFor="" className='fw-bold fs-4 text-white'>
                                    TITLE :
                                </label>
                                <input type="text" name='title' placeholder='Enter Your Title' className='d-block w-100 rounded border-2 border-white my-3 p-1' />

                                <label htmlFor="" className='fw-bold fs-4 text-white'>
                                    CAUTION :
                                </label>
                                <input type="text" name='caution' placeholder='Enter The Caution' className='d-block w-100 rounded border-2 border-white my-3 p-1' />

                                <label htmlFor="" className='fw-bold fs-4 text-white'>
                                    LOCATION :
                                </label>
                                <input type="text" name='location' placeholder='Enter Your Location' className='d-block w-100 rounded border-2 border-white my-3 p-1' />

                                <label htmlFor="" className='fw-bold fs-4 text-white'>
                                    DETAILS :
                                </label>
                                <textarea name='detail' placeholder='Enter Your Trip Experience' id="" className='d-block w-100 rounded border-2 border-white my-3 p-1' ></textarea>

                                <button className='text-white butt border-0 w-100 p-1 rounded fw-bold fs-3 my-5'>
                                    ADD Your Blog
                                </button>
                            </div>
                        </div>
                    </Container>
                </form>
            </div>
        </div>
    )
}

export default page