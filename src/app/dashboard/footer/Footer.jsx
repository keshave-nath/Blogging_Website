import React from 'react'
import { Container } from 'react-bootstrap'

const page = () => {
  return (
    <Container>
      <div className='d-flex foot justify-content-between w-100'>
        <div>
        <span className='text-primary'>All Rights Reserved</span> © 2024 Frank and Oak.
        </div>
        <div>
        Design By <span className='text-primary'>WsCube Tech</span>
        </div>
    </div>
    </Container>
  )
}

export default page