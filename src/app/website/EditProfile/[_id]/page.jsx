'use client'
import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const page = () => {
  const nav = useRouter();
 const [ imgPres, setImgPres ] = useState({});
 const [UserData,SetUserData] = useState([]);

 const handelUser = ()=>{
    const cookiedata= JSON.parse(Cookies.get("Blogging_User"))
    if(cookiedata){
        SetUserData(cookiedata);
    }
 }
 
 const handelUpdateprofile = async(e)=>{
    e.preventDefault();

    const datas=e.target
    try{
       if( !window.confirm("Do you want to update this Profile"))return 
    //    console.log(datas)
        let response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/blogging-services/user/update-user/${UserData._id}`,datas)
        // // console.log(datas,response)
        if(response.status!==200)return(
           Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
           })
        )
        if(response.status==200)return(
            Swal.fire({
              title: 'Success',
              text: 'Profile Updated',
              icon: 'success',
            }).then((res)=>(
              handelOut()
            ))
        )
        // swal({
        //     title:"SUCCESS !! ",
        //     text:"Data has been Successfully Updated",
        //     icon:"success",
        // })
        
        
    }
    catch(error){
        console.log(error)
          Swal.fire({
                    title:"Oops ",
                    text:"Internal Server Error Try After Sometime !",
                    icon:"error",
                })
    }
}
const handelOut = ()=>{
  Cookies.remove("Blogging_User")
  nav.push("/")
}
   const handleFileSelect = (e)=>{
     const fieldname = e.target.name;
 
       const reader = new FileReader();
         
       const file = e.target.files[0];
   
       if(file){
         reader.readAsDataURL(file);
       }
   
       reader.onload = ()=>{
         // setImgPres({...imgPres,fieldname: reader.result })
         
         setImgPres((prevState)=>({...prevState, [fieldname]:reader.result}));
         // SetAdminData((prevState)=>({...prevState, [fieldname]:reader.result}));
       }
 
   };

   useEffect(()=>{handelUser();  },[])
console.log(UserData)
   return (
    <>
    <Header/>
     <div className='w-100 py-4 d-flex justify-content-center align-items-center backk'
     style={{
       // height:'100vh'
     }}
     >      
       <div className='container col-12 col-lg-6 mb-1 p-5 rounded'
         style={{
           boxShadow:'0px 0px 10px 8px white'
         }}
       >
         <div>
           <h1 className='text-center text-white'>Edit YOUR Profile !!</h1>
         </div>
         <form onSubmit={handelUpdateprofile}>
            <label htmlFor="" className='fw-bold fs-4 text-white'>
                 IMAGE : 
             </label>
             <div className='w-50 text-white my-3 '>
               <img src={imgPres.profile || `${process.env.NEXT_PUBLIC_SERVER}/keshaveBlog-files/users/${UserData.profile}`}  alt="Profile " name='profile' className='p-1' width='100%' />
             </div>
             <input type="file" name='profile' onChange={handleFileSelect} placeholder='Enter Your Title' className='d-block w-100 bg-white text-black rounded border-0 my-3 p-1' />
             <label htmlFor="" className='fw-bold fs-4 text-white'>
                 Name : 
             </label>
             <input type="text" placeholder='Enter Your Name' name='name' value={UserData.name} onChange={(e) => { SetUserData({ ...UserData, name: e.target.value }) }} className='d-block w-100 rounded border-0 my-3 p-1' /> 
 
             <label htmlFor="" className='fw-bold fs-4 text-white'>
                 Username : 
             </label>
             <input type="text" placeholder='Enter Your Username'  name='username' value={UserData.username} onChange={(e) => { SetUserData({ ...UserData, username: e.target.value }) }} className='d-block w-100 rounded border-0 my-3 p-1' /> 
             {/* <label htmlFor="" className='fw-bold fs-4 text-white'>
                 Bio : 
             </label>
             <input type="text" name='bio' placeholder='Enter Bio' className='d-block w-100 rounded border-0 my-3 p-1' /> */}
 
             <label htmlFor="" className='fw-bold fs-4 text-white'>
                 Blogging Type : 
             </label>
             <input type="text" name='type' value={UserData.type} onChange={(e) => { SetUserData({ ...UserData, type: e.target.value }) }} placeholder='Enter Your Location' className='d-block w-100 rounded border-0 my-3 p-1' /> 
 
             <label htmlFor="" className='fw-bold fs-4 text-white'>
             Bio : 
             </label>
             <textarea name='bio' value={UserData.bio} onChange={(e) => { SetUserData({ ...UserData, bio: e.target.value }) }} placeholder='Enter Your Trip Experience' maxLength={620} id="" className='d-block w-100 rounded border-0 my-3 p-1' ></textarea>  
 
             <button className='text-white butt border-0 w-100 p-1 rounded fw-bold fs-3 mt-5'>  
               Edit your Profile
             </button>
         </form>    
     </div>
     </div>
     </>
   )
 }
 

export default page