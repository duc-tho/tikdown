import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import classes from "./index.module.scss";
import { observer } from "mobx-react-lite";
import { useStore } from '../../store';
import { useEffect } from "react";

const Navigation = () => {
     const { tabStore: { tab, setTab } } = useStore();
     const handleChange = (event: React.SyntheticEvent, newValue: string) => setTab(newValue);
     const pathMap = {
          home: '/',
          tool: '/tool'
     }

     useEffect(() => {
          setTab(window.location.pathname);
     });

     return (
          <BottomNavigation value={tab} onChange={handleChange} className={classes.stickyNavigation}>
               <BottomNavigationAction
                    className={classes.stickyNavigation__button}
                    component={Link}
                    to={pathMap.home}
                    value={pathMap.home}
                    label="Home"
                    icon={<HomeIcon />}
               />
               <BottomNavigationAction
                    className={classes.stickyNavigation__button}
                    component={Link}
                    to={pathMap.tool}
                    value={pathMap.tool}
                    label="Công cụ"
                    icon={<AutoFixHighIcon />}
               />
          </BottomNavigation>
     );
};

export default observer(Navigation);
