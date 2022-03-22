import React from "react"
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined"
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined"
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined"
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined"
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined"
import { makeStyles } from "@material-ui/core";

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import "./Dashboard.css"
import Account from "./componenets/Account"


export default function Dashboard() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box p={3}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }
      
      TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
      };
      
      function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }
      
      const classes = makeStyles((theme) => ({
        indicator: {
            backgroundColor : "#3797A4"
        },
      }));


    return (
        <div className="dashboard-outer">
            <div className="dashboard-middle">
                <div className="dashboard-inner">

                    <Paper square>
                    <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    aria-label="disabled tabs example"
                    classes={{indicator: classes.indicator }}
                    >
                    <Tab label="Account" icon={<AccountBoxOutlinedIcon />} {...a11yProps(0)} />
                    <Tab label="Verify" icon={<DoneOutlineOutlinedIcon />} {...a11yProps(1)} />
                    <Tab label="Vescover" icon={<ExploreOutlinedIcon />} {...a11yProps(2)} />
                    <Tab label="Vescovered"  icon={<FolderOpenOutlinedIcon/>} {...a11yProps(3)} />
                    <Tab label="Recipes" icon={<FormatListBulletedOutlinedIcon /> } {...a11yProps(4)} />
                    </Tabs>
                    </Paper>
                    <TabPanel value={value} index={0}>
                        <Account />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Verify
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Vescover
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        Vescovered
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        Recipes
                    </TabPanel>

                </div>

            </div>

        </div>
      
     
    );

    
}