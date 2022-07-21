import { Typography } from '@mui/material'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import FavoriteIcon from '@mui/icons-material/Favorite';
import classes from './index.module.scss';
import { motion } from 'framer-motion';
import { pushNotiApi } from '../../services/api/tiktok-push-noti.api';

export default function Home() {
     const handleSad = () => pushNotiApi.post({ title: "Anh ơi em buồn!", body: "Ns chuyện với em.." });
     const handlePlay = () => pushNotiApi.post({ title: "Anh ới!", body: "Chơi với emmm!" });

     return (
          <Container className='h-100 d-flex justify-content-center align-items-center flex-column'>
               <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}>
                    <Row>
                         <Col>
                              <Typography variant="h5" className='text-light title text-center'>Chào mừng bé iu đã trở lại</Typography>
                              <p className="text-center">
                                   <FavoriteIcon className={classes.heart} style={{ width: '1rem' }} />
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
                                   <FavoriteIcon className={classes.heart} style={{ width: '1rem' }} />
                              </p>
                         </Col>
                    </Row>

                    <Row>
                         <Col xs="6">
                              <div className='d-flex bg-dark rounded text-light p-4 text-center justify-content-center align-items-center' onClick={handleSad}>
                                   Em Buồn {':<'} nói chuyện với emm đi
                              </div>
                         </Col>
                         <Col xs="6" className='d-flex'>
                              <div className='d-flex bg-dark rounded text-light p-4 text-center justify-content-center align-items-center' onClick={handlePlay}>
                                   <span> Chơi với emmm</span>
                              </div>
                         </Col>
                    </Row>
               </motion.div>
          </Container>
     )
}
