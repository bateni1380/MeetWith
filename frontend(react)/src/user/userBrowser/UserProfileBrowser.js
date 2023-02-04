import React from "react";
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import {userProfileAPI , userMHListAPI} from "../../API";
import {farsiDegree , farsiUni , farsiMHDegree , farsiField} from "./../../Farsi";





function UserProfileBrowser(props){
    const [info ,  setInfo] = useState({first_name: "", last_name: "", user_email:"", user_password: "", student_number:"", mobile_number: "", degree: "" , 
        field:"", university: "", adviserID: "", is_succesfull: false, error_string: ""})
    const [adviser , setAdviser] = useState({id: -2, first_name: "", last_name: "", mh_email: "", degree: "", field: "", link_to_webpage: ""})
    const [rawMHList, setRawMHList] = useState({mh_list: [], is_succesfull: false, error_string: ""});
    
    if(!info.is_succesfull){
        userProfileAPI(props.userNameApp, props.passApp, setInfo);
    }
    if(!rawMHList.is_succesfull){
        userMHListAPI(setRawMHList);
    }
    if(info.is_succesfull && rawMHList.is_succesfull && adviser.id == -2){
        setAdviser(rawMHList.mh_list.find((i)=>{return i.id == info.adviserID;}))
    }

    const btnEdit = (e) => {
        props.setPage("profile_edit");
        e.preventDefault();
        return;
    };

    const btnExit = (e) => {
        localStorage.clear();
        window.location.reload();
    };

    return(
        <div style={{margin : "20px 8px 5px 8px"}} dir="rtl">
            <Stack className="col-md-5 mx-auto">
            <Card style={{ width: '30rem' }} className="mx-auto">
                <Card.Body>
                    <Card.Title className="text-center" >{info.first_name} {info.last_name}</Card.Title>
                    <Card.Text className="text-center">
                        {info.user_email}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item >شماره دانشجویی: {info.student_number}</ListGroup.Item>
                    <ListGroup.Item >شماره تلفن: {info.mobile_number}</ListGroup.Item>
                    <ListGroup.Item >مقطع: {farsiDegree(info.degree)}</ListGroup.Item>
                    <ListGroup.Item >رشته: {info.field}</ListGroup.Item>
                    <ListGroup.Item >دانشگاه: {farsiUni(info.university)}</ListGroup.Item>
                    <ListGroup.Item >استاد مشاور: {adviser.first_name}{" "}{adviser.last_name}{" , "}{farsiMHDegree(adviser.degree)}{" "}{farsiField(adviser.field)}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                    <Stack gap={2} className="col-md-5 mx-auto">
                        <Button variant={props.color.color1} onClick={btnEdit}>تغییر</Button>
                        <Button variant={props.color.color2} onClick={btnExit}>خروج</Button>
                    </Stack>
                </Card.Body>
            </Card>
            </Stack>
        </div>
    );
}

export default UserProfileBrowser;