import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "../../components/navigation";
import TiktokDownloader from "../TiktokDownloader";
import classes from "./index.module.scss";

export default class Master extends Component {
     render() {
          return (
               <BrowserRouter>
                    <div className={classes.wrap}>
                         <div className={classes.pageContentSection}>
                              <Routes>
                                   <Route
                                        path="/tiktok-downloader"
                                        element={<TiktokDownloader />}
                                   />
                              </Routes>
                         </div>
                         <Navigation />
                    </div>
               </BrowserRouter>
          );
     }
}
