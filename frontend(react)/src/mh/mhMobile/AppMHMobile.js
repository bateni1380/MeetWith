import React from "react";
import {useState} from "react";
import MHMobileNav from "./MHMobileNav"
import MHMeetingMobile from "./MHMeetingMobile";
import MHProfileMobile from "./MHProfileMobile";
import MHMeetingInfoMobile from "./MHMeetingInfoMobile";
import MHProfileEditMobile from "./MHProfileEditMobile";
import MHTimeFreeMobile from "./MHTimeFreeMobile";
import MHConfirmMobile from "./MHConfirmMobile";


function AppMHMobileHelp(props){
    if(props.page == "meeting"){
        return(
            <div>
                <MHMeetingMobile userNameApp={props.userNameApp} passApp={props.passApp} 
                color={props.color}/>
            </div>
        );
    }else if(props.page == "profile"){
        return(
            <div>
                <MHProfileMobile userNameApp={props.userNameApp} passApp={props.passApp} page={props.page} setPage={props.setPage} 
                color={props.color} setColor={props.setColor}/>
            </div>
        );
    }else if(props.page == "meeting_info"){
        return(
            <div>
                <MHMeetingInfoMobile userNameApp={props.userNameApp} passApp={props.passApp} page={props.page} setPage={props.setPage}
                color={props.color}/>
            </div>
        );
    }else if(props.page == "profile_edit"){
        return(
            <div>
                <MHProfileEditMobile userNameApp={props.userNameApp} passApp={props.passApp} page={props.page} setPage={props.setPage}
                color={props.color}/>
            </div>
        );
    }else if(props.page == "time_free"){
        return(
            <div>
                <MHTimeFreeMobile userNameApp={props.userNameApp} passApp={props.passApp} page={props.page} setPage={props.setPage}
                color={props.color} MHApp={props.MHApp} setMHApp={props.setMHApp} />
            </div>
        );
    }else if(props.page == "confirm"){
        return(
            <div>
                <MHConfirmMobile userNameApp={props.userNameApp} passApp={props.passApp} page={props.page} setPage={props.setPage} 
                color1={props.color} setColor1={props.setColor}/>
            </div>
        );
    }
    return(<div></div>);
}


// page : meeting profile meeting_info profile_edit time_free confirm
function AppMHMobile(props){
    const [page, setPage] = useState("meeting");
    const [color, setColor] = useState({color1: "success", color2: "outline-success", back: ""});
    const [MHApp, setMHApp] = useState("");


    return(
        <div style={{backgroundColor: color.back}}>
            <AppMHMobileHelp userNameApp={props.userNameApp} passApp={props.passApp} 
                setUserNameApp={props.setUserNameApp} setPassApp={props.setPassApp} page={page} setPage={setPage} 
                color={color} setColor={setColor} MHApp={MHApp} setMHApp={setMHApp}/>
            <MHMobileNav page={page} setPage={setPage} color={color}/>
        </div>
    );
}

export default AppMHMobile;


/*
{color1: "success", color2: "outline-success", back: ""}
{color1: "dark", color2: "outline-dark", back: ""}
*/