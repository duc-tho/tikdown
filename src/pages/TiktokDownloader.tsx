import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import {
     Button, Col,Container, FormControl, InputGroup, Row
} from "react-bootstrap";
import { Alert, AlertColor, Snackbar, CircularProgress  } from '@mui/material';
// import "./G.scss";
import { tiktokApi } from "../services/api/tiktok.api";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import FavoriteIcon from '@mui/icons-material/Favorite';

function TiktokDownloader() {
     let [url, setUrl] = useState("");
     let [status, setStatus] = useState("Đang chờ...");
     let [open, setOpen] = useState(false);
     let [loadingData, setLoadingData] = useState(false);
     let notiStatusList: { 
          success:  AlertColor | undefined,
          info:  AlertColor | undefined,
          warning:  AlertColor | undefined,
          error:  AlertColor | undefined
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

          return () => clearTimeout(delayTimeout);
     }, [url]);

     let urlChangeHandle = (e: any) => {
          let targetUrl = e.target.value;

          setUrl(targetUrl);
     };

     let getVid = (url: string) => {
          if (!url) return;

          setStatus(`Đang Lấy Thông Tin Vid ...`);
          setLoadingData(true);
          setOpen(true);

          tiktokApi
               .getSingle(`tiktok?url=${url}`)
               .then((res: any) => {
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
          <Fragment>
               <Container
                    fluid
                    className="h-100 d-flex justify-content-center align-items-center flex-column"
               >
                    <Row>
                         <Col>
                              <h1 className="text-center display-5 text-light title">
                                   Trình tải Video Tiktok
                              </h1>
                              <p className="text-center text-muted">
                                   Được thực hiện bởi {" "}
                                   <span className="fw-bold text-info">
                                        ntho
                                   </span>{" "}
                                        dành cho{" "}
                                   <span className="fw-bold text-danger">
                                        pdan
                                   </span>
                              </p>
                         </Col>
                    </Row>
                    <Row className="w-lg-75">
                         <Col>
                              <InputGroup className="mb-3 glow">
                                   <InputGroup.Text
                                        id="link"
                                        className="bg-dark border-dark text-light"
                                   >
                                        <FavoriteIcon style={{ width: '1rem' }}/>
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
                                        { loadingData ? <CircularProgress size={'1rem'} color="success" /> : <ContentPasteIcon style={{ width: '1rem' }} />}
                                   </Button>
                              </InputGroup>
                         </Col>
                    </Row>
                    <Snackbar
                         open={open}
                    >
                         <Alert
                              severity={ notiStatus }
                              sx={{ width: "100%" }}
                         >
                              { status }
                         </Alert>
                    </Snackbar>
               </Container>
          </Fragment>
     );
}

export default TiktokDownloader;
