'use client'
import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import axios from 'axios'

const Page = () => {

    const [fetchData, setfetchData] = useState([])
    const fetchTerms = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/terms-conditions/fetch-active-terms`)
            if (response.status == 200) {
                setfetchData(response.data.data);
            }
            //    console.log(response.data.data); 
        }
        catch (error) {
            console.log(error);
        }
    }
useEffect(()=>{fetchTerms();},[])

// console.log(fetchData)
    return (
        <>
            <Header />
            <div className="container scrollT">
                <h1 className='text-center my-2'>
                    Terms And Conditions
                </h1>
                {
                    fetchData.length==0?
                    <h1 className='text-center fs-4 my-5' style={{height:'450px'}} >
                        No Terms And Conditions Found
                    </h1>
                    :
                    fetchData.map((item, index) => (
                        <div className='border-bottom my-5 p-2' key={item._id} >
                    <b className='fs-4'>{item.term} : </b>
                    <p className='my-2 text-secondary'>{item.condition}</p>
                </div>
                    ))
                }

            </div>
            <Footer />
        </>
    )
}

export default Page