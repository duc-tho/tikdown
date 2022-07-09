import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import PushPinIcon from '@mui/icons-material/PushPin';
import React from "react";
import { Link } from "react-router-dom";
import classes from "./index.module.scss";

const Navigation = () => {
     const [tab, setTab] = React.useState("recents");
     const handleChange = (event: React.SyntheticEvent, newValue: string) => setTab(newValue);

     return (
          <BottomNavigation value={tab} onChange={handleChange} className={classes.stickyNavigation}>
               <BottomNavigationAction
                    component={Link}
                    to="/tiktok-downloader"
                    label="Công cụ"
                    value="tools"
                    icon={<AutoFixHighIcon />}
               />
               <BottomNavigationAction
                    component={Link}
                    to="/"
                    label="Sự kiện"
                    value="events"
                    icon={<PushPinIcon />}
               />
          </BottomNavigation>
     );
};

export default Navigation;
