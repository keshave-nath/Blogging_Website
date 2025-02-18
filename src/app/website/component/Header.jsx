"use client"
import React, { useContext, useEffect, useState } from 'react'
import { FaHome, FaRegEdit } from 'react-icons/fa';
import { GiNotebook } from "react-icons/gi";
import { CgAddR } from "react-icons/cg";
import { IoPersonSharp, IoReorderThreeOutline } from 'react-icons/io5';
import { RiInformation2Line, RiLockPasswordFill } from "react-icons/ri";
import { PiDotsThreeOutlineVerticalBold } from 'react-icons/pi';
import { IoIosLogOut } from 'react-icons/io';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { ContextAPI } from '../../context/Maincontext'; // Updated path
import { MdDeleteForever } from 'react-icons/md';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Navbar, Nav, NavDropdown, Container, Offcanvas, Button, Form } from 'react-bootstrap';

const Header = () => {
  const nav = useRouter();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { user, setUser ,searchQuery, setSearchQuery } = useContext(ContextAPI)

  const handlelogout = () => {
    Cookies.remove("Blogging_User")
    nav.push("/")
  }

  const checkedifloggedin = () => {
    let cookiedata = Cookies.get("Blogging_User")
    if (!cookiedata) {
      nav.push("/")
    } else {
      cookiedata = JSON.parse(cookiedata);
      setUser(cookiedata)
    }
  }

  const HandelAccountDisable = async () => {
    let newvalues = false;
    try {
      if (window.confirm("Are you Sure You Want to Disable Your Account?")) {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/blogging-services/user/user-status/${user._id}`, { newvalues })
        if (response.status == 200) {
          Swal.fire({
            title: "Success",
            text: "Account Is Disabled Successfully !",
            icon: 'success'
          }).then((res) => (
            handlelogout()
          ))
        }
        if (response.status != 200) {
          Swal.fire({
            title: "Error",
            text: "Something went wrong !",
            icon: 'error'
          })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const Handelaccountdelete = async () => {
    try {
      if (window.confirm("Are you Sure You Want to Disable Your Account?")) {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/api/blogging-services/user/delete-account/${user._id}`);
        if (response.status == 200) {
          Swal.fire({
            title: "Success",
            text: "Account Is Being Successfully Deleted !",
            icon: 'success'
          }).then((res) => (
            handlelogout()
          ))
        }
        if (response.status != 200) {
          Swal.fire({
            title: "Error",
            text: "Something went wrong !",
            icon: 'error'
          })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkedifloggedin();
  }, []) // Added dependency

  // console.log(user)

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg" sticky="top" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/website/Index" className='fw-bold fs-2'>BLOG</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Collapse id="offcanvasNavbar" className="d-none d-lg-flex">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link href="/website/Index" className='d-flex gap-2 pt-4'>
                <FaHome className='text-white fs-5' /><p>Home</p>
              </Nav.Link>
              <Nav.Link href="/website/Addblog" className='d-flex gap-2 pt-4'>
                <CgAddR className='text-white fs-5' /><p>Add</p>
              </Nav.Link>
              <NavDropdown title="More" className='d-flex gap-2 pt-3' id="navbarScrollingDropdown">
                <NavDropdown.Item href="/website/Profile" className='d-flex gap-2'>
                  <IoPersonSharp className='text-white fs-5' /><p>Profile</p>
                </NavDropdown.Item>
                <NavDropdown.Item href={`/website/EditProfile/${user._id}`} className='d-flex gap-2'>
                  <FaRegEdit className='fs-5 text-white' /><p>Edit Profile</p>
                </NavDropdown.Item>
                <NavDropdown.Item href="/website/TermsAndConditions" className='d-flex gap-2'>
                  <GiNotebook className='fs-5 text-white' /><p>Terms & Conditions</p>
                </NavDropdown.Item>
                <NavDropdown.Item href="/website/Forgetpassword" className='d-flex gap-2'>
                  <RiLockPasswordFill className='fs-5 text-white' /><p>Forget Password</p>
                </NavDropdown.Item>
                <NavDropdown.Item href="#" className='d-flex gap-2' onClick={HandelAccountDisable}>
                  <RiInformation2Line className='fs-4 text-white' /><p>Account Temporarily Disable</p>
                </NavDropdown.Item>
                <NavDropdown.Item href="#" className='d-flex gap-2' onClick={Handelaccountdelete}>
                  <MdDeleteForever className='fs-4 text-white' /><p>Account Permanently Delete</p>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#" className='d-flex gap-2' onClick={handlelogout}>
                  <IoIosLogOut className='text-white fs-3' /><p>Log-out</p>
                </NavDropdown.Item>
              </NavDropdown>
              
            </Nav>
            <Form className="d-flex mt-3">
              <Form.Control type="search" placeholder="Search" name='search' className="me-2" aria-label="Search"  value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} />
              {/* <Button variant="outline-success">Search</Button> */}
            </Form>
          </Navbar.Collapse>

          <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="start" className="bg-dark text-white d-lg-none">
          <Offcanvas.Header closeButton >
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              <Nav.Link href="/website/Index" className='d-flex gap-2 pt-4'>
                <FaHome className='text-white fs-5' /><p>Home</p>
              </Nav.Link>
              <Nav.Link href="/website/Addblog" className='d-flex gap-2 pt-4'>
                <CgAddR className='text-white fs-5' /><p>Add</p>
              </Nav.Link>
              <NavDropdown title="More" className='d-flex gap-2 pt-3' id="navbarScrollingDropdown">
                <NavDropdown.Item href="/website/Profile" className='d-flex gap-2 text-white'>
                  <IoPersonSharp className='text-white fs-5' /><p>Profile</p>
                </NavDropdown.Item>
                <NavDropdown.Item href={`/website/EditProfile/${user._id}`} className='d-flex gap-2 text-white'>
                  <FaRegEdit className='fs-5 text-white' /><p>Edit Profile</p>
                </NavDropdown.Item>
                <NavDropdown.Item href="/website/TermsAndConditions" className='d-flex gap-2 text-white'>
                  <GiNotebook className='fs-5 text-white' /><p>Terms & Conditions</p>
                </NavDropdown.Item>
                <NavDropdown.Item href="/website/Forgetpassword" className='d-flex gap-2 text-white'>
                  <RiLockPasswordFill className='fs-5 text-white' /><p>Forget Password</p>
                </NavDropdown.Item>
                <NavDropdown.Item href="#" className='d-flex gap-2 text-white' onClick={HandelAccountDisable}>
                  <RiInformation2Line className='fs-4 text-white' /><p>Account Temporarily Disable</p>
                </NavDropdown.Item>
                <NavDropdown.Item href="#" className='d-flex gap-2 text-white' onClick={Handelaccountdelete}>
                  <MdDeleteForever className='fs-4 text-white' /><p>Account Permanently Delete</p>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#" className='d-flex gap-2 text-white' onClick={handlelogout}>
                  <IoIosLogOut className='text-white fs-3' /><p>Log-out</p>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex mt-3">
              <Form.Control type="search" placeholder="Search" name='search' className="me-2" aria-label="Search" value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} />
              {/* <Button variant="outline-success">Search</Button> */}
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>

        </Container>
      </Navbar>
    </>
  )
}

export default Header;
