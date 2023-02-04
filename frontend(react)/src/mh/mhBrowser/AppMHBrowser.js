import React from "react";
import {useState} from "react";
import MHBrowserNav from "./MHBrowserNav"
import MHMeetingBrowser from "./MHMeetingBrowser";
import MHProfileBrowser from "./MHProfileBrowser";
import MHMeetingInfoBrowser from "./MHMeetingInfoBrowser";
import MHProfileEditBrowser from "./MHProfileEditBrowser";
import MHTimeFreeBrowser from "./MHTimeFreeBrowser";
import MHConfirmBrowser from "./MHConfirmBrowser";


function AppMHBrowserHelp(props){
    if(props.page == "meeting"){
        return(
            <div>
                <MHMeetingBrowser userNameApp={props.userNameApp} passApp={props.passApp} 
                color={props.color}/>
            </div>
        );
    }else if(props.page == "profile"){
        return(
            <div>
                <MHProfileBrowser userNameApp={props.userNameApp} passApp={props.passApp} page={props.page} setPage={props.setPage} 
                color={props.color} setColor={props.setColor}/>
            </div>
        );
    }else if(props.page == "meeting_info"){
        return(
            <div>
                <MHMeetingInfoBrowser userNameApp={props.userNameApp} passApp={props.passApp} page={props.page} setPage={props.setPage}
                color={props.color}/>
            </div>
        );
    }else if(props.page == "profile_edit"){
        return(
            <div>
                <MHProfileEditBrowser userNameApp={props.userNameApp} passApp={props.passApp} page={props.page} setPage={props.setPage}
                color={props.color}/>
            </div>
        );
    }else if(props.page == "time_free"){
        return(
            <div>
                <MHTimeFreeBrowser userNameApp={props.userNameApp} passApp={props.passApp} page={props.page} setPage={props.setPage}
                color={props.color} MHApp={props.MHApp} setMHApp={props.setMHApp} />
            </div>
        );
    }else if(props.page == "confirm"){
        return(
            <div>
                <MHConfirmBrowser userNameApp={props.userNameApp} passApp={props.passApp} page={props.page} setPage={props.setPage} 
                color1={props.color} setColor1={props.setColor}/>
            </div>
        );
    }
    return(<div></div>);
}


// page : meeting profile meeting_info profile_edit time_free confirm
function AppMHBrowser(props){
    const [page, setPage] = useState("meeting");
    const [color, setColor] = useState({color1: "success", color2: "outline-success", back: ""});
    const [MHApp, setMHApp] = useState("");


    return(
        <div style={{backgroundColor: color.back}}>
            {<MHBrowserNav page={page} setPage={setPage} color={{color1: "success", color2: "outline-success", back: ""}}/>}
            <AppMHBrowserHelp userNameApp={props.userNameApp} passApp={props.passApp} 
                setUserNameApp={props.setUserNameApp} setPassApp={props.setPassApp} page={page} setPage={setPage} 
                color={color} setColor={setColor} MHApp={MHApp} setMHApp={setMHApp}/>
        </div>
    );
}

export default AppMHBrowser;


/*
{color1: "success", color2: "outline-success", back: ""}
{color1: "dark", color2: "outline-dark", back: ""}
{color1: "info", color2: "outline-info", back: ""}
{color1: "primary", color2: "outline-primary", back: ""}
*/