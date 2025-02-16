'use client'
import React, { useEffect, useState } from 'react'
import Headers from '../../../header/Headers';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const UpdatePostPage = () => {
    const nav = useRouter();
    const params = useParams();
    const [imgPres, setImgPres] = useState([]);
    const [postDet, setpostDet] = useState([]);
    const [Imagepath, setImagepath] = useState([]);

    const updatePost = async (e) => {
        e.preventDefault();
        const datas = e.target;

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/posts/update-post/${params._id}`, datas);
            if (response.status === 200) {
                Swal.fire({
                    title: "Do you want to update the post?",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Updated",
                    denyButtonText: `Don't Update`
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire("Saved!", "", "success");
                        nav.push('../view-posts');
                    } else if (result.isDenied) {
                        Swal.fire("Changes are not updated", "", "info");
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPosts = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/posts/fetch-post/${params._id}`);
            if (response.status !== 200) {
                Swal.fire("Internal Server Error !!", "", "danger");
            }
            setpostDet(response.data.data);
            setImagepath(response.data.file_Path);
        } catch (error) {
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
            setImgPres((prevState) => ({ ...prevState, [fieldname]: reader.result }));
        }
    };

    useEffect(() => { fetchPosts(); }, []);

    return (
        <div>
            <Headers />
            <div>
                <div className='p-2 border-top border-bottom border-end'>
                    <ul className='list-unstyled d-flex gap-2 mx-3'>
                        <Link className='text-decoration-none' href='/dashboard'><li className='text-info'>Home</li></Link>
                        <li>/</li>
                        <li>Update-Posts</li>
                    </ul>
                </div>
                <form method='post' onSubmit={updatePost} className=''>
                    <Container>
                        <div className='border-start border-end border-bottom my-4 rounded-top'>
                            <div className='bgg fw-bold fs-3 py-2 px-3'>
                                Update-Posts
                            </div>
                            <div className='container dash'>
                                <label htmlFor="" className='fw-bold fs-4 text-white'>
                                    IMAGE :
                                </label>
                                <div className='w-50 text-white my-3'>
                                    <img src={(imgPres.length === 0) ? `${postDet.admin_post}` : imgPres.admin_post} alt="Thumbnail" className='p-1' width='100px' />
                                </div>
                                <input type="file" name='admin_post' onChange={handleFileSelect} className='d-block w-100 rounded border-2 border-white my-3 p-1' />
                                <label htmlFor="" className='fw-bold fs-4 text-white'>
                                    TITLE :
                                </label>
                                <input type="text" name='title' placeholder='Enter Your Title' value={postDet.title} onChange={(e) => (setpostDet({ ...postDet, title: e.target.value }))} className='d-block w-100 rounded border-2 border-white my-3 p-1' />
                                <label htmlFor="" className='fw-bold fs-4 text-white'>
                                    CAUTION :
                                </label>
                                <input type="text" name='caution' placeholder='Enter The Caution' value={postDet.caution} onChange={(e) => (setpostDet({ ...postDet, caution: e.target.value }))} className='d-block w-100 rounded border-2 border-white my-3 p-1' />
                                <label htmlFor="" className='fw-bold fs-4 text-white'>
                                    LOCATION :
                                </label>
                                <input type="text" name='location' placeholder='Enter Your Location' value={postDet.location} onChange={(e) => (setpostDet({ ...postDet, location: e.target.value }))} className='d-block w-100 rounded border-2 border-white my-3 p-1' />
                                <label htmlFor="" className='fw-bold fs-4 text-white'>
                                    DETAILS :
                                </label>
                                <textarea name='detail' placeholder='Enter Your Trip Experience' value={postDet.detail} onChange={(e) => (setpostDet({ ...postDet, detail: e.target.value }))} className='d-block w-100 rounded border-2 border-white my-3 p-1'></textarea>
                                <button className='text-white butt border-0 w-100 p-1 rounded fw-bold fs-3 my-5'>
                                    Update Your Blog
                                </button>
                            </div>
                        </div>
                    </Container>
                </form>
            </div>
        </div>
    )
}

export default UpdatePostPage;
