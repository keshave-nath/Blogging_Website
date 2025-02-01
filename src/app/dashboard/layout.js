'use client'
import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css';
import { ListGroup } from 'react-bootstrap';
import "./globals.css";
import { TfiDashboard } from "react-icons/tfi";
import { CiDroplet } from "react-icons/ci";
import { LiaHandPointerSolid } from "react-icons/lia";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { BsBasket } from "react-icons/bs";
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import { LuPenLine } from "react-icons/lu";
import { IoNewspaperOutline } from "react-icons/io5";

import Footer from "../dashboard/footer/Footer";

import { MdOutlineSettings } from "react-icons/md";
import Link from 'next/link';
import { IconContext } from 'react-icons';
import Left from './Left/Page'

export default function layout({ children }) {

    return (
        <>
            <div className='d-flex'>
                <Left />
                <div className='d_right'>
                    <div className='ft'>
                        {children}
                    </div>

                </div>
            </div>

        </>
    )
}
