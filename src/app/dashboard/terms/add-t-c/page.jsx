'use client'
import React, { useState } from 'react'
import Headers from '../../header/Headers';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

const page = () => {

    const addTerm = async(e)=>{
        e.preventDefault();

        const datas = {
            term:e.target.term.value,
            condition:e.target.condition.value
        }
        
        // console.log(datas)
        try{

            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/terms-conditions/add-terms`,datas)
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
                    //   nav.push('./view-posts');
                    } else if (result.isDenied) {
                      Swal.fire("Changes are not saved", "", "info");
                    }
                  })
            )           
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <div>
            <Headers />
            <div>
                <div className='p-2 border-top border-bottom border-end'>
                    <ul className=' list-unstyled d-flex gap-2 mx-3'>
                        <Link className='text-decoration-none' href='/dashboard' ><li className='text-info'>Home</li></Link>
                        <li>/</li>
                        <li>Add Term And Condition</li>
                    </ul>
                </div>
                <form method='post' onSubmit={addTerm} className=''>
                    <Container>
                        <div className='border-start border-end border-bottom my-4 rounded-top'>
                            <div className='bgg fw-bold fs-3 py-2 px-3'>
                                Add-Term-And-Conditions
                            </div>
                            <div className='container dash' >
                                
                                <label htmlFor="" className='fw-bold fs-4 mt-3 text-white'>
                                    Term :
                                </label>
                                <input type="text" name='term' placeholder='Term' className='d-block w-100 rounded border-2 border-white my-3 p-1' />

                                {/* <label htmlFor="" className='fw-bold fs-4 text-white'>
                                    CAUTION :
                                </label>
                                <input type="text" placeholder='Enter The Caution' className='d-block w-100 rounded border-2 border-white my-3 p-1' />

                                <label htmlFor="" className='fw-bold fs-4 text-white'>
                                    LOCATION :
                                </label>
                                <input type="text" placeholder='Enter Your Location' className='d-block w-100 rounded border-2 border-white my-3 p-1' /> */}

                                <label htmlFor="" className='fw-bold fs-4 text-white'>
                                    Condition :
                                </label>
                                <textarea name="condition" placeholder='Condition' id="" className='d-block w-100 rounded border-2 border-white my-3 p-1' ></textarea>

                                <button className='text-white butt border-0 w-100 p-1 rounded fw-bold fs-3 my-5'>
                                    ADD Term And Condition
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