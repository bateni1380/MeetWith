import React from "react";
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import {dateFarsi} from "./../../Farsi";
import { MHFillTimeTableAPI , MHFreeTimeListAPI } from "../../API"

// MHApp={props.MHApp} setMHApp={props.setMHApp} 
function makeTime(){
    const time = [[], [], [], [], [], [], []];
    let i = 0;
    let j =0;
    for(j = 0 ; j < 7 ; j++){
        for(i = 0 ; i < 96 ; i++){
            time[j].push("full");
        }
    }
    return [...time];
}

function sumTimeDay(dayList){
    var sum = 0;
    dayList.forEach((e)=>{
        if(e == "free"){
            sum = sum + 1;
        }
    })
    return Number.parseInt(sum/4).toString() + ":" + ((sum%4)*15).toString();
}

//MHFreeTimeListAPI(props.MHApp, dateLastWeek.getFullYear(), dateLastWeek.getMonth(), dateLastWeek.getDay());
//filterTitle = Applied Mathematics , Pure Mathematics , Computer science , Statistics , All
function MHTimeFreeBrowser(props){
    const [lastWeekTimeTable, setLastWeekTimeTable] = useState({mh_id: -1, is_succesfull: false, error_string: "",
        days: [{date: {"year":2022, "month":12, "day":8}, meetings: []},
            {date: {"year":2022, "month":12, "day":9}, meetings: []},
            {date: {"year":2022, "month":12, "day":10}, meetings: []},
            {date: {"year":2022, "month":12, "day":11}, meetings: []},
            {date: {"year":2022, "month":12, "day":12}, meetings: []},
            {date: {"year":2022, "month":12, "day":13}, meetings: []},
            {date: {"year":2022, "month":12, "day":14}, meetings: []}]
        }
    );
    const [thisWeekTimeTable, setThisWeekTimeTable] = useState({mh_id: -1, is_succesfull: false, error_string: "",
        days: [{date: {"year":2022, "month":12, "day":8}, meetings: []},
            {date: {"year":2022, "month":12, "day":9}, meetings: []},
            {date: {"year":2022, "month":12, "day":10}, meetings: []},
            {date: {"year":2022, "month":12, "day":11}, meetings: []},
            {date: {"year":2022, "month":12, "day":12}, meetings: []},
            {date: {"year":2022, "month":12, "day":13}, meetings: []},
            {date: {"year":2022, "month":12, "day":14}, meetings: []}]
        }
    );
    //d.setDate(d.getDate() - 226898)
    const [timeTable, setTimeTable] = useState([[...lastWeekTimeTable.days[0].meetings], [...lastWeekTimeTable.days[1].meetings], [...lastWeekTimeTable.days[2].meetings], 
        [...lastWeekTimeTable.days[3].meetings], [...lastWeekTimeTable.days[4].meetings], [...lastWeekTimeTable.days[5].meetings], [...lastWeekTimeTable.days[6].meetings]]);
    const [day, setDay] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [res, setRes] = useState({is_succesfull: false, error_string: ""});


    if(res.is_succesfull && showModal){
        setShowModal(false);
        alert("اطلاعات با موفقیت ثبت شد.");
        props.setPage("time_free");
    }
    if(!lastWeekTimeTable.is_succesfull){
        var d = new Date();
        d.setDate(d.getDate()-7);
        MHFreeTimeListAPI(props.userNameApp, d.getFullYear(), d.getMonth()+1, d.getDate(), setLastWeekTimeTable);
    }
    if(lastWeekTimeTable.is_succesfull && thisWeekTimeTable.is_succesfull && timeTable[0].length <= 0){
        var s = 0;
        thisWeekTimeTable.days.forEach((d)=>{
            d.meetings.forEach((dd)=>{
                if(dd == "free"){
                    s = s + 1;
                }
            })
        });
        if(s > 0){
            setTimeTable([[...thisWeekTimeTable.days[0].meetings], [...thisWeekTimeTable.days[1].meetings], [...thisWeekTimeTable.days[2].meetings], 
                [...thisWeekTimeTable.days[3].meetings], [...thisWeekTimeTable.days[4].meetings], [...thisWeekTimeTable.days[5].meetings], [...thisWeekTimeTable.days[6].meetings]]);
        }else{
            setTimeTable([[...lastWeekTimeTable.days[0].meetings], [...lastWeekTimeTable.days[1].meetings], [...lastWeekTimeTable.days[2].meetings], 
                [...lastWeekTimeTable.days[3].meetings], [...lastWeekTimeTable.days[4].meetings], [...lastWeekTimeTable.days[5].meetings], [...lastWeekTimeTable.days[6].meetings]]);
        }
        
    }
    if(!thisWeekTimeTable.is_succesfull){
        var d = new Date();
        MHFreeTimeListAPI(props.userNameApp, d.getFullYear(), d.getMonth()+1, d.getDate(), setThisWeekTimeTable);
    }

    const sendTimeTable = (e)=>{
        MHFillTimeTableAPI(props.userNameApp, props.passApp, [
            {"date": thisWeekTimeTable.days[0].date, meetings: [...timeTable[0]]}, 
            {"date": thisWeekTimeTable.days[1].date, meetings: [...timeTable[1]]}, 
            {"date": thisWeekTimeTable.days[2].date, meetings: [...timeTable[2]]}, 
            {"date": thisWeekTimeTable.days[3].date, meetings: [...timeTable[3]]}, 
            {"date": thisWeekTimeTable.days[4].date, meetings: [...timeTable[4]]}, 
            {"date": thisWeekTimeTable.days[5].date, meetings: [...timeTable[5]]}, 
            {"date": thisWeekTimeTable.days[6].date, meetings: [...timeTable[6]]}
        ], setRes);
        e.preventDefault();
    }

    const timeListFunction = (i)=>{
        let h = [...timeTable];
        if(timeTable[day][i] == "full"){
            h[day][i] = "free";
            setTimeTable(h);
        }else{
            h[day][i] = "full";
            setTimeTable(h);
        }
        return;
    }

    const btnDay = (e , t) => {
        let h1 = [];
        setDay(t);
        e.preventDefault();
        return;
    };

    return(
        <div dir="rtl" style={{margin : "0px 0px 100px 0px"}}>
            <Modal
                size="lg" aria-labelledby="contained-modal-title-vcenter"
                centered show={showModal} onHide={() => {setShowModal(false);}}>
                <Modal.Body>
                    <div dir="rtl">
                        <h4>تایید نهایی</h4>
                        <h4>جمجوع زمان های انتخاب شده</h4>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item >{dateFarsi(thisWeekTimeTable.days[0].date.year, thisWeekTimeTable.days[0].date.month , thisWeekTimeTable.days[0].date.day)}{" - "}{sumTimeDay(timeTable[0])}</ListGroup.Item>
                            <ListGroup.Item >{dateFarsi(thisWeekTimeTable.days[1].date.year, thisWeekTimeTable.days[1].date.month , thisWeekTimeTable.days[1].date.day)}{" - "}{sumTimeDay(timeTable[1])}</ListGroup.Item>
                            <ListGroup.Item >{dateFarsi(thisWeekTimeTable.days[2].date.year, thisWeekTimeTable.days[2].date.month , thisWeekTimeTable.days[2].date.day)}{" - "}{sumTimeDay(timeTable[2])}</ListGroup.Item>
                            <ListGroup.Item >{dateFarsi(thisWeekTimeTable.days[3].date.year, thisWeekTimeTable.days[3].date.month , thisWeekTimeTable.days[3].date.day)}{" - "}{sumTimeDay(timeTable[3])}</ListGroup.Item>
                            <ListGroup.Item >{dateFarsi(thisWeekTimeTable.days[4].date.year, thisWeekTimeTable.days[4].date.month , thisWeekTimeTable.days[4].date.day)}{" - "}{sumTimeDay(timeTable[4])}</ListGroup.Item>
                            <ListGroup.Item >{dateFarsi(thisWeekTimeTable.days[5].date.year, thisWeekTimeTable.days[5].date.month , thisWeekTimeTable.days[5].date.day)}{" - "}{sumTimeDay(timeTable[5])}</ListGroup.Item>
                            <ListGroup.Item >{dateFarsi(thisWeekTimeTable.days[6].date.year, thisWeekTimeTable.days[6].date.month , thisWeekTimeTable.days[6].date.day)}{" - "}{sumTimeDay(timeTable[6])}</ListGroup.Item>
                        </ListGroup>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Stack gap={1}>
                        <Button variant={props.color.color1} onClick={sendTimeTable}>تایید</Button>
                        <Button variant={props.color.color2} onClick={() => {setShowModal(false);}}>لغو</Button>
                    </Stack>
                </Modal.Footer>
            </Modal>

            <Container>
                <Row>
                    <Col sm={4}>
                        <Stack>
                            <Alert variant={props.color.color1} style={{margin : "10px 5px 10px 5px"}}>
                                <Alert.Heading className="text-center">
                                    {/*{thisWeekTimeTable.days[day].date.day}{"/"}{thisWeekTimeTable.days[day].date.month}{"/"}{thisWeekTimeTable.days[day].date.year}*/}
                                    {dateFarsi(thisWeekTimeTable.days[day].date.year, thisWeekTimeTable.days[day].date.month , thisWeekTimeTable.days[day].date.day)}
                                </Alert.Heading>
                            </Alert>
                            <Button variant={props.color.color1} onClick={(e)=>{setShowModal(true); e.preventDefault();}} size="lg">
                                تایید زمان ها
                            </Button>
                            <ButtonGroup vertical size="lg" style={{margin : "10px 5px 10px 5px"}}>
                                <Button variant={day==0 ? props.color.color2 : props.color.color1} onClick={(e)=>{btnDay(e , 0)}}>
                                    {dateFarsi(thisWeekTimeTable.days[0].date.year, thisWeekTimeTable.days[0].date.month , thisWeekTimeTable.days[0].date.day)}{" - "}{sumTimeDay(timeTable[0])}
                                </Button>
                                <Button variant={day==1 ? props.color.color2 : props.color.color1} onClick={(e)=>{btnDay(e , 1)}}>
                                    {dateFarsi(thisWeekTimeTable.days[1].date.year, thisWeekTimeTable.days[1].date.month , thisWeekTimeTable.days[1].date.day)}{" - "}{sumTimeDay(timeTable[1])}
                                </Button>
                                <Button variant={day==2 ? props.color.color2 : props.color.color1} onClick={(e)=>{btnDay(e , 2)}}>
                                    {dateFarsi(thisWeekTimeTable.days[2].date.year, thisWeekTimeTable.days[2].date.month , thisWeekTimeTable.days[2].date.day)}{" - "}{sumTimeDay(timeTable[2])}
                                </Button>
                                <Button variant={day==3 ? props.color.color2 : props.color.color1} onClick={(e)=>{btnDay(e , 3)}}>
                                    {dateFarsi(thisWeekTimeTable.days[3].date.year, thisWeekTimeTable.days[3].date.month , thisWeekTimeTable.days[3].date.day)}{" - "}{sumTimeDay(timeTable[3])}
                                </Button>
                                <Button variant={day==4 ? props.color.color2 : props.color.color1} onClick={(e)=>{btnDay(e , 4)}}>
                                    {dateFarsi(thisWeekTimeTable.days[4].date.year, thisWeekTimeTable.days[4].date.month , thisWeekTimeTable.days[4].date.day)}{" - "}{sumTimeDay(timeTable[4])}
                                </Button>
                                <Button variant={day==5 ? props.color.color2 : props.color.color1} onClick={(e)=>{btnDay(e , 5)}}>
                                    {dateFarsi(thisWeekTimeTable.days[5].date.year, thisWeekTimeTable.days[5].date.month , thisWeekTimeTable.days[5].date.day)}{" - "}{sumTimeDay(timeTable[5])}
                                </Button>
                                <Button variant={day==6 ? props.color.color2 : props.color.color1} onClick={(e)=>{btnDay(e , 6)}}>
                                    {dateFarsi(thisWeekTimeTable.days[6].date.year, thisWeekTimeTable.days[6].date.month , thisWeekTimeTable.days[6].date.day)}{" - "}{sumTimeDay(timeTable[6])}
                                </Button>
                            </ButtonGroup>
                        </Stack>
                    </Col>
                    <Col sm={8}>
                        <Container >
                            <Row>
                                <Col>
                                    <Stack>
                                        <Alert variant={props.color.color1}>
                                            <p>شروع روز تا ساعت 6</p>
                                        </Alert>
                                        <ButtonGroup vertical >
                                            {timeTable[day].slice(0,24).map((data , index) => (
                                                <Button onClick={()=>{timeListFunction(index)}} variant={data == "free" ? props.color.color2 : props.color.color1} size="sm"> 
                                                    {((index % 4) * 15 )} {":"} {Number.parseInt(index / 4)} {" تا "} {(((index+1) % 4) * 15 )} {":"} {Number.parseInt((index+1) / 4)}
                                                </Button>
                                            ))}
                                        </ButtonGroup>
                                    </Stack>
                                </Col>
                                <Col>
                                    <Stack>
                                        <Alert variant={props.color.color1}>
                                            <p>ساعت 6 تا 12</p>
                                        </Alert>
                                        <ButtonGroup vertical >
                                            {timeTable[day].slice(24,48).map((data , index) => (
                                                <Button onClick={()=>{timeListFunction(index+24)}} variant={data == "free" ? props.color.color2 : props.color.color1} size="sm"> 
                                                    {((index % 4) * 15 )} {":"} {Number.parseInt(index / 4)+6} {" تا "} {(((index+1) % 4) * 15 )} {":"} {Number.parseInt((index+1) / 4)+6}
                                                </Button>
                                            ))}
                                        </ButtonGroup>
                                    </Stack>
                                </Col>
                                <Col>
                                    <Stack>
                                        <Alert variant={props.color.color1}>
                                            <p>ساعت 12 تا 18</p>
                                        </Alert>
                                        <ButtonGroup vertical >
                                            {timeTable[day].slice(48,72).map((data , index) => (
                                                <Button onClick={()=>{timeListFunction(index+48)}} variant={data == "free" ? props.color.color2 : props.color.color1} size="sm"> 
                                                    {((index % 4) * 15 )} {":"} {Number.parseInt(index / 4)+12} {" تا "} {(((index+1) % 4) * 15 )} {":"} {Number.parseInt((index+1) / 4)+12}
                                                </Button>
                                            ))}
                                        </ButtonGroup>
                                    </Stack>
                                </Col>
                                <Col>
                                    <Stack>
                                        <Alert variant={props.color.color1} size="sm">
                                            <p>ساعت 18 تا 24</p>
                                        </Alert>
                                        <ButtonGroup vertical >
                                            {timeTable[day].slice(72,96).map((data , index) => (
                                                <Button onClick={()=>{timeListFunction(index+72)}} variant={data == "free" ? props.color.color2 : props.color.color1} size="sm"> 
                                                    {((index % 4) * 15 )} {":"} {Number.parseInt(index / 4)+18} {" تا "} {(((index+1) % 4) * 15 )} {":"} {Number.parseInt((index+1) / 4)+18}
                                                </Button>
                                            ))}
                                        </ButtonGroup>
                                    </Stack>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            
            </Container>
        </div>
    );
}

export default MHTimeFreeBrowser;

