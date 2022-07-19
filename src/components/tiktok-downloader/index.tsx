import axios from "axios";
import React, { useEffect, useState } from "react";
import {
     Button, Col, Container, FormControl, InputGroup, Row
} from "react-bootstrap";
import { Alert, AlertColor, Snackbar, CircularProgress, List, ListItem, ListItemButton, ListItemText, Typography, Link } from '@mui/material';
// import "./G.scss";
import { tiktokApi } from "../../services/api/tiktok.api";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import FavoriteIcon from '@mui/icons-material/Favorite';
import classes from './index.module.scss';
import { motion } from "framer-motion";
import { tiktokHistoryApi } from "../../services/api/tiktok-history.api";

function TiktokDownloader() {
     let [url, setUrl] = useState("");
     let [status, setStatus] = useState("Đang chờ...");
     let [open, setOpen] = useState(false);
     let [loadingData, setLoadingData] = useState(false);
     let [histories, setHistories] = useState([]);
     let notiStatusList: {
          success: AlertColor | undefined,
          info: AlertColor | undefined,
          warning: AlertColor | undefined,
          error: AlertColor | undefined
     } = {
          success: 'success',
          info: 'info',
          warning: 'warning',
          error: 'error'
     };
     let [notiStatus, setNotiStatus] = useState(notiStatusList.info);

     useEffect(() => {
          const delayTimeout = setTimeout(() => {
               getVid(url);
          }, 1000);

          getHistories();

          return () => clearTimeout(delayTimeout);
     }, [url]);

     let urlChangeHandle = (e: any) => {
          let targetUrl = e.target.value;

          setUrl(targetUrl);
     };

     let getHistories = () => {
          tiktokHistoryApi.getAll().then((res: any) => {
               if (res.data === null) return;
               
               setHistories(Object.values(res ?? []));
          });
     }

     let saveHistories = (data: any) => {
          tiktokHistoryApi.post(data)
               .then(() => getHistories())
               .catch((e: any) => console.log(`Lỗi save history: ${e}`));
     }

     let getVid = (url: string) => {
          if (!url) return;

          setStatus(`Đang Lấy Thông Tin Vid ...`);
          setLoadingData(true);
          setOpen(true);

          tiktokApi
               .getSingle(`tiktok?url=${url}`)
               .then((res: any) => {
                    const newHistory = {
                         title: res.video_title,
                         url,
                         wm: res.wm_video_url,
                         nwm: res.nwm_video_url,
                         createdAt: new Date().getTime()
                    };

                    if (res.name && res.name === "AxiosError") {
                         setNotiStatus(notiStatusList.error);
                         setLoadingData(false);
                         setStatus(
                              `Lỗi dùi: ${res.response.data.reason ||
                              "[500] Hong bít lỗi gì"}`
                         );

                         setTimeout(() => {
                              setOpen(false);
                              setNotiStatus(notiStatusList.info);
                         }, 4000);
                         return;
                    }

                    setNotiStatus(notiStatusList.info);
                    setStatus(`Đang Tải xún`);

                    axios({
                         url: res.nwm_video_url,
                         method: "GET",
                         responseType: "blob",
                         headers: {
                              "Content-type": "application/octet-stream"
                         }
                    }).then(resp => {
                         let link = document.createElement("a");

                         link.target = "_blank";
                         link.download = `${new Date().getTime()}.mp4`;
                         link.href = URL.createObjectURL(
                              new Blob([resp.data], { type: "video/mp4" })
                         );
                         link.download = "";
                         link.click();
                         link.remove();

                         setNotiStatus(notiStatusList.success);
                         setLoadingData(false);
                         setStatus(`Tải xún thành công! - ${res.video_title}`);
                         setUrl("");
                         saveHistories(newHistory);

                         setTimeout(() => {
                              setOpen(false)
                              setNotiStatus(notiStatusList.info);
                         }, 4000);
                    });
               })
               .catch((error: any) => {
                    console.log(error);
               });
     };

     let pastClickHandle = () => {
          let clipboard = "";
          navigator.clipboard.readText().then(text => {
               setUrl(text);
               clipboard = text;
          });

          getVid(clipboard);
     };

     return (
          <Container
               fluid
               className="h-100 d-flex justify-content-center align-items-center flex-column"
          >
               <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}>
                    <Row>
                         <Col>
                              <h1 className="text-center display-5 title">
                                   Trình tải Video Tiktok
                              </h1>
                              <p className={`${classes.description} text-center text-muted rounded py-1 px-2`}>
                                   Được thực hiện bởi {" "}
                                   <span className="fw-bold text-info">
                                        ntho
                                   </span>{" "}
                                   dành cho{" "}
                                   <span className="fw-bold text-warning">
                                        pdan
                                   </span>
                              </p>
                         </Col>
                    </Row>
                    <Row className="w-100 m-0">
                         <Col className="col-12 mx-auto">
                              <InputGroup className="mb-3 glow">
                                   <InputGroup.Text
                                        id="link"
                                        className="bg-dark border-dark text-light"
                                   >
                                        <FavoriteIcon style={{ width: '1rem' }} />
                                   </InputGroup.Text>
                                   <FormControl
                                        value={url}
                                        className="input bg-dark text-light"
                                        placeholder="Copy link zô ây nè"
                                        aria-label="Link"
                                        aria-describedby="link"
                                        onInput={urlChangeHandle}
                                   />
                                   <Button
                                        className="btn-dark"
                                        onClick={pastClickHandle}
                                        disabled={loadingData}
                                   >
                                        {loadingData ? <CircularProgress size={'1rem'} color="success" /> : <ContentPasteIcon style={{ width: '1rem' }} />}
                                   </Button>
                              </InputGroup>
                         </Col>
                    </Row>
                    <Row className="m-0">
                         <Col className={`${classes.historyWrap} col-12 mx-auto`}>
                              {histories && histories.length > 0 && <List className={`${classes.listBg} text-light shadow rounded`}>
                                   {histories.map((history: any, index) => <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1 }}
                                        key={index}>
                                        <Link href={history.url} target="_blank" className="text-light" style={{ textDecoration: 'none' }}>
                                             <ListItem>
                                                  <ListItemText className={classes.historyTitle}
                                                       primary={history.title}
                                                       primaryTypographyProps={{ style: { wordBreak: 'break-all' } }}
                                                       secondary={
                                                            <small className="text-muted">
                                                                 {new Intl.DateTimeFormat("vi", { dateStyle: 'full', timeStyle: 'medium' }).format(history.createdAt)}
                                                            </small>
                                                       } />
                                             </ListItem>
                                        </Link>
                                        <hr className="m-0" />
                                   </motion.div>
                                   )}
                              </List>}
                         </Col>
                    </Row>
                    <Snackbar
                         open={open}
                    >
                         <Alert
                              severity={notiStatus}
                              sx={{ width: "100%" }}
                         >
                              {status}
                         </Alert>
                    </Snackbar>
               </motion.div>
          </Container>
     );
}

export default TiktokDownloader;
