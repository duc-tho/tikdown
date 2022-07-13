import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "../../components/navigation";
import TiktokDownloader from "../../components/tiktok-downloader";
import Home from "../home";
import Tool from "../tool";
import classes from "./index.module.scss";

export default class Master extends Component {
     render() {
          return (
               <BrowserRouter>
                    <div className={classes.wrap}>
                         <div className={classes.pageContentSection}>
                              <Routes>
                                   <Route index element={<Home/>}/>
                                   <Route path="tool">
                                        <Route index element={<Tool/>}/>
                                        <Route path="tiktok-downloader" element={<TiktokDownloader />} />
                                   </Route>
                              </Routes>
                         </div>
                         <Navigation />
                    </div>
               </BrowserRouter>
          );
     }
}
