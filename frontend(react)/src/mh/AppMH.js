import React from "react";
import {BrowserView, MobileView} from 'react-device-detect';
import AppMHMobile from "./mhMobile/AppMHMobile";
import AppMHBrowser from "./mhBrowser/AppMHBrowser"

function AppU(props){
    return(
        <div>
            <BrowserView>
                <AppMHBrowser userNameApp={props.userNameApp} passApp={props.passApp}/>
            </BrowserView>

            <MobileView>
                <AppMHMobile userNameApp={props.userNameApp} passApp={props.passApp} />
            </MobileView>
        </div>
    );
}

export default AppU;