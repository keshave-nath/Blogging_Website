'use client'
// import Image from "next/image";
import "./globals.css";
import Loginform from "./website/component/Loginform";
// import LoginImage from "../../public/images/login.webp"

export default function Home() {
  return (
    <div style={{
      width:'100%',
      margin:'0px',
      padding:'0px',
      height:'100vh',
    }} className="back d-flex justify-content-center align-items-center" >
             <Loginform/>
             {/* <img src={LoginImage} width={200} height={300}/> */}
    </div>
  );
}
