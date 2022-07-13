import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import classes from "./index.module.scss";
import React from "react";

console.log(classes);

const Navigation = () => {
     const [tab, setTab] = React.useState("home");
     const handleChange = (event: React.SyntheticEvent, newValue: string) => setTab(newValue);
     
     return (
          <BottomNavigation value={tab} onChange={handleChange} className={classes.stickyNavigation}>
                <BottomNavigationAction
                    className={classes.stickyNavigation__button}
                    component={Link}
                    to="/"
                    label="Home"
                    value="home"
                    icon={<HomeIcon />}
               />
               <BottomNavigationAction
                    className={classes.stickyNavigation__button}
                    component={Link}
                    to="/tool"
                    label="Công cụ"
                    value="tools"
                    icon={<AutoFixHighIcon />}
               />
          </BottomNavigation>
     );
};

export default Navigation;
