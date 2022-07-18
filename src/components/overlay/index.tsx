import React, { useEffect } from 'react'
import { useStore } from '../../store';
import classes from './index.module.scss';
import { ReactSVG } from 'react-svg';
import { observer } from 'mobx-react-lite';

const iconList = ['heart', 'bars', 'infinity'];
let randomIconIndex = Math.floor(Math.random() * 3);
let loadingIcon = require(`../../assets/image/${iconList[randomIconIndex]}.svg`);

const Overlay = () => {
     const { overlayStore: { showOverlay } } = useStore();
     console.log(classes);
     
     return (
          <div className={`${classes.wrap} ${showOverlay ? classes.active : ''}`}>
               <div className={classes.overlay}>
                    <ReactSVG src={loadingIcon}/>
               </div>
          </div>
     )
};

export default observer(Overlay);