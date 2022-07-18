import { Button, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export class Tool extends Component {
     render() {
          return (
               <Container className='h-100 d-flex justify-content-center align-items-center flex-column'>
                    <motion.div
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ duration: 1 }}>
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
                    </motion.div>
               </Container>
          )
     }
}

export default Tool