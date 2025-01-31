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

const page = () => {
    const [reportts, setreportts] = useState([]);
    const [pat, setpath] = useState([])
    const [viewId, setViewId] = useState([]);
        const [ifChecked, SetIfChecked] = useState(false);

    const handelviewReports = async () => {
        try {
            let response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/reports/view-reports`);
            setreportts(response.data.data);
            setpath(response.data.file_path);
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
            let allIds = reportts.map((v) => v._id)
            setViewId(allIds);
            SetIfChecked(true);
        }
        else {
            setViewId([]);
            SetIfChecked(false);
        }
    }

    const deletePost = async (e) => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/reports/delete-reports/${e}`)
            if (response.status == 200) {

                alert("Deleted")

                const indexNo = reportts.findIndex((v) => v._id === e);
                const newData = [...reportts]
                newData.splice(indexNo, 1);

                setreportts(newData);


            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const deleteuserPost = async (e) => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/api/blogging-services/user-posts/delete-user-post/${e}`)
            if (response.status == 200) {

                Swal.fire({
                    title:"Success ",
                    text:"Post Deleted Successfully !",
                    icon:"success",
                })
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
                    const response = axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/reports/multi-delete-reports`, { ids: viewId }).then((resultt) => {
                        // console.log(resultt)
                        if (resultt.status == 200) return (
                            Swal.fire({
                                title: "Success !!",
                                text: "Data Deleted Successfully !!",
                                icon: "success"
                            }).then((ress) => (handelviewReports()))

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
                        const response =  axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/reports/update-reports/${e.target.value}`, { newvalues })
                        if (response.status == 200){
                        // alert("Status Updated")
                        // console.log("result")
                        let indexNo = reportts.findIndex((v) => v._id === e.target.value)
                        const newData = [...reportts]
                        newData[indexNo].status = newvalues;
                        // console.log(newData,indexNo)
                        setreportts(newData);
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

    useEffect(() => { handelviewReports();
        SetIfChecked(viewId.length === reportts.length && reportts.length !== 0)
     }, [viewId,reportts])
    // console.log(reportts)

    return (
        <div>
            <Headers />
            <div>
                <div className='p-2 border-top border-bottom border-end'>
                    <ul className=' list-unstyled d-flex gap-2 mx-3'>
                        <Link className='text-decoration-none' href='/dashboard' ><li className='text-info'>Home</li></Link>
                        <li>/</li>
                        <li>View-Reports</li>
                    </ul>
                </div>
                <Container>
                    <div className='border-start border-end border-bottom my-4 rounded-top'>
                        <div className='bgg fw-bold fs-3 py-2 px-3'>
                            View Reports
                        </div>
                        <div className='container p-3'>
                            <Table className='text-center ' striped bordered hover variant="dark" >
                                <thead>
                                    <tr>
                                    <th style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}><button onClick={handelmultidelete}  className='my-2 ms-2 p-2 d-block rounded border-0 text-white bg-danger'>Delete</button> <input type='checkbox' className='ms-3' style={{
                                            height: '14px'
                                        }} checked={ifChecked} onClick={handelSelectAll} /></th>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Reports</th>
                                        <th>Image</th>
                                        <th>Action</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        reportts.map((v, i) => (
                                            <tr >
                                                <td><input type='checkbox' value={v._id} checked={viewId.includes(v._id)} onClick={handelcheck} /></td>
                                                <td>{i + 1}</td>
                                                <td> {v.name} </td>
                                                <td> {v.username} </td>
                                                <td> {v.reportt} </td>
                                                <td>
                                                    <img src={`${pat}${v.thumbnail}`} width={100} height={100} alt="" />
                                                </td>
                                                <td style={{
                                                    paddingTop: '20px',
                                                    width: '170px',
                                                    boxSizing: 'border-box'
                                                }}>
                                                    <span className=' ls'>
                                                        {/* <IconContext.Provider value={{color:'red',size:'21px'}}> */}

                                                        <label className='me-2 border-bottom p-2 ' onClick={() => deletePost(v._id)}  ><MdDelete className='text-danger fs-4' /> Delete Report </label>

                                                        <label className='me-2 p-2' onClick={() => deleteuserPost(v.reportid)}  ><MdDelete className='text-danger fs-4 me-3'  /> Delete Post </label>
                                                        {/* </IconContext.Provider> */}
                                                        {/* <label>|</label> */}
                                                        {/* <IconContext.Provider value={{color:'yellow ',size:'18px'}}> */}
                                                        {/* <Link  href={`/dashboard/updatesize/1`}><label className='ms-2' ><SlNote className='text-warning fs-5' /></label></Link> */}
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