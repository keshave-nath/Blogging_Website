'use client'
import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const Page = () => {
  const nav = useRouter();
  const params = useParams();
 const [ imgPres, setImgPres ] = useState({});
 const [UserData,SetUserData] = useState([]);

 const [fetchSingle, setfetchSingle] = useState([])
    const [pat, setpat] = useState([])
    const [prof,setprof] = useState([])

    const fetchuserPost = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/blogging-services/user-posts/fetch-single-post/${params._id}`)
            if (response.status != 200) {
                alert("error")
            }
            if (response.status == 200) {
                setfetchSingle(response.data.data)
                setpat(response.data.file_Path)
                setprof(response.data.data.userr)
            }

        }
        catch (error) {
            console.log(error)
        }
    }

 const handelReports = async(e)=>{
    e.preventDefault();

    const datas={
      thumbnail:fetchSingle.thumbnail,
      name:e.target.name.value,
      username:e.target.username.value,
      reportt:e.target.reportt.value,
      reportid:params._id,
    }
    try{
       if( !window.confirm("Do you want to Report this Profile"))return 

        let response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/reports/add-reports`,datas)

        if(response.status!==200)return(
          Swal.fire({
            title:"Oops ",
            text:"Something Went Wrong !!",
            icon:"error",
       })
        )
        if(response.status==200)return(
            Swal.fire({
            title:"SUCCESS !! ",
            text:"Report has been Successfully Submitted !",
            icon:"success",
        }).then((res)=>(
 
          handelLocation()
        ))
        )
    }
    catch(error){
        console.log(error)
        
        Swal.fire({
            title:"Something Went Wrong !! ",
            text:"Something Went Wrong in Server !!",
            icon:"error",
       })
    }
}

const handelLocation=()=>{
  nav.push("/website/Index")
}

   const handleFileSelect = (e)=>{
     const fieldname = e.target.name;
 
       const reader = new FileReader();
         
       const file = e.target.files[0];
   
       if(file){
         reader.readAsDataURL(file);
       }
   
       reader.onload = ()=>{
         setImgPres((prevState)=>({...prevState, [fieldname]:reader.result}));
       }
 
   };

   useEffect(()=>{
    fetchuserPost();
   },[])

   return (
    <>
    <Header/>
     <div className='w-100 py-4 d-flex justify-content-center align-items-center backk'
     >      
       <div className='container col-12 col-lg-6 mb-1 p-5 rounded'
         style={{
           boxShadow:'0px 0px 10px 8px white'
         }}
       >
         <div>
           <h1 className='text-center text-white'>Report !!</h1>
         </div>
         <form onSubmit={handelReports}>
            <label htmlFor="" className='fw-bold fs-4 text-white'>
                 IMAGE : 
             </label>
             <div className='w-50 text-white my-3 '>
               <img src={`${fetchSingle.thumbnail}`} alt="Profile " name='thumbnail' className='p-1' width='100%' />
             </div>
             <input type="text" name='thumbnail' value={fetchSingle.title}  placeholder='Enter Your Title' className='d-block w-100 bg-white text-black rounded border-0 my-3 p-1' />
             <label htmlFor="" className='fw-bold fs-4 text-white'>
                 Name : 
             </label>
             <input type="text" placeholder='Enter Your Name' name='name' value={prof.name} className='d-block w-100 rounded border-0 my-3 p-1' /> 
 
             <label htmlFor="" className='fw-bold fs-4 text-white'>
                 Username : 
             </label>
             <input type="text" placeholder='Enter Your Username' name='username' value={prof.username} className='d-block w-100 rounded border-0 my-3 p-1' /> 
              
             <label htmlFor="" className='fw-bold fs-4 text-white'>
                Report : 
             </label>
             <textarea name='reportt' placeholder='Enter Your Trip Experience' maxLength={620} id="" className='d-block w-100 rounded border-0 my-3 p-1' ></textarea>  
 
             <button className='text-white butt border-0 w-100 p-1 rounded fw-bold fs-3 mt-5'>  
               Report
             </button>
         </form>    
     </div>
     </div>
     </>
   )
 }
 

export default Page