import axios from "axios";
import React, { Fragment, useState } from "react";
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
     let id = "";

     let urlChangeHandle = (e: any) => {
          let targetUrl = e.target.value;
          let id = getIdFromUrl(targetUrl);

          setUrl(targetUrl);

          if (!id) return;

          getVid(id);
     };

     let getIdFromUrl = (url: string) => {
          let targetVideo = url.match(/video\/[\d]*/gi);

          if (targetVideo) return targetVideo[0].split("/")[1];
          else return null;
     };

     let getVid = (id: string) => {
          tiktokApi.getSingle(`?aweme_ids=[${id}]`).then((res: any) => {
               axios({
                    url: res.aweme_details[0].video.bit_rate[0].play_addr
                         .url_list[0],
                    method: "GET",
                    responseType: "blob",
               }).then((resp) => {
                    console.log(resp);

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
          });
     };

     let pastClickHandle = () => {
          navigator.clipboard.readText().then((text) => {
               setUrl(text);

               let id = getIdFromUrl(text);

               if (!id) return;

               getVid(id);
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
