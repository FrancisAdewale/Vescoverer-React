import React, {useState, useEffect, useRef,} from "react"
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
import Vescover from "./componenets/Vescover"
import {auth , provider, db, storage} from './firebase.js';
import Geocode from "react-geocode";
import Badge from '@mui/material/Badge';
import Vescovered from "./componenets/Vescovered"
import Recipes from "./componenets/Recipes"
import Verify from "./componenets/Verify"





export default function Dashboard() {

    const storageRef =  storage.ref()


    const [user, setUser] = useState(auth.currentUser.email)

    const [badgeCount, setBadgeCount] = useState(0)

    const [hasClickedBadge, setHasClickedBadge] = useState(false)

    const childRef = useRef(null);

    const [value, setValue] = useState(0);
    const [address, setAddress] = useState("")
    const [update, setUpdate] = useState(false)
    const [result, setResult] = useState(null) 
    const [isVerified, setIsVerfied] = useState(null)



    const [account, setUserAccount] = useState({}) 

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const lng = account.longitude
    const lat = account.latitude
    

   

    Geocode.setApiKey("AIzaSyA3RqIQZzvJfUWxsicl_YAalCTqI0zgp7I");

    Geocode.setLanguage("en");


    Geocode.setRegion("en");

    Geocode.setLocationType("APPROXIMATE");

    Geocode.enableDebug();


    useEffect(() => {

        db.collection("users").doc(user).get()
        .then(doc => {
            if (doc.exists) {
                setUserAccount(doc.data())
            }
        })
        .catch(error => {
            console.log(error)
        })

    }, [update])

    
        db.collection("users").doc(user).get()
        .then(doc => {
            if (doc.exists) {
               setIsVerfied(doc.data().isVerified)
               setResult(doc.data().uploadedVerifyImage)
            }
        })
        .catch(error => {
            console.log(error)
        })
        

   

    useEffect(() => {

        Geocode.fromLatLng(lat, lng).then(
            (response) => {
                const address = response.results[3].formatted_address;
                setAddress(address)
            },
            (error) => {
                console.error(error);
            }
            );

    }, [account])

   

    const updateMyUser = (event, fName, sName, twit, insta , newImage) => {
        event.preventDefault()

            db.collection("users").doc(user).set({
            imagePath : newImage,
            firstName : fName,
            secondName : sName,
            twitter : twit,
            instagram: insta
    
            }, { merge: true })

        setUpdate(true)

    }


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

      const addBadgeCount = () => {
          setBadgeCount(prev => prev + 1)
      }

      const resetBadge = () => {

        setBadgeCount(0)

      }

      const useStyles = makeStyles(theme => ({
        customRoot : {
            color: '#272829'
        },
        customTabIndicator: {
            backgroundColor: '#3797A4'

        }
      }));

    
      const classes = useStyles();

        const uploadClick = event => {

        event.preventDefault()
        childRef.current.click();
    }

    const verifyImage = event => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {

               const imageRef = storageRef.child(`\\${user}`).child("spoonpic.jpg")
               const file = e.target.result
               imageRef.put(file).then(() => {
                   console.log("image added")
                   setResult(prevResult => true)

                   db.collection("users").doc(user).set({
                    uploadedVerifyImage: true
            
                    }, { merge: true })

               })
               .catch(error => console.log(error))

            };
            reader.readAsDataURL(event.target.files[0]);
          }

     

       
    }

      


    return (
        <div className="dashboard-outer">
            <div className="dashboard-middle">
                <div className="dashboard-inner" style={{
                    marginBottom : "20px"
                }}>

                    <Paper square>
                    <Tabs
                    value={value}
                    indicatorColor="inherit"
                    textColor="inherit"
                    onChange={handleChange}
                    aria-label="disabled tabs example"
                    classes={{
                        root: classes.customRoot,
                        indicator: classes.customTabIndicator
                    }}
            
                    >
                    <Tab label="Account" icon={<AccountBoxOutlinedIcon /> } {...a11yProps(0)} />
                    <Tab label="Verify" icon={<DoneOutlineOutlinedIcon />} {...a11yProps(1)} />
                    <Tab label="Vescover" icon={<ExploreOutlinedIcon />} {...a11yProps(2)} />
                    <Tab label="Vescovered"  icon={
                    
                    <Badge badgeContent={badgeCount} sx={{
                        "& .MuiBadge-badge": {
                        color: "white",
                        backgroundColor: "#3797A4"
                        }}}> 
                        <FolderOpenOutlinedIcon/> 
    
                        </Badge>} {...a11yProps(3)} 
                    />  
                    <Tab label="Recipes" icon={<FormatListBulletedOutlinedIcon /> } {...a11yProps(4)} />
                    </Tabs>
                    </Paper>
                    <TabPanel value={value} index={0}>
                        <Account 
                        firstName={account.firstName}
                        secondName={account.secondName}
                        imgPath={account.imagePath}
                        age={account.age}
                        veganFor={account.veganFor}
                        gender={account.gender}
                        instagram={account.instagram}
                        twitter={account.twitter}
                        address={address}
                        updateParent={updateMyUser}
                        verified={isVerified}
                        
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Verify 
                        handleUploadClick={uploadClick}
                        handleVerifyImage={verifyImage}
                        uploaded={result}
                        verified={isVerified}
                        forwardedRef={childRef}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Vescover 
                        updateParent={addBadgeCount}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <Vescovered
                        updateBadge={resetBadge}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <Recipes />
                    </TabPanel>

                </div>

            </div>

        </div>
      
     
    );

    
}