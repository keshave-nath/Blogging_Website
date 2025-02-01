'use client'
import React, { useEffect, useState } from 'react'
import Headers from '../../header/Headers';
import Link from 'next/link';
import { Container, Table } from 'react-bootstrap';
import { SlNote } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import Swal from 'sweetalert2';

const Page = () => { // Renamed from page to Page

    const [fetchData, setfetchData] = useState([]);
    const [viewId, setViewId] = useState([]);
    const [ifChecked, SetIfChecked] = useState(false);

    const fetchTerms = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/terms-conditions/view-terms`)
            if (response.status == 200) {
                setfetchData(response.data.data);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const deletePost = async (e) => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/terms-conditions/delete-terms/${e}`)
            if (response.status == 200) {
                alert("Deleted")
                const indexNo = fetchData.findIndex((v) => v._id === e);
                const newData = [...fetchData]
                newData.splice(indexNo, 1);
                setfetchData(newData);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const handelStatus = async (e) => {
        let newvalues = (e.target.textContent == "Active") ? false : true;
        try {
            await Swal.fire({
                title: "Do you want to Update the status?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            }).then((result) => {
                if (result.isConfirmed) {
                    const response = axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/terms-conditions/update-status-terms/${e.target.value}`, { newvalues })
                    if (response.status == 200) {
                        let indexNo = fetchData.findIndex((v) => v._id === e.target.value)
                        const newData = [...fetchData]
                        newData[indexNo].status = newvalues;
                        setfetchData(newData);
                        Swal.fire("Saved!", "", "success");
                    }
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
            let allIds = fetchData.map((v) => v._id)
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
                    const response = axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/terms-conditions/multi-delete-terms`, { ids: viewId }).then((resultt) => {
                        if (resultt.status == 200) return (
                            Swal.fire({
                                title: "Success !!",
                                text: "Data Deleted Successfully !!",
                                icon: "success"
                            }).then((ress) => (fetchTerms()))
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
        fetchTerms();
        SetIfChecked(viewId.length === fetchData.length && fetchData.length !== 0)
    }, [viewId, fetchData])

    return (
        <div>
            <Headers />
            <div>
                <div className='p-2 border-top border-bottom border-end'>
                    <ul className=' list-unstyled d-flex gap-2 mx-3'>
                        <Link className='text-decoration-none' href='/dashboard' ><li className='text-info'>Home</li></Link>
                        <li>/</li>
                        <li>View-Term-And-Conditions</li>
                    </ul>
                </div>
                <Container>
                    <div className='border-start border-end border-bottom my-4 rounded-top'>
                        <div className='bgg fw-bold fs-3 py-2 px-3'>
                            View Term-And-Conditions
                        </div>
                        <div className='container p-3'>
                            <Table className='text-center ' striped bordered hover variant="dark" >
                                <thead>
                                    <tr>
                                        <th style={{ display: 'flex', alignItems: 'center' }}>
                                            <button onClick={handelmultidelete} className='my-2 ms-2 p-2 d-block rounded border-0 text-white bg-danger'>Delete</button>
                                            <input type='checkbox' className='ms-3' style={{ height: '14px' }} checked={ifChecked} onClick={handelSelectAll} />
                                        </th>
                                        <th>S.No</th>
                                        <th>T&C Title</th>
                                        <th>T&C Details</th>
                                        <th>Action</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        fetchData.map((v, i) => (
                                            <tr key={v._id}> {/* Added key prop */}
                                                <td><input type='checkbox' value={v._id} checked={viewId.includes(v._id)} onClick={handelcheck} /></td>
                                                <td>{i + 1}</td>
                                                <td>{v.term}</td>
                                                <td>{v.condition}</td>
                                                <td style={{ paddingTop: '20px', width: '170px', boxSizing: 'border-box' }}>
                                                    <span className='d-flex ls'>
                                                        <label className='me-2 ms-5'><MdDelete className='text-danger fs-4' onClick={() => (deletePost(v._id))} /></label>
                                                        <label>|</label>
                                                        <Link href={`./update-t-c/${v._id}`}><label className='ms-2'><SlNote className='text-warning fs-5' /></label></Link>
                                                    </span>
                                                </td>
                                                <td style={{ padding: '0px', width: '170px', boxSizing: 'border-box' }}>
                                                    <button
                                                        name='status'
                                                        value={v._id}
                                                        onClick={handelStatus}
                                                        className={`my-3 ms-5 p-2 d-block rounded border-0 ${(v.status == true) ? 'bg-success' : 'bg-secondary'} text-white`}
                                                    >
                                                        {(v.status == true) ? "Active" : "Inactive"}
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

export default Page; // Updated export statement
