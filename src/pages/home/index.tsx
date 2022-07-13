import { Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import FavoriteIcon from '@mui/icons-material/Favorite';
import classes from './index.module.scss';

export default function Home() {
     return (
          <Fragment>
               <Container className='h-100 d-flex justify-content-center align-items-center flex-column'>
                    <Row>
                         <Col>
                              <Typography variant="h5" className='text-light title text-center'>Chào mừng bé iu đã trở lại</Typography>
                              <p className="text-center">
                                   <FavoriteIcon className={classes.heart} style={{ width: '1rem' }}/>
                                   {" "}
                                   <span className="fw-bold text-danger">
                                        Iu
                                   </span>
                                   {" "}     
                                   <span className="fw-bold text-info">
                                        pdan
                                   </span>
                                   {" "}
                                   <span className="fw-bold text-warning">
                                        số 1 thế giới
                                   </span>
                                   {" "}
                                   <FavoriteIcon className={classes.heart} style={{ width: '1rem' }}/>
                              </p>
                         </Col>
                    </Row>
               </Container>
          </Fragment>
     )
}
