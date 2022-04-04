import React from "react"
import ScreenshotOne from "../imgs/image1.png"
import ScreenshotTwo from "../imgs/image2.png"
import AppStoreIcon from "../imgs/appstore.png"
import Tooltip from '@mui/material/Tooltip';





export default function AppScreenshot() {
    return (
        <div>
            <div style={{display: "flex"}}>
                <img src={ScreenshotOne} style={{
                    width: "300px",
                    height: "450px",
                    marginRight : "40px"
                }}/>
                <img src={ScreenshotTwo} style={{
                    width: "300px",
                    height: "450px"
                }}/>
            </div>
            <Tooltip title={"Download iOS App"}>
            <img style={{width: "300px" , height: "100px", marginTop: "50px", }} src={AppStoreIcon} 
            onClick={(e) => {
                e.preventDefault();
                window.open(`https://apps.apple.com/gb/app/vescoverer/id1558493750`)
       }}
            />

            </Tooltip>
        </div>

    )
}