import { Button, Typography } from '@mui/material'
import React, { Component, Fragment } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export class Tool extends Component {
     render() {
          return (
               <Fragment>
                    <Container className='h-100 d-flex justify-content-center align-items-center flex-column'>
                         <Row>
                              <Col>
                                   <Typography variant="h5" className='text-light title text-center'>Công cụ</Typography>
                              </Col>
                         </Row>
                         <Row className='mt-3'>
                              <Link to="/tool/tiktok-downloader">
                                   <Button variant="contained">Tải vid tiktok</Button>
                              </Link>
                         </Row>
                    </Container>
               </Fragment>
          )
     }
}

export default Tool