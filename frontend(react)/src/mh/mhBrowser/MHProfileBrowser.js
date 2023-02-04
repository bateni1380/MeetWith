import React from "react";
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import {farsiMHDegree , farsiField} from './../../Farsi';
import {MHProfileAPI} from "../../API"



function UserProfileBrowser(props){
    const [info, setInfo] = useState({first_name: "", last_name: "", mh_email:"", mh_password: "", teacher_number:"", degree: "" , 
        field:"", link_to_webpage: "", is_succesfull: false, error_string: ""})

    if(!info.is_succesfull){
        MHProfileAPI(props.userNameApp, props.passApp, setInfo);
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
                        {info.mh_email}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item >شماره استادی: {info.teacher_number}</ListGroup.Item>
                    <ListGroup.Item >شماره تلفن: {info.mobile_number}</ListGroup.Item>
                    <ListGroup.Item >مقطع: {farsiMHDegree(info.degree)}</ListGroup.Item>
                    <ListGroup.Item >گرایش: {farsiField(info.field)}</ListGroup.Item>
                    <ListGroup.Item >وبسایت: {info.link_to_webpage}</ListGroup.Item>
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