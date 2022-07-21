import React, { Component, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "../../components/navigation";
import TiktokDownloader from "../../components/tiktok-downloader";
import Home from "../home";
import Tool from "../tool";
import classes from "./index.module.scss";
import { Provider, store } from "../../store";
import Overlay from "../../components/overlay";
import { motion } from "framer-motion";
import { fetchToken } from "../../core/firebase";
export default function Master() {
     useEffect(() => fetchToken());

     return (
          <Provider value={store}>
               <BrowserRouter>
                    <motion.div className={classes.wrap}
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ duration: 1 }}>
                         <div className={classes.pageContentSection}>
                              <Routes>
                                   <Route index element={<Home />} />
                                   <Route path="tool">
                                        <Route index element={<Tool />} />
                                        <Route path="tiktok-downloader" element={<TiktokDownloader />} />
                                   </Route>
                              </Routes>
                         </div>
                         <Navigation />
                    </motion.div>
                    <Overlay></Overlay>
               </BrowserRouter>
          </Provider>
     );
}
