import React from "react";
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import CloseButton from 'react-bootstrap/CloseButton';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {filterMeetingFarsi , dateFarsi} from "./../../Farsi"
import { userMeetingAPI } from "./../../API"


function UserMeetingBrowserItem(props){
    const [dataShow, setDataShow] = useState(false);
    
    return(
        <div dir="rtl">
            <Card style={{margin : "20px 8px 5px 8px"}}>
                <Card.Header as="h5" className="text-center">{props.data.mh_first_name}{" "}{props.data.mh_last_name}</Card.Header>
                <Card.Body>
                    <Card.Title>{props.data.subject}</Card.Title>
                    <Card.Text>
                        زمان شروع: {props.data.start_time.minute} {":"} {props.data.start_time.hour} {" - "}
                        زمان پایان: {props.data.end_time.minute}  {":"} {props.data.end_time.hour} {" - "}
                        تاریخ: {dateFarsi(props.data.date.year, props.data.date.month, props.data.date.day)}
                    </Card.Text>
                    <Stack>
                        <Button variant={props.color.color1} onClick={()=>{setDataShow(true);}}>جزئیات</Button>
                    </Stack>
                </Card.Body>
            </Card>

            <Modal
                size="lg" aria-labelledby="contained-modal-title-vcenter"
                centered show={dataShow} onHide={() => {setDataShow(false);}}
            >
                
                <Modal.Body>
                    <div dir="rtl">
                        <h3>{props.data.subject}</h3>
                        <h4>{props.data.mh_first_name}{" "}{props.data.mh_last_name}</h4>
                        <h6>
                            زمان شروع: {props.data.start_time.minute} {":"} {props.data.start_time.hour} {" - "}
                            زمان پایان: {props.data.end_time.minute}  {":"} {props.data.end_time.hour} {" - "}
                            تاریخ: {dateFarsi(props.data.date.year, props.data.date.month, props.data.date.day)}
                        </h6>
                        <p>
                            {props.data.description}
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Stack>
                        <Button variant={props.color.color1} onClick={() => {setDataShow(false);}}>بستن</Button>
                    </Stack>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

function SearchFunction(Search, filterTitle, MeetingList){
    let h1 = [];
    if(filterTitle == "past"){
        h1 = [...(MeetingList.listMeetingPast)];
    }else if(filterTitle == "toDay"){
        h1 = [...(MeetingList.listMeetingToDay)];
    }else{
        h1 = [...(MeetingList.listMeetingFuture)];
    }
    let h2 = [...h1.filter((value) => {
        if(value.mh_first_name.search(Search) >= 0 || value.mh_last_name.search(Search) >= 0 || value.subject.search(Search) >= 0 || value.description.search(Search) >= 0){
            return true;
        }
        return false;
    })];

    return [...h2];
}

//filterList = past toDay future
//MeetingList =   listMeetingPast listMeetingToDay listMeetingFuture 
//userMeetingAPI(props.userNameApp, props.passApp);
function UserMeetingBrowser(props){
    const [meetingList, setMeetingList] = useState({listMeetingPast: [], listMeetingToDay: [], listMeetingFuture: [], is_succesfull: false, error_string: ""})
    const [showList, setShowList] = useState([]);
    const [filterTitle, setfilterTitle] = useState("toDay");
    const [Search, setSearch] = useState("");
    const [firstSet, setFirstSet] = useState(false);

    if(!meetingList.is_succesfull){
        let d = new Date();
        userMeetingAPI(props.userNameApp, props.passApp, d.getFullYear(), d.getMonth()+1, d.getDate(), setMeetingList)
    }
    if(meetingList.is_succesfull && !firstSet){
        setFirstSet(true);
        let h1 = [];
        if(filterTitle == "past"){
            h1 = [...(meetingList.listMeetingPast)];
        }else if(filterTitle == "toDay"){
            h1 = [...(meetingList.listMeetingToDay)];
        }else{
            h1 = [...(meetingList.listMeetingFuture)];
        }
        setShowList([...h1]);
    }

    const textSearch = (event) => {
        setSearch(event.target.value);
        return;
    };
    const btnSearch = (e) => {
        let h = SearchFunction(Search, filterTitle, meetingList);
        setShowList([...h]);
        e.preventDefault();
        return;
    };
    const btnClear = (e) => {
        setSearch("");
        let h1 = [];
        if(filterTitle == "past"){
            h1 = [...(meetingList.listMeetingPast)];
        }else if(filterTitle == "toDay"){
            h1 = [...(meetingList.listMeetingToDay)];
        }else{
            h1 = [...(meetingList.listMeetingFuture)];
        }
        setShowList([...h1]);
        e.preventDefault();
        return;
    };

    return(
        <div dir="rtl" style={{margin : "0px 0px 100px 0px"}}>
            <Container>
                <Row>
                    <Col sm={5}>
                    <Card style={{margin : "10px 0px 10px 0px"}}>
                        <Container style={{margin : "10px 0px 10px 0px"}}>
                            <Stack direction="horizontal" gap={3}>
                                <Form.Control className="me-auto" placeholder="جستجو" onChange={textSearch} value={Search}/>
                                <CloseButton variant={props.color.color1} onClick={btnClear}/>
                                <Button variant={props.color.color1} onClick={btnSearch} >جستجو</Button>
                            </Stack>
                        </Container>
                        <Alert variant={props.color.color1} style={{margin : "10px 5px 10px 5px"}}>
                            <Alert.Heading className="text-center">{filterMeetingFarsi(filterTitle)}</Alert.Heading>
                        </Alert>
                        <ButtonGroup vertical size="lg" style={{margin : "10px 5px 10px 5px"}}>
                            <Button variant={filterTitle=="past" ? props.color.color2 : props.color.color1} onClick={(e)=>{setShowList([...(meetingList.listMeetingPast)]); setfilterTitle("past"); e.preventDefault();}}>جلسات گذشته</Button>
                            <Button variant={filterTitle=="toDay" ? props.color.color2 : props.color.color1} onClick={(e)=>{setShowList([...(meetingList.listMeetingToDay)]); setfilterTitle("toDay"); e.preventDefault();}}>جلسات امروز</Button>
                            <Button variant={filterTitle=="future" ? props.color.color2 : props.color.color1} onClick={(e)=>{setShowList([...(meetingList.listMeetingFuture)]); setfilterTitle("future"); e.preventDefault();}}>جلسات آینده</Button>
                        </ButtonGroup>
                    </Card>
                    </Col>

                    <Col sm={7}>
                        {showList.map((data) => (
                            <UserMeetingBrowserItem id={data.meeting_id} data={data} color={props.color} />
                        ))}
                    </Col>
                </Row>
            </Container>
            
            
            
        </div>
    );
}

export default UserMeetingBrowser;


/*
<UserMeetingMobileItem id={data.meeting_id} subject={data.subject} MH_id={data.MH_id} 
                start_time={data.start_time} end_time={data.end_time} date={data.date} />

                

*/