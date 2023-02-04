import React from "react";
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import { farsiField , farsiMHDegree , dateFarsi} from "../../Farsi";
import { userMHListAPI , MHFreeTimeListAPI , userReserveMeetingAPI } from "./../../API"

function UserReserveMobile(props){
    const [mhSelected , setMHSelected] = useState({id: -2, first_name: "", last_name: "", mh_email: "", degree: "", field: "", link_to_webpage: ""})
    const [rawMHList, setRawMHList] = useState({mh_list: [], is_succesfull: false, error_string: ""});
    const [timeTable, setTimeTable] = useState({mh_id: -2, is_succesfull:false, error_string: "",
        days: [
          {date: {year:1, month:1, day:1} , meetings: []},
          {date: {year:1, month:1, day:2} , meetings: []},
          {date: {year:1, month:1, day:3} , meetings: []},
          {date: {year:1, month:1, day:4} , meetings: []},
          {date: {year:1, month:1, day:5} , meetings: []},
          {date: {year:1, month:1, day:6} , meetings: []},
          {date: {year:1, month:1, day:7} , meetings: []}
        ]
      });
      const [day, setDay] = useState(0);
      const [showTime, setShowTime] = useState([]);
      const [showModal, setShowModal] = useState(false);
      const [subjectText, setSubjectText] = useState("");
      const [descrcriptionText, setDescrcriptionText] = useState("");
      const [timeSet, setTimeSet] = useState(-1);
      const [res, setRes] = useState({is_succesfull: false, error_string: ""});

    if(!timeTable.is_succesfull){
        var d = new Date();
        MHFreeTimeListAPI(props.MHApp, d.getFullYear(), d.getMonth()+1, d.getDate(), setTimeTable);
    }
    if(!rawMHList.is_succesfull){
        userMHListAPI(setRawMHList);
    }
    if(rawMHList.is_succesfull && mhSelected.id == -2){
        setMHSelected({...rawMHList.mh_list.find((i)=>{return i.id == props.MHApp;})});
    }
    if(timeTable.is_succesfull && showTime.length <= 0){
        setShowTime(timeTable.days[day].meetings);
    }
    if(res.is_succesfull){
        props.setPage("mh_list");
        alert("جلسه با موفقیت ایجاد شد.");
    }

    const functionDropDown = (e, i) => {
        setDay(i);
        setTimeSet(-1);
        setShowTime([...timeTable.days[i].meetings]);
        e.preventDefault();
        return;
    };

    const functionSubjectText = (event) => {
        setSubjectText(event.target.value);
        return;
    };
    const functionDescrcriptionText = (event) => {
        setDescrcriptionText(event.target.value);
        return;
    };

    const timeFunction = (i)=>{
        setTimeSet(i);
        let h = [...timeTable.days[day].meetings];
        h[i] = "set";
        setShowTime([...h]);
        return;
    }
    
    const functionReserve = () => {
        if(timeSet >= 0){
            setShowModal(true);
        }else{
            window.alert("لطفا یک زمان را مشخص کنید.");
        }
        return;
    };

    const functionEndReserve = ()=>{
        userReserveMeetingAPI(props.MHApp, props.userNameApp, props.passApp, timeTable.days[day].date.year, timeTable.days[day].date.month, timeTable.days[day].date.day, 
            Number.parseInt(timeSet/4), ((timeSet%4)*15), Number.parseInt((timeSet+1)/4), (((timeSet+1)%4)*15), subjectText, 0, descrcriptionText, false, setRes);
    }


    return(
        <div dir="rtl" style={{margin : "0px 0px 100px 0px"}}>
            <Modal
                size="lg" aria-labelledby="contained-modal-title-vcenter"
                centered show={showModal} onHide={() => {setShowModal(false);}}>
                <Modal.Body>
                    <div dir="rtl">
                        <h4>جلسه: {subjectText}</h4>
                        <h4>استاد: {mhSelected.first_name} {" "} {mhSelected.last_name}</h4>
                        <h6>
                            زمان: {((timeSet % 4) * 15 )} {":"} {Number.parseInt(timeSet / 4)} {" تا "} {(((timeSet+1) % 4) * 15 )} {":"} {Number.parseInt((timeSet+1) / 4)}
                            <br/>
                            تاریخ: {dateFarsi(timeTable.days[day].date.year,timeTable.days[day].date.month,timeTable.days[day].date.day)}
                        </h6>
                        <p>
                            {descrcriptionText}
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Stack gap={1}>
                        <Button variant={props.color.color1} onClick={() => {}}>تایید</Button>
                        <Button variant={props.color.color2} onClick={() => {setShowModal(false);}}>لغو</Button>
                    </Stack>
                </Modal.Footer>
            </Modal>
            <Navbar bg="light">
                <Container>
                    <Form className="d-flex">  
                        <Button variant={props.color.color1} onClick={() => {props.setPage("mh_list");}} className="">بازگشت</Button>
                    </Form>
                </Container>
            </Navbar>
            
            <Card style={{margin : "20px 8px 5px 8px"}}>
                <Card.Header as="h5" className="text-center">{mhSelected.first_name} {" "} {mhSelected.last_name}</Card.Header>
                <Card.Body>
                    <Card.Title className="text-center">{farsiMHDegree(mhSelected.degree)} {" "} {farsiField(mhSelected.field)}</Card.Title>
                    <Card.Text>
                        {"ایمیل: "} {mhSelected.mh_email} <br/>
                        {"سایت:"} <a href={mhSelected.link_to_webpage} target="_blank">{mhSelected.link_to_webpage}</a>
                    </Card.Text>
                    
                </Card.Body>
            </Card>
            <Card style={{margin : "20px 8px 5px 8px"}}>
                <Card.Body>
                    <FloatingLabel label="موضوع" className="mb-3">
                            <Form.Control as="textarea" placeholder="" onChange={functionSubjectText} value={subjectText}/>
                    </FloatingLabel>
                    <FloatingLabel label="توضیحات">
                        <Form.Control as="textarea" placeholder="" onChange={functionDescrcriptionText} value={descrcriptionText} style={{ height: '100px', margin : "0px 0px 5px 0px" }}/>
                    </FloatingLabel>
                    <Stack>
                        <Button variant={props.color.color1} onClick={functionReserve}>رزرو</Button>
                    </Stack>
                </Card.Body>
            </Card>
            <Card style={{margin : "20px 8px 5px 8px"}}>
                <Card.Body>
                    <Stack>
                        <Dropdown size="lg" style={{ margin : "0px 0px 5px 0px" }}>
                            <Dropdown.Toggle variant={props.color.color1}>
                                تاریخ: {dateFarsi(timeTable.days[day].date.year,timeTable.days[day].date.month,timeTable.days[day].date.day)}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item type="button" onClick={(e)=>{functionDropDown(e,0)}}> 
                                    {dateFarsi(timeTable.days[0].date.year,timeTable.days[0].date.month,timeTable.days[0].date.day)}</Dropdown.Item>
                                <Dropdown.Item type="button" onClick={(e)=>{functionDropDown(e,1)}}> 
                                    {dateFarsi(timeTable.days[1].date.year,timeTable.days[1].date.month,timeTable.days[1].date.day)}</Dropdown.Item>
                                <Dropdown.Item type="button" onClick={(e)=>{functionDropDown(e,2)}}> 
                                    {dateFarsi(timeTable.days[2].date.year,timeTable.days[2].date.month,timeTable.days[2].date.day)}</Dropdown.Item>
                                <Dropdown.Item type="button" onClick={(e)=>{functionDropDown(e,3)}}> 
                                    {dateFarsi(timeTable.days[3].date.year,timeTable.days[3].date.month,timeTable.days[3].date.day)}</Dropdown.Item>
                                <Dropdown.Item type="button" onClick={(e)=>{functionDropDown(e,4)}}> 
                                    {dateFarsi(timeTable.days[4].date.year,timeTable.days[4].date.month,timeTable.days[4].date.day)}</Dropdown.Item>
                                <Dropdown.Item type="button" onClick={(e)=>{functionDropDown(e,5)}}>
                                    {dateFarsi(timeTable.days[5].date.year,timeTable.days[5].date.month,timeTable.days[5].date.day)}</Dropdown.Item>
                                <Dropdown.Item type="button" onClick={(e)=>{functionDropDown(e,6)}}>
                                    {dateFarsi(timeTable.days[6].date.year,timeTable.days[6].date.month,timeTable.days[6].date.day)}</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Container >
                            <Row>
                                <Col>
                                    <Stack>
                                        <Alert variant={props.color.color1}>
                                            <p>قبل از ظهر</p>
                                        </Alert>
                                        <ButtonGroup vertical >
                                            {showTime.slice(0,48).map((data , index) => (
                                                <Button onClick={()=>{timeFunction(index)}} variant={data == "set" ? props.color.color2 : props.color.color1} disabled={data == "full"} size="sm"> 
                                                    {((index % 4) * 15 )} {":"} {Number.parseInt(index / 4)} {" تا "} {(((index+1) % 4) * 15 )} {":"} {Number.parseInt((index+1) / 4)}
                                                </Button>
                                            ))}
                                        </ButtonGroup>
                                    </Stack>
                                </Col>
                                <Col>
                                    <Stack>
                                        <Alert variant={props.color.color1} size="sm">
                                            <p>بعد از ظهر</p>
                                        </Alert>
                                        <ButtonGroup vertical >
                                            {showTime.slice(48,96).map((data , index) => (
                                                <Button onClick={()=>{timeFunction(index+48)}} variant={data == "set" ? props.color.color2 : props.color.color1} disabled={data == "full"} size="sm"> 
                                                    {((index % 4) * 15 )} {":"} {Number.parseInt(index / 4)+12} {" تا "} {(((index+1) % 4) * 15 )} {":"} {Number.parseInt((index+1) / 4)+12}
                                                </Button>
                                            ))}
                                        </ButtonGroup>
                                    </Stack>
                                </Col>
                            </Row>
                        </Container>
                    </Stack>
                </Card.Body>
            </Card>
        </div>
    );
}

export default UserReserveMobile;