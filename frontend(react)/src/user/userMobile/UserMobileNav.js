import React from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Stack from 'react-bootstrap/Stack';
import {useState} from "react";


function UserMobileNav(props){

    const btnProfile = (e) => {
        props.setPage("profile");
        e.preventDefault();
        return;
    };
    const btnMHList = (e) => {
        props.setPage("mh_list");
        e.preventDefault();
        return;
    };
    const btnMeeting = (e) => {
        props.setPage("meeting");
        e.preventDefault();
        return;
    };
    const btnBarcode = (e) => {
        props.setPage("barcode");
        e.preventDefault();
        return;
    };
    return(
        <footer style={{width: "100%", position: "fixed", left: '0', bottom: '0', background: ""}}>
        <div style={{margin : "5px 8px 5px 8px"}} >
            <Stack>
                <ButtonGroup size="" className="mb-2">
                    <Button variant={(props.page == "profile") ? props.color.color2 : props.color.color1} onClick={btnProfile} disabled={(props.page == "profile")}> پروفایل </Button>
                    <Button variant={(props.page == "mh_list") ? props.color.color2 : props.color.color1} onClick={btnMHList} disabled={(props.page == "mh_list")}> اساتید</Button>
                    <Button variant={(props.page == "meeting") ? props.color.color2 : props.color.color1} onClick={btnMeeting} disabled={(props.page == "meeting")}> قرارهای من </Button>
                    <Button variant={(props.page == "barcode") ? props.color.color2 : props.color.color1} onClick={btnBarcode} disabled={(props.page == "barcode")}>اسکن</Button>
                </ButtonGroup>
            </Stack>
        </div>
        </footer>
    );
}

export default UserMobileNav;