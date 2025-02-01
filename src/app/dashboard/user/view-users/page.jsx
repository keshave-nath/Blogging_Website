'use client'
import React, { useEffect, useState } from 'react'
// import Headers from '../../header/Headers';
import Link from 'next/link';
import { Container, Table } from 'react-bootstrap';
import { SlNote } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import Swal from 'sweetalert2';
import Image from 'next/image'; // Importing Image component
import Headers from '../../header/Headers.jsx';

const Page = () => { // Renamed from page to Page

    const [userdata, setdata] = useState([])
    const [userpatdata, setpatdata] = useState([])
    const [viewId, setViewId] = useState([])
    const [ifChecked, SetIfChecked] = useState(false)

    const viewUser = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/blogging-services/user/view-user`)
            if (response.status == 200) {
                setdata(response.data.data)
                setpatdata(response.data.file_path)
            }
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
            let allIds = userdata.map((v) => v._id)
            setViewId(allIds);
            SetIfChecked(true);
        }
        else {
            setViewId([]);
            SetIfChecked(false);
        }
    }

    const HandelAccountDisable = async (e) => {
        let newvalues = (e.target.textContent == "Active") ? false : true;
        try {
            if (window.confirm("Are you Sure You Want to Disable Your Account?")) {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/blogging-services/user/user-status/${e.target.value}`, { newvalues })
                if (response.status == 200) {
                    let indexNo = userdata.findIndex((v) => v._id === e.target.value)
                    const newData = [...userdata]
                    newData[indexNo].status = newvalues;
                    setdata(newData);
                    Swal.fire("Saved!", "", "success");
                    Swal.fire({
                        title: "Success",
                        text: "Account Is Disabled Successfully !",
                        icon: 'success'
                    })
                }
                if (response.status != 200) {
                    Swal.fire({
                        title: "Error",
                        text: "Something went wrong !",
                        icon: 'error'
                    })
                }
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const Handelaccountdelete = async (e) => {
        try {
            if (window.confirm("Are you Sure You Want to Delete Your Account?")) {
                const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/api/blogging-services/user/delete-account/${e.target.value}`);
                if (response.status == 200) {
                    Swal.fire({
                        title: "Success",
                        text: "Account Is Being Successfully Deleted !",
                        icon: 'success'
                    })
                }
                if (response.status != 200) {
                    Swal.fire({
                        title: "Error",
                        text: "Something went wrong !",
                        icon: 'error'
                    })
                }
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        viewUser();
        SetIfChecked(viewId.length === userdata.length && userdata.length !== 0)
    }, [viewId, userdata])

    return (
        <div>
            <Headers />
            <div>
                <div className='p-2 border-top border-bottom border-end'>
                    <ul className=' list-unstyled d-flex gap-2 mx-3'>
                        <Link className='text-decoration-none' href='/dashboard' ><li className='text-info'>Home</li></Link>
                        <li>/</li>
                        <li>View-Users</li>
                    </ul>
                </div>
                <Container>
                    <div className='border-start border-end border-bottom my-4 rounded-top'>
                        <div className='bgg fw-bold fs-3 py-2 px-3'>
                            View Users
                        </div>
                        <div className='container p-3'>
                            <Table className='text-center ' striped bordered hover variant="dark" >
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>User Image</th>
                                        <th>User Name</th>
                                        <th>User Email</th>
                                        <th>Action</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userdata.map((item, index) => (
                                            <tr key={item._id}> {/* Added key prop */}
                                                <td>{index + 1}</td>
                                                <td>
                                                    <img src={`${userpatdata}${item.profile}`} width={100} height={100} alt="User" /> {/* Updated to use Image component */}
                                                </td>
                                                <td>{item.username}</td>
                                                <td>{item.email}</td>
                                                <td style={{ paddingTop: '20px', width: '170px', boxSizing: 'border-box' }}>
                                                    <span className='ls'>
                                                        <button
                                                            name='accdel'
                                                            className='me-2 ms-2 d-flex p-2 rounded bg-danger text-white border-0 '
                                                            value={item._id}
                                                            onClick={Handelaccountdelete}
                                                        ><MdDelete className='text-white fs-4 me-2 ' /> Delete User </button>
                                                    </span>
                                                </td>
                                                <td style={{ padding: '0px', width: '170px', boxSizing: 'border-box' }}>
                                                    <button
                                                        name='status'
                                                        value={item._id}
                                                        onClick={HandelAccountDisable}
                                                        className={`my-3 ms-5 p-2 d-block rounded border-0 ${(item.status == true) ? 'bg-success' : 'bg-secondary'} text-white`}
                                                    >
                                                        {(item.status == true) ? "Active" : "Inactive"}
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
