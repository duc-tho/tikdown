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
                    });
               })
               .catch((error: any) => {
                    console.log(error);
               });
     };

     let pastClickHandle = () => {
          navigator.clipboard.readText().then((text) => {
               setUrl(text);
               getVid(text);
          });
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
                                        Link
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
               </Container>
          </Fragment>
     );
}

export default App;
