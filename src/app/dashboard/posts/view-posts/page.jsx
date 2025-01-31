'use client'
import React, { useEffect, useState } from 'react'
import Headers from '../../header/Headers';
import Link from 'next/link';
import { Container, Table } from 'react-bootstrap';
// import { IconContext } from 'react-icons';
import { SlNote } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import Swal from 'sweetalert2';
// import { IconContext } from 'react-icons';

const page = () => {
    const [fetchedData, setfetchedData] = useState([])
    const [filepath, setfilepath] = useState([])
    const [viewId, setViewId] = useState([]);
    const [ifChecked, SetIfChecked] = useState(false);

    const readData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/posts/view-post`)

            if (response.status == 200) {
                // console.log(response)
                setfetchedData(response.data.data);
                setfilepath(response.data.file_path);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const deletePost = async (e) => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/posts/delete-post/${e}`)
            if (response.status == 200) {

                alert("Deleted")

                const indexNo = fetchedData.findIndex((v) => v._id === e);
                const newData = [...fetchedData]
                newData.splice(indexNo, 1);

                setfetchedData(newData);


            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const handelStatus = async (e) => {
        let newvalues = (e.target.textContent == "Active") ? false : true;
        try {
            // console.log(e.target.textContent)
        
            await Swal.fire({
                title: "Do you want to Update the status?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            }).then((result) => {
                
                /* Read more about isConfirmed, isDenied below */
                if(result.isConfirmed){
                    const response =  axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/posts/update-status/${e.target.value}`, { newvalues })
                    if (response.status == 200){
                    // alert("Status Updated")
                    // console.log("result")
                    let indexNo = fetchedData.findIndex((v) => v._id === e.target.value)
                    const newData = [...fetchedData]
                    newData[indexNo].status = newvalues;
                    // console.log(newData,indexNo)
                    setfetchedData(newData);
                    Swal.fire("Saved!", "", "success");
                
                    }
                    // nav.push('./view-terms-conditions');
                }
                else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            })
            
        }
        catch (error) {
            console.log(error);
        }
    }

    const handelcheck = (e) => {
        const { value, checked } = e.target

        if (checked) {
            let arr = [...viewId];
            arr.push(value);
            setViewId(arr);
        }
        else {
            let arr = [...viewId].filter((v) => v != value)
            setViewId(arr);
        }
    }

    const handelSelectAll = (e) => {
        if (e.target.checked) {
            let allIds = fetchedData.map((v) => v._id)
            setViewId(allIds);
            SetIfChecked(true);
        }
        else {
            setViewId([]);
            SetIfChecked(false);
        }
    }

    const handelmultidelete = async () => {

        await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    if (viewId.length == 0) return (
                        Swal.fire({
                            title: "WARNING !!",
                            text: "Please Select Data ",
                            icon: "info"
                        })
                    )
                    const response = axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/posts/multi-delete-post`, { ids: viewId }).then((resultt) => {
                        // console.log(resultt)
                        if (resultt.status == 200) return (
                            Swal.fire({
                                title: "Success !!",
                                text: "Data Deleted Successfully !!",
                                icon: "success"
                            }).then((ress) => (readData()))

                        )
                        if (resultt.status !== 200) return (
                            Swal.fire({
                                title: "Something Went Wrong !!",
                                text: "Please try after sometime !!",
                                icon: "warning"
                            })
                        )
                    })




                }
                catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: "Something Went Wrong !!",
                        text: "Internal Server Error !!",
                        icon: "error"
                    })
                }
            }
        });


    }

    useEffect(() => {
        readData();
        SetIfChecked(viewId.length === fetchedData.length && fetchedData.length !== 0)
    }, [viewId, fetchedData])



    return (
        <div>
            <Headers />
            <div>
                <div className='p-2 border-top border-bottom border-end'>
                    <ul className=' list-unstyled d-flex gap-2 mx-3'>
                        <Link className='text-decoration-none' href='/dashboard' ><li className='text-info'>Home</li></Link>
                        <li>/</li>
                        <li>View-Posts</li>
                    </ul>
                </div>
                <Container>
                    <div className='border-start border-end border-bottom my-4 rounded-top'>
                        <div className='bgg fw-bold fs-3 py-2 px-3'>
                            View Posts
                        </div>
                        <div className='container p-3'>
                            <Table className='text-center ' striped bordered hover variant="dark" >
                                <thead>
                                    <tr>
                                        <th style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}><button onClick={handelmultidelete} className='my-2 ms-2 p-2 d-block rounded border-0 text-white bg-danger'>Delete</button> <input type='checkbox' className='ms-3' style={{
                                            height: '14px'
                                        }} checked={ifChecked} onClick={handelSelectAll} /></th>
                                        <th>S.No</th>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Caution</th>
                                        <th>Location</th>
                                        <th>Details</th>
                                        <th>Actions</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        fetchedData.map((v, i) => (
                                            <tr >
                                                <td><input type='checkbox' value={v._id} checked={viewId.includes(v._id)} onClick={handelcheck} /></td>
                                                <td>{i + 1}</td>
                                                <td>
                                                    <img src={`${filepath}/${v.admin_post}`} width={100} height={100} />
                                                </td>
                                                <td>{v.title}</td>
                                                <td>{v.caution}</td>
                                                <td>{v.location}</td>
                                                <td>{v.detail}</td>
                                                <td style={{
                                                    paddingTop: '20px',
                                                    width: '170px',
                                                    boxSizing: 'border-box'
                                                }}>
                                                    <span className='d-flex ls'>
                                                        {/* <IconContext.Provider value={{color:'red',size:'21px'}}> */}
                                                        <label className='me-2 ms-5'  ><MdDelete className='text-danger fs-4' onClick={() => (deletePost(v._id))} /></label>
                                                        {/* </IconContext.Provider> */}
                                                        <label>|</label>
                                                        {/* <IconContext.Provider value={{color:'yellow ',size:'18px'}}> */}
                                                        <Link href={`./update-posts/${v._id}`}><label className='ms-2' ><SlNote className='text-warning fs-5' /></label></Link>
                                                        {/* </IconContext.Provider> */}
                                                    </span>
                                                </td>
                                                <td style={{
                                                    padding: '0px',
                                                    width: '170px',
                                                    boxSizing: 'border-box',
                                                    // display:'flex'
                                                }}>
                                                    <button
                                                        name='status'
                                                        value={v._id}
                                                        onClick={handelStatus}
                                                        className={`my-3 ms-5 p-2 d-block rounded border-0 
                                                              ${(v.status == true) ? 'bg-success' : 'bg-secondary'}      text-white`}
                                                    >
                                                        {
                                                            (v.status == true) ? "Active" : "Inactive"
                                                        }
                                                    </button>


                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default page