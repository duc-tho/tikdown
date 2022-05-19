import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import {
     Button,
     Col,
     Container,
     FormControl,
     InputGroup,
     Row,
} from "react-bootstrap";
import "./App.scss";
import { tiktokApi } from "./services/api/tiktok.api";

function App() {
     let [url, setUrl] = useState("");
     let [status, setStatus] = useState("Đang chờ...");

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
          if(!url) return;

          tiktokApi
               .getSingle(`tiktok?url=${url}`)
               .then((res: any) => {
                    if (res.name && res.name === "AxiosError") {
                         alert(
                              `Lỗi dùi: ${
                                   res.response.data.reason ||
                                   "[500] Hong bít lỗi gì"
                              }`
                         );
                         return;
                    }

                    setStatus(`Đang Tải xún ...`);

                    axios({
                         url: res.nwm_video_url,
                         method: "GET",
                         responseType: "blob",
                         headers: {
                              "Content-type": "application/octet-stream",
                         },
                    }).then((resp) => {
                         let link = document.createElement("a");
                         link.target = "_blank";
                         link.download = `${new Date().getTime()}.mp4`;
                         link.href = URL.createObjectURL(
                              new Blob([resp.data], { type: "video/mp4" })
                         );
                         link.download = "";
                         link.click();
                         link.remove();

                         setStatus(`Tải xong vid... ${res.video_title}`);
                         setUrl('');

                         setTimeout(() => {
                              setStatus(`Đang chờ...`);
                         }, 7000);
                    });
               })
               .catch((error: any) => {
                    console.log(error);
               });
     };

     let pastClickHandle = () => {
          let clipboard = "";
          navigator.clipboard.readText().then((text) => {
               setUrl(text);
               clipboard = text;
          });

          getVid(clipboard);
     };

     return (
          <Fragment>
               <Container
                    fluid
                    className="vh-100 d-flex justify-content-center align-items-center flex-column"
               >
                    <Row>
                         <Col>
                              <h1 className="text-center display-5 text-light title">
                                   Tiktok Downloader
                              </h1>
                              <p className="text-center text-muted">
                                   Made by{" "}
                                   <span className="fw-bold text-info">
                                        ntho
                                   </span>{" "}
                                   for{" "}
                                   <span className="fw-bold text-danger">
                                        pdan
                                   </span>
                              </p>
                         </Col>
                    </Row>
                    <Row className="w-lg-50">
                         <Col>
                              <InputGroup className="mb-3 glow">
                                   <InputGroup.Text
                                        id="link"
                                        className="bg-dark border-dark text-light"
                                   >
                                        Moah :3
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
                                   >
                                        Dán
                                   </Button>
                              </InputGroup>
                         </Col>
                    </Row>
                    <Row>
                         <Col>
                              <h5 className="white-glow py-1 px-2 rounded text-success">{status}</h5>
                         </Col>
                    </Row>
               </Container>
          </Fragment>
     );
}

export default App;
